const ClientError = require('./client-error');
require('dotenv/config');
const path = require('path');
const express = require('express');
const app = express();
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const pg = require('pg');
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
