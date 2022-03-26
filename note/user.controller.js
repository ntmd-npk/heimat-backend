const jwt = require("jsonwebtoken");

let FakeDBUsers = require("../models/user");
let PostsUsers = require("../models/posts");

function login(req, res) {
  const { username, password } = req.body;
  const result = FakeDBUsers.find((user) => user.username == username && user.password == password);
  if (!result) res.json({ result: "your account doesn't exist" }).sendStatus(401);
  const accessToken = jwt.sign({ username }, "my-secret", {
    expiresIn: "30s",
  });
  const refeshToken = jwt.sign({ username }, "my-refesh-secret", {
    expiresIn: "1h",
  });
  res.json({ ...result, accessToken, refeshToken });
}

function checkToken(req, res) {
  res.json({ status: "successfully" });
}

function getPost(req, res) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, "my-secret").trim();
  PostsUser = PostsUsers.filter((post) => post.username == decoded);
  res.json({ PostsUser });
}
module.exports = {
  login,
  getPost,
  checkToken,
};
