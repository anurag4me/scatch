require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const ownerRouter = require("./routes/owner.routes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
const app = express();

connectDB(process.env.DB_CONNECT)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Mongo error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser())

app.get("/", (req, res) => {
  return res.send("<h1>Hello World!</h1>");
});

// Routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/owner", ownerRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
