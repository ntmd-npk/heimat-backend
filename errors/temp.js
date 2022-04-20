const removeUser = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const { admin_id } = req.body;
  if (user_id == req._id && req.username == "duyen") {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this account") });
  }
  try {
    if (role == "admin") {
      await Users.findOneAndRemove({
        _id: mongoose.Types.ObjectId(admin_id),
      }).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't delete this account") });
  }
});

const lockUser = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const { user_id } = req.body;
  if (user_id == req._id && req.username == "duyen") {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't lock this account") });
  }
  try {
    if (role == "admin") {
      await Users.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(user_id) },
        { role: "block" }
      ).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't delete this account") });
  }
});

const listLockedUser = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const { user_id } = req.body;
  try {
    if (role == "admin") {
      const result = await Users.find({ role: "block" }).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), result });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't delete this account") });
  }
});

const getListBlogsFromDateTime = asyncHandler(async (req, res, next) => {
  const { from, to } = req.body;
  console.log({ from: new Date(from), to: new Date(to) });
  const blogs = await Blogs.find({
    created_date: {
      $gte: new Date(from),
      $lt: new Date(to),
    },
  }).lean();
  res.status(200).json({
    ...statusResponse(200, "OK", "Successfully"),
    result: blogs,
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await Users.find({ role: "user" }).lean();
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), users });
  } catch {
    res.status(404).json({ ...statusResponse(500, "Fail", "Couldn't get list accounts user") });
  }
});
const getAllAdmins = asyncHandler(async (req, res, next) => {
  try {
    const users = await Users.find({ role: "admin" }).lean();
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), users });
  } catch {
    res.status(404).json({ ...statusResponse(500, "Fail", "Couldn't get list accounts admin") });
  }
});

const reportOtherUser = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { other_user_id, content } = req.body;
  try {
    const user = await Users.findOne({ _id: mongoose.Types.ObjectId(user_id) }).lean();
    res.status(200).json({ user });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

const getOtherUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const user = await Users.findOne({ _id: mongoose.Types.ObjectId(user_id) }).lean();
    res.status(200).json({ user });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});





