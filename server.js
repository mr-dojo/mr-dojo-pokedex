const express = require("express");
const morgan = require("morgan");
const POKEDEX = require("./pokemon");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 8000
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "dev";
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]


app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
app.use(validateBearerToken);
app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'Server error' }}
  } else {
    response = { error }
  }
  res.status(500).send(response);
});

app.get('/types', handleGetTypes);
app.get('/pokemon', handleGetPokemon);

function handleGetTypes(req, res) {
  res.json(validTypes);
};

function handleGetPokemon(req, res) {
  const { search = "", type } = req.query;
  let response = POKEDEX.pokemon

  if(type) {
    response = response.filter(pokemon =>
      pokemon.type.includes(type)
    )
  }

  if (search) {
    response = response.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  return res.json(response);
};

function validateBearerToken(req, res, next) {
  const userKey = req.get('Authorization');
  const API_KEY = process.env.API_KEY
  if (!userKey || userKey.split(" ")[1] !== API_KEY) {
    return res.status(401).json({ "error": "Unauthorized requrest" })
  };
  next();
};

app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`));