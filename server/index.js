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
const publicPath = path.join(__dirname, 'public');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(jsonMiddleware);

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
    throw new ClientError(400, 'productId must be a positive integer');
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
        throw new ClientError(404, `cannot find product with productId ${userId}`);
      }
      res.json(queryResult.rows[0]);
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

app.get('/api/my-now/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'productId must be a positive integer');
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
        throw new ClientError(404, `cannot find product with productId ${userId}`);
      }
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/my-now/:userId', (req, res, next) => {
  // console.log('fire!')
  const { profilePicture, link, location, tagline, whatContent, whyContent } = req.body;
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'productId must be a positive integer');
  }

  // insert into "users"("profilePicture", "link", "location", "tagline", "whatContent", "whyContent")
  // values($1, $2, $3, $4, $5, $6)
  // where "userId" = $2
  // insert into "users"("link")
  // values($1)

  // insert into "users"("link")
  //   values($1)
  //     where "userId" = $2

  const sql = `
    update "users"
    set "profilePicture" = $1,
        "link" = $2,
        "location" = $3,
        "tagline" = $4,
        "whatContent" = $5,
        "whyContent" = $6
    where "userId" = $7
  `;

  // console.log(sql)
  const params = [profilePicture, link, location, tagline, whatContent, whyContent, userId];
  // const params = ['f', '5'];
  // const params = [link, location, userId];
  // console.log('fire2')

  // const paramQueryValue = [userId];
  // db.query(sql, paramQueryValue)
  db.query(sql, params)
    .then(queryResult => {
      // if (!queryResult.rows[0]) {
      //   throw new ClientError(404, `cannot find product with productId ${userId}`);
      // }
      // console.log('fire4')
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
// console.log('fire3')
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
