require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

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
    // throw new ClientError(400, 'productId must be a positive integer');
    return;
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
  // $1 = first element in the paramQueryValue array
  // which means that $2 is the following element in the paramQueryValue array

  db.query(sql, paramQueryValue)
    .then(queryResult => {
      if (!queryResult.rows[0]) {
        // throw new ClientError(404, `cannot find product with productId ${userId}`);
        return;
      }
      res.json(queryResult.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
