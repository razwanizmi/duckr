const express = require("express");

const app = express();

app.use(express.static("dist"));

app.get("*", (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${listener.address().port}`);
});
