let Users = require("../models/users");
let queueUser = require("../models/queueUser");
const jwt = require("jsonwebtoken");
const verifyEmail = require("../utils/verifyEmail");
const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const createError = require("http-errors");

const register = asyncHandler(async function (req, res, next) {
  try {
    const { username, password, email, fullname } = req.body;
    const account = await Users.findOne({ $or: [{ username }, { email }] });
    if (account) {
      res.status(404).json({
        ...statusResponse(404, "Fail", "this account existed"),
      });
    } else {
      verifyEmail(email)
        .then((result) => {
          if (result.status) {
            var user = queueUser.find((user) => user.email === email);
            if (user) {
              user.code = result.code;
            } else {
              var user = {};
              user.fullname = fullname;
              user.username = username;
              user.password = password;
              user.email = email;
              user.code = result.code;
              queueUser.push(user);
            }
            res.status(200).json({
              ...statusResponse(200, "OK", "Please check your mail for verification"),
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            ...statusResponse(500, "Fail", "your mail didn't exist and couldn't verify."),
          });
        });
    }
  } catch (error) {
    if (error.isJoi === true) return next(createError.BadRequest("Invalid Email/Password"));
    next(error);
  }
});

const verifyRegister = asyncHandler(async function (req, res, next) {
  try {
    const { email, code } = req.body;
    let indexUser = null;
    var user = queueUser.find((user, index) => {
      if (user.email == email && user.code == code) {
        indexUser = index;
        return true;
      }
      return false;
    });
    if (!user) {
      res.status(404).json({
        ...statusResponse(404, "Fail", "Your email or code is incorrect, please try again."),
      });
    } else {
      var user = {
        username: user.username,
        email: user.email,
        password: user.password,
        fullname: user.fullname,
      };
      console.log(user);
      if (indexUser != null) {
        queueUser.slice(indexUser, 1);
      }
      const account = new Users({ ...user });
      await account.save();
      console.log(account);
      res.status(200).json({
        ...statusResponse(
          200,
          "OK",
          "Account verification successful, please return to the login page to log in."
        ),
      });
    }
  } catch {
    res.status(500).json({
      ...statusResponse(500, "Fail", "Cant verification this account"),
    });
  }
});

const login = asyncHandler(async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    var account = await Users.findOne({ $or: [{ username }, { email }], password });
    console.log(account);
    if (account) {
      const { _id, username, role, email, fullname } = account;
      const accessToken = jwt.sign(
        { _id, username, role, email, fullname },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const refreshToken = jwt.sign(
        { _id, username, role, email, fullname },
        process.env.REFESH_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      console.log(role);
      if (role == "admin") {
        return res.status(200).json({
          ...statusResponse(200, "OK", "Login successed!!!"),
          ...{ data: { _id, username, email, fullname, role }, accessToken, refreshToken },
        });
      } else {
        return res.status(200).json({
          ...statusResponse(200, "OK", "Login successed!!!"),
          ...{ data: { _id, username, email, fullname }, accessToken, refreshToken },
        });
      }
    } else {
      res.status(401).json({
        ...statusResponse(
          401,
          "Fail",
          "Your username or password is incorrect, please login again."
        ),
      });
    }
  } catch {
    res.status(500).json({
      ...statusResponse(500, "Fail", "Cant verification this account"),
    });
  }
});

function logout(req, res) {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    ...statusResponse(200, "OK", "You have successfully logged out."),
    ...{ success: true, data: {} },
  });
}

module.exports = {
  register,
  logout,
  login,
  verifyRegister,
};
