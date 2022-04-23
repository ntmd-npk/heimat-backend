🔥 Heimat 🔥

# **Authrizations**

## 1. **_Register_**

```
Method: POST
http://localhost:5000/api/v1/auth/register/
Type: JSON
{
    "username": "duyen13",
    "email": "nhatdn.it@gmail.com",
    "password": "duyen01",
    "fullname": "Nguyễn Thị Mỹ Duyên"
}
```

## 2. **_Verification_**

```
Method: POST
http://localhost:5000/api/v1/auth/verification/
Type: JSON
{
    "email": "nhatdn.it@gmail.com",
    "code": "305257"
}
```

## 3. **_Login_**

```
Method: POST
http://localhost:5000/api/v1/auth/login/
Type: JSON
{
    "username" : "nhat",
    "password": "nhat2572001"
}
```

## 4. **_Logout_** - Kèm thêm token

```
Method: POST
http://localhost:5000/api/v1/auth/logout/
```

# **Blogs**

## 1. **_Create_** - Kèm thêm token

```
Method: POST
http://localhost:5000/api/v1/posts
Type: JSON
{
    "blog": {
        "title": "Whoa, Is This the Best Marriage Advice?",
        "content": "<p>It was four months after my daughter was born when…</p><h2>Title</h2><p>I started to feel like I was losing myself. When I looked in the mirror, I no longer saw a bubbly, chatty woman, who lived to wear cute outfits and had enough energy to bake a new recipe after a full workday and three-hour commute.</p><p><br></p><ol><li class=\"ql-indent-3\">One</li><li class=\"ql-indent-3\">Two</li><li class=\"ql-indent-3\">Three</li></ol><p><br></p><ul><li class=\"ql-indent-1 ql-align-justify\">Instead, I saw frizzy hair peeking out of a baseball cap, a T-shirt soaked with milk, and a person who barely had enough stamina to make it through the day with her baby, let alone do anything else. Dishes piled up in the sink. Laundry was scattered all over the bedroom floor. And the thought of spending 30 minutes doing my hair and makeup or putting together an outfit no longer sounded fun. It just sounded wasteful.&nbsp;<em>Why use that precious time to make myself look presentable when I could catch up on sleep?</em></li></ul>",
        "created_date": "1/1/2022",
        "upvote": 25,
        "downvote": 7,
        "category_id": "623f4fdeb77709ef9359d709",
        "description": "The other day, I was getting grumpy...",
        "cover": "https://www.toponseek.com/blogs/wp-content/uploads/2019/06/toi-uu-hinh-anh-optimize-image-4-1200x700.jpg"
    }
}
```

## 1. **_Update_**- Kèm thêm token

```
Method: PUT
http://localhost:5000/api/v1/posts/623ede11b7575a7dd854e16e
{
    "blog": {
        "title": "noi bất tử để không phải sợ covid nha ae :)))"
    }
}
```

## 1. **_Delete_** - Kèm thêm token

```
Method: DELETE
http://localhost:5000/api/v1/posts/623ede11b7575a7dd854e16e

```

## 1. **_Get 1 blog of user_**

```
Method: GET
http://localhost:5000/api/v1/posts/62431b9aea05cc58d81ea8fa

trong đó => 62431b9aea05cc58d81ea8fa: là id của blog
```

## 1. **_Get many blogs of user_**

```
Method: GET
http://localhost:5000/api/v1/posts?user_id=6243145fdb385e0ffe2fc6af

```

## 1. **_Get many blogs of categroy_**

```
Method: GET
http://localhost:5000/api/v1/posts/by-category?category_id=623f4fe7b77709ef9359d70b
```

## 1. **_Get all blogs_**

```
Method: GET
http://localhost:5000/api/v1/posts/all
```

# **_Users_**

## 1. **_Get user's informations _** - Kèm thêm token

```
Method: GET
http://localhost:5000/api/v1/users
```

# **Categories**

## 1. **_Create_** Admin - Kèm thêm token

```
Method: POST
http://localhost:5000/api/v1/categories/
Type: JSON
{
    "name" : "new categories"
}
```

## 2. **_Update_** Admin - Kèm thêm token

```
Method: PUT
http://localhost:5000/api/v1/categories/
Type: JSON
{
    "category_id": "6241c0d5aa9639fc57a1a70c",
    "name": "edit category name"
}
```

## 3. **_Delete_** Admin - Kèm thêm token

```
Method: POST
http://localhost:5000/api/v1/categories/
Type: JSON
{
    "category_id": "6241c0d5aa9639fc57a1a70c"
}
```

## 4. **_get Category_**

```
Method: GET
http://localhost:5000/api/v1/categories/
```
