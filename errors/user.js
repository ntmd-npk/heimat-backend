const FakeDBUsers = [
  {
    username: "nhat",
    password: "nhat",
    scope: "user",
    avatar:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
    gender: "Male",
    email: "nhat@gmail.com",
    status: "",
    listMessenges: [
      {
        _id: "1",
        to: "2",
        date: "30/5/2022",
        content: "Hello you",
      },
    ],
    follow: ["2"],
    fullname: "Nguyễn Đình Nhật",
    description: "Fate in love",
    birthday: "13/3/2001",
  },
  {
    _id: "2",
    username: "duyen",
    password: "duyen",
    scope: "user",
    avatar:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
    gender: "Female",
    email: "duyen@gmail.com",
    status: "",
    listMessenges: [
      {
        _id: "2",
        to: "1",
        date: "30/5/2022",
        content: "Hello you",
      },
    ],
    follow: ["1"],
    fullname: "Nguyễn Thị Mỹ Duyên",
    description: "Finally, we are a family...",
    birthday: "30/5/2001",
  },
  {
    _id: "3",
    username: "phuc",
    password: "phuc",
    scope: "user",
    avatar:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
    gender: "Male",
    email: "phuc@gmail.com",
    status: "",
    listMessenges: [
      {
        _id: "1",
        to: "2",
        date: "1/1/2022",
        content: "Hello you",
      },
    ],
    follow: ["2"],
    fullname: "Trần Quốc Phúc",
    description: "I'm rich kid",
    birthday: "1/1/2001",
  },
  {
    _id: "4",
    username: "huyen",
    password: "huyen",
    scope: "user",
    avatar:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
    gender: "Female",
    email: "huyen@gmail.com",
    status: "",
    listMessenges: [
      {
        _id: "1",
        to: "2",
        date: "1/1/2022",
        content: "Hello you",
      },
    ],
    follow: ["2"],
    fullname: "Trịnh Thị Huyền",
    description: "The honed lump will becomes a diamond",
    birthday: "1/1/2001",
  },
  {
    _id: "5",
    username: "hoa",
    password: "hoa",
    scope: "admin",
    avatar:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
    gender: "Male",
    email: "hoa@gmail.com",
    status: "",
    listMessenges: [
      {
        _id: "1",
        to: "2",
        date: "1/1/2022",
        content: "Hello you",
      },
    ],
    follow: ["2"],
    fullname: "Lê Thanh Hòa",
    description: "Tab ẩn danh",
    birthday: "1/1/2001",
  },
  {
    _id: "6",
    username: "hieu",
    password: "hieu",
    scope: "admin",
    avatar:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
    gender: "Male",
    email: "nhat@gmail.com",
    status: "",
    listMessenges: [
      {
        _id: "1",
        to: "2",
        date: "1/1/2022",
        content: "Hello you",
      },
    ],
    follow: ["2"],
    fullname: "Nguyễn Văn Hiếu",
    description: "Hiếu sổ đỏ",
    birthday: "1/1/2001",
  },
];

module.exports = FakeDBUsers;
