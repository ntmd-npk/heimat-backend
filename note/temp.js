const verifyRegister = asyncHandler(async function (req, res, next) {
  try {
    const { email, code } = req.body;

    let indexUser = null;
    var user = queueUser
      .find((user, index) => {
        if (user.email == email && user.code == code) {
          indexUser = index;
          return true;
        }
        return false;
      })
      .lean();
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
        created_date: new Date(user.created_date),
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
