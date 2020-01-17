const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 8000

app.use(morgan('dev'));
app.use((req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`));