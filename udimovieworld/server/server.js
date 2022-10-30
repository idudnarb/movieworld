const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DATABASE_ENDPOINT = process.env.DATABASE_LOCAL_ENDPOINT;

mongoose
  .connect(DATABASE_ENDPOINT)
  .then((connection) => console.log("Successfully connect to MongoDB"))
  .catch((error) => console.log(error));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port*: ${port}`));
