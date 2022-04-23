const result = await Reports.aggregate([
  {
    $match: {
      "content.type": "comment",
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $lookup: {
      from: "comments",
      localField: "content.object_id",
      foreignField: "_id",
      as: "object",
    },
  },
  {
    $unwind: {
      path: "$object",
    },
  },
  {
    $project: {
      user: {
        _id: 1,
        username: 1,
        email: 1,
        avatar: 1,
        block: 1,
        created_date: 1,
      },
      object: {
        _id: 1,
        from_user_id: 1,
        content: 1,
        status: 1,
        created_date: 1,
      },
      created_date: 1,
      description: 1,
    },
  },
]);
