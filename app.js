require("dotenv").config()
const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Server is working fine" });
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
