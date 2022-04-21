const asyncHandler = require("../middlewares/async");
const Users = require("../models/users");
const Blogs = require("../models/blogs");
const Comments = require("../models/comments");
const mongoose = require("mongoose");
const statusResponse = require("../utils/statusResponse");

//==================================================================//
const getProfile = asyncHandler(async (req, res, next) => {
  const id = req._id;
  try {
    const user = await Users.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
    res.status(200).json({ user });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req._id;
    const file = req?.file;
    if (req.body?.profile) {
      const profile = JSON.parse(req.body.profile);
      if (profile?.fullname != undefined) {
        await Users.updateOne(
          {
            _id: mongoose.Types.ObjectId(user_id),
          },
          { $set: { fullname: profile.fullname } }
        );
      }
      if (profile?.description != undefined) {
        await Users.updateOne(
          {
            _id: mongoose.Types.ObjectId(user_id),
          },
          { $set: { description: profile.description } }
        );
      }
      if (profile?.gender != undefined) {
        await Users.updateOne(
          {
            _id: mongoose.Types.ObjectId(user_id),
          },
          { $set: { gender: profile.gender } }
        );
      }
      if (profile?.birthday != undefined) {
        await Users.updateOne(
          {
            _id: mongoose.Types.ObjectId(user_id),
          },
          { $set: { birthday: new Date(profile.birthday) } }
        );
      }
    }
    if (file != undefined)
      await Users.updateOne(
        {
          _id: mongoose.Types.ObjectId(user_id),
        },
        { $set: { avatar: process.env.URL_FILE + file.filename } }
      );
    res.status(200).json({ ...statusResponse(200, "OK", "Successed") });
  } catch  {
   
    res.status(500).json({ ...statusResponse(500, "Fail", "Errored") });
  }
});

const deleteProfile = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  try {
    await Users.following.pull(mongoose.Types.ObjectId(user_id));
    await Users.followers.pull(mongoose.Types.ObjectId(user_id));
    await Users.findOneAndRemove({ _id: mongoose.Types.ObjectId(user_id) }).lean();
    await Blogs.findOneAndRemove({ user_id: mongoose.Types.ObjectId(user_id) }).lean();
    await Comments.findOneAndRemove({ from_user_id: mongoose.Types.ObjectId(user_id) }).lean();
    res.status(200).json({ ...statusResponse(200, "OK", "Successed") });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

const followers = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { user } = req.body;
  try {
    let USERID = await Users.findById(mongoose.Types.ObjectId(user_id)).lean();
    if (USERID.following.includes(mongoose.Types.ObjectId(user))) {
      res.json({ result: "existed" });
    } else {
      USERID.following.push(mongoose.Types.ObjectId(user));
      let userFollowed = await Users.findById(mongoose.Types.ObjectId(user)).lean();
      userFollowed.followers.push(mongoose.Types.ObjectId(user_id));
      await USERID.save();
      await userFollowed.save();
    }
    res.status(200).json({ result: "OK" });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

const unfollowers = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { user } = req.body;
  try {
    let USERID = await Users.findById(mongoose.Types.ObjectId(user_id)).lean();
    if (USERID.following.includes(mongoose.Types.ObjectId(user))) {
      USERID.following.pull(mongoose.Types.ObjectId(user));
      let userFollowed = await Users.findById(mongoose.Types.ObjectId(user)).lean();
      userFollowed.followers.pull(mongoose.Types.ObjectId(user_id));
      await USERID.save();
      await userFollowed.save();
    } else {
      res.json({ result: "existed" });
    }
    res.status(200).json({ result: "OK" });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

const listUserFollowing = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  try {
    const temp = await Users.findById({ _id: mongoose.Types.ObjectId(user_id) })
      .lean()
      .distinct("following");
    const result = await Users.find({
      _id: {
        $in: temp,
      },
    })
      .lean()
      .select("_id username fullname avatar description");
    res.status(200).json({ result });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});
const listUserFollowers = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  try {
    const temp = await Users.findById({ _id: mongoose.Types.ObjectId(user_id) })
      .distinct("followers")
      .lean();
    const result = await Users.find({
      _id: {
        $in: temp,
      },
    })
      .lean()
      .select("_id username fullname avatar description");
    res.status(200).json({ result });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
  followers,
  unfollowers,
  listUserFollowing,
  listUserFollowers,
};
