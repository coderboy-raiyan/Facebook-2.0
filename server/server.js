const http = require("http");

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "server is running" });
});

server.listen(PORT, () => {
  console.log("listening on PORT...");
});
