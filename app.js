const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const sequelize = require("./config/database");

const app = express();
const port = process.env.PORT || 8080;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
    process.exit(1); 
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});