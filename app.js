const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const router = require("./routers/index");

app.use("/uploads", express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
