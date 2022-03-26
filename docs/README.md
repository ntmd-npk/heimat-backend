🔥 Heimat 🔥

# **Authrization**

## 1. **_Register_**

```
api: http://localhost:5000/api/v1/auth/register

example about data in body:
{
    "username": "duyen01",
    "email": "nhatdn.it@gmail.com",
    "password": "duyen01"
}
```

![Register in Postman](/backend/docs/register.png)

## 2. **_Verify register_**

```
api: http://localhost:5000/api/v1/auth/verification

example about data in body:
{
    "email": "nhatdn.it@gmail.com",
    "code": "305257"
}
```

![Register in Postman](/backend/docs/verification.png)

## 3. **_Login_**

```
api: http://localhost:5000/api/v1/auth/login

example about data in body:
CASE 1:
{
    "email": "nhatdn.it@gmail.com",
    "password": "duyen01"
}
```

![Register in Postman](/backend/docs/loginByEmail.png)

```
CASE 2:
{
    "username": "duyen01",
    "password": "duyen01"
}
```

![Register in Postman](/backend/docs/loginByUsername.png)

## 4. **_logout_**

```
api: http://localhost:5000/api/v1/auth/logout

example about data in body:
none

```

![Register in Postman](/backend/docs/verification.png)

## 5. List accounts created:

|  **Account**  | **Password** |
| ------------- | ------------ |
| duyen         | duyen        |
| nhat          | nhat         |
| hoa           | hoa          |
| hieu          | hieu         |
| huyen         | huyen        |
| phuc          | phuc         |

-> 26/2/2022 <-
