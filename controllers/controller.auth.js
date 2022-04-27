let Users = require("../models/users");
const jwt = require("jsonwebtoken");
const verifyEmail = require("../utils/verifyEmail");
const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const createError = require("http-errors");
const handleAccount = require("../models/handleAccount");
const mongoose = require("mongoose");
const deleteAccount = require("../utils/queueHandleAccount");

const register = asyncHandler(async function (req, res, next) {
  try {
    const { username, password, email, fullname, created_date } = req.body;
    const account = await Users.findOne({ $or: [{ username }, { email }] }).lean();
    if (account) {
      res.status(404).json({
        ...statusResponse(404, "Fail", "this account existed"),
      });
    } else {
      var user = await handleAccount.findOne({ $or: [{ username }, { email }] }).lean();
      if (user) {
        res.status(200).json({
          ...statusResponse(
            200,
            "OK",
            "We sent the code to your email earlier. Please check your mail for verification!!!"
          ),
        });
      } else
        verifyEmail(email)
          .then(async (result) => {
            if (result.status) {
              temp = new handleAccount({
                fullname,
                username,
                password,
                created_date,
                email,
                typeAccount: "register",
                code: result.code,
              });
              await temp.save();
            }
            deleteAccount(email);
            return res.status(200).json({
              ...statusResponse(200, "OK", "Please check your mail for verification"),
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              ...statusResponse(
                500,
                "Fail",
                "Error: Something went wrong! Please ensure all fields are in the right format!"
              ),
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
    const result = await handleAccount.findOne({ email, code }).lean();
    if (result) {
      const { username, password, email, fullname, created_date } = result;
      req.body.password = password;
      const account = new Users({ username, password, email, fullname, created_date });
      await account.save();
      await handleAccount.findOneAndRemove({ email });
      next();
    } else {
      res.status(404).json({
        ...statusResponse(404, "Fail", "Your email or code is incorrect, please try again."),
      });
    }
  } catch (e) {
    res.status(500).json({
      ...statusResponse(500, "Fail", "Cant verification this account"),
    });
  }
});

const forgotPassword = asyncHandler(async function (req, res, next) {
  try {
    const { email } = req.body;
    const result = await Users.findOne({ email }).lean();
    if (result) {
      const { username, password, email, fullname, created_date } = result;
      verifyEmail(email)
        .then(async (result) => {
          if (result.status) {
            temp = new handleAccount({
              fullname,
              username,
              password,
              created_date,
              email,
              typeAccount: "register",
              code: result.code,
            });
            await temp.save();
          }
          deleteAccount(email);
          return res.status(200).json({
            ...statusResponse(200, "OK", "Please check your mail for verification"),
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            ...statusResponse(
              500,
              "Fail",
              "Error: Something went wrong! Please ensure all fields are in the right format!"
            ),
          });
        });
    } else {
      res.status(404).json({
        ...statusResponse(404, "Fail", "Your email is incorrect, please try again."),
      });
    }
  } catch (e) {
    res.status(500).json({
      ...statusResponse(500, "Fail", "Cant verification this account"),
    });
  }
});

const login = asyncHandler(async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    var account = await Users.findOne({ $or: [{ username }, { email }], password }).lean();
    if (account) {
      const { _id, username, role, email, fullname, cover, description, avatar, status } = account;
      if (status == "block") {
        return res.json({
          ...statusResponse(
            403,
            "Fail",
            "Your account has been locked for violating Heimat's policy and terms of use!!!"
          ),
        });
      }
      const accessToken = jwt.sign(
        { _id, username, role, email, fullname },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "200s",
        }
      );

      const refreshToken = jwt.sign({ _id }, process.env.REFESH_TOKEN_SECRET, {
        expiresIn: "168h",
      });
      if (role == "admin") {
        return res.status(200).json({
          ...statusResponse(200, "OK", "Login successed!!!"),
          ...{
            data: { _id, username, email, fullname, role, cover, description, avatar },
            accessToken,
            refreshToken,
          },
        });
      } else {
        return res.status(200).json({
          ...statusResponse(200, "OK", "Login successed!!!"),
          ...{
            data: { _id, username, email, fullname, cover, description, avatar },
            accessToken,
            refreshToken,
          },
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

const refeshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  const decoded = jwt.verify(refreshToken, process.env.REFESH_TOKEN_SECRET);
  if (!decoded) {
    res.status(401).json({ ...statusResponse(401, "Fail", "You need to login again") });
  } else {
    const { _id } = decoded;
    console.log(decoded);
    const { username, role, email, fullname } = await Users.findOne({
      _id: mongoose.Types.ObjectId(_id),
    }).lean();
    console.log({ username, role, email, fullname });
    const accessToken = jwt.sign(
      { _id, username, role, email, fullname },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "200s",
      }
    );
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), accessToken });
  }
});
module.exports = {
  register,
  logout,
  login,
  verifyRegister,
  refeshToken,
  forgotPassword,
};
