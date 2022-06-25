const ClientError = require('./client-error');
require('dotenv/config');
const path = require('path');
const express = require('express');
const app = express();
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const jsonMiddleware = express.json();
const formMiddleWare = express.urlencoded();
const publicPath = path.join(__dirname, 'public');
const authorizationMiddleware = require('./authorization-middleware');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(jsonMiddleware);
app.use(formMiddleWare);

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/users', (req, res, next) => {
  const sql = `
    select "userId",
           "username",
           "profilePicture",
           "link",
           "location",
           "tagline"
      from "users"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    select "userId",
           "username",
           "profilePicture",
           "link",
           "location",
           "tagline",
           "whatContent",
           "whyContent"
      from "users"
      where "userId" = $1
  `;

  const paramQueryValue = [userId];
  db.query(sql, paramQueryValue)
    .then(queryResult => {
      if (!queryResult.rows[0]) {
        throw new ClientError(404, `cannot find user with userId: ${userId}`);
      }
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/users/now-entries/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    select *
      from "nowww"
      where "userId" = $1
  `;

  const paramQueryValue = [userId];
  db.query(sql, paramQueryValue)
    .then(queryResult => {
      if (!queryResult.rows) {
        throw new ClientError(404, `cannot find user with userId: ${userId}`);
      }
      res.json(queryResult.rows);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  argon2.hash(password)
    .then(hashResult => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values($1, $2)
        returning *;
      `;
      const params = [username, hashResult];
      db.query(sql, params)
        .then(queryResult => {
          const [newUser] = queryResult.rows;
          res.status(201).json(newUser);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'a happy accident occurred'
          });
        });
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/my-now/', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    select "userId",
           "username",
           "profilePicture",
           "link",
           "location",
           "tagline",
           "whatContent",
           "whyContent"
      from "users"
      where "userId" = $1
  `;

  const paramQueryValue = [userId];
  db.query(sql, paramQueryValue)
    .then(queryResult => {
      if (!queryResult.rows[0]) {
        throw new ClientError(404, `cannot find user with userId: ${userId}`);
      }
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/my-now-entries/', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    select *
      from "nowww"
      where "userId" = $1
  `;

  const paramQueryValue = [userId];
  db.query(sql, paramQueryValue)
    .then(queryResult => {
      if (!queryResult.rows[0]) {
        throw new ClientError(404, `cannot find now entries for userId: ${userId}`);
      }
      res.json(queryResult.rows);
    })
    .catch(err => next(err));
});

app.put('/api/edit', (req, res, next) => {
  const { userId } = req.user;

  const { profilePicture, link, location, tagline, whatContent, whyContent } = req.body;
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    update "users"
    set "profilePicture" = coalesce($1, "profilePicture"),
        "link" = coalesce($2, "link"),
        "location" = coalesce($3, "location"),
        "tagline" = coalesce($4, "tagline"),
        "whatContent" = coalesce($5, "whatContent"),
        "whyContent" = coalesce($6, "whyContent")
    where "userId" = $7
    returning *
  `;

  const params = [profilePicture, link, location, tagline, whatContent, whyContent, userId];
  db.query(sql, params)
    .then(queryResult => {
      if (!queryResult.rows[0]) {
        throw new ClientError(404, `cannot find user with userId ${userId}`);
      }
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/now-entry', (req, res, next) => {
  const { userId } = req.user;
  const { entry } = req.body;

  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }

  const sql = `
    insert into "nowww" ("userId", "category", "content", "categoryId")
    values ($1, $2, $3, $4)
    returning *
  `;

  const sqlParameters = [userId, null, entry, null];
  db.query(sql, sqlParameters)
    .then(queryResult => {
      if (!queryResult.rows[0]) {
        throw new ClientError(404, `cannot find user with userId ${userId}`);
      }
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/now-entry/:entryId', (req, res, next) => {
  const { userId } = req.user;
  const entryId = Number(req.params.entryId);

  const sql = `
    delete from "nowww"
    where "EntryId" = $1
    and "userId" = $2
  `;

  const sqlParameters = [entryId, userId];
  db.query(sql, sqlParameters)
    .then(queryResult => {
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
