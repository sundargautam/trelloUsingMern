const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000",
};
const app = express();
const db = require("./model/index");
const dbConfig = require("./config/db.config");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes/todo.route")(app);
require("./routes/auth.route")(app);
app.listen(process.env.PORT || 8080, () => {
  console.log(`listening in port ${process.env.PORT}`);
});
