require("dotenv").config();

const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");
const db = require("./databas/db");
var morgan = require("morgan");
const fetchuser = require("./middleware/fetchuser");
const isAdmin = require("./middleware/verifyAdmin");
const { SUPERADMIN, ADMIN } = require("./Admin");

db();

app.use(morgan("dev"));
// For body pares
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use("/api/user", require("./routes/auth"));
// app.use("/api/notes", require("./routes/notes"));

app.get("/admin", fetchuser, isAdmin(ADMIN), (req, res) => {
  res.send("admin dash bord");
});
app.post(
  "/superadmin",
  fetchuser,
  isAdmin(SUPERADMIN),
  (req, res) => {
    res.send("SupperAdmin dash bord");
  }
);

app.get("/", (req, res) => {
  res.send("user");
});

app.listen(port, () => {
  console.log(`Example app ggg http://10.0.0.37:${port}`);
});
