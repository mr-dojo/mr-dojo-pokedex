const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = 8000
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

app.use(morgan('dev'));
app.use(validateBearerToken)

app.get('/types', handleGetTypes);
app.get('/pokemon', handleGetPokemon);

function handleGetTypes(req, res) {
  res.json(validTypes);
};

function handleGetPokemon(req, res) {
  res.send('Hello Pokemon');
};

function validateBearerToken(req, res, next) {
  const userKey = req.get('Authorization');
  const API_KEY = process.env.API_KEY
  if (!userKey || userKey.split(" ")[1] !== API_KEY) {
    res.status(401).json({ error: "Unauthorized requrest" })
  };
  next();
};

app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`));