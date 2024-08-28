const express = require("express");
const server = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const productRouters = require("./routes/Products");
const categoriesRouters = require("./routes/Categories");
const brandsRouters = require("./routes/Brands");
const usersRouter = require("./routes/Users");
// const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
// const isAuth = require("./middleware/isAuth");

const cors = require("cors");

server.use(
  cors({
    exposedHeaders: ["Content-Range", "X-Content-Range", "X-Total-Count"],
  })
);
// server.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Expose-Headers",
//     "Content-Range,X-Content-Range,X-Total-Count"
//   );
//   next();
// });

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB");
  }
}
connect();

server.use("/products", productRouters.router);
// we can also use JWT token for client-only auth
server.use("/categories", categoriesRouters.router);
server.use("/brands", brandsRouters.router);
server.use("/users", usersRouter.router);
// server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
