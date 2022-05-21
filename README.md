# moments-api

<h3>Backend for [moments](https://github.com/ravikumar0403/moments-client)</h3>

## Table of Contents

- [Getting Started](#getting-started)
- [Live link](#live-link)
- [About](#about)
- [Technologies used](#-technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Connect with me](#-connect-with-me)

## Getting Started

- Clone the repository on your local machine with the command below in your terminal, and cd into the **moments-api** folder

```sh
https://github.com/ravikumar0403/moments-api.git

cd moments-api
```

- Install dependencies (if you are using **yarn** then do with that)

```sh
npm install
```

- Create a `.env` file in the root directory (at the level of `package.json`) and create a environment variables

```
DB_URL = <YOUR_DB_URL>
SALT_ROUNDS = <SALT_ROUNDS_FOR_JWT>
JWT_SECRET = <JWT_SECRET>
```

- Start the server

```
npm start
```

## Live link

https://moments-social.netlify.app/

## About

- moments is a social media web app for people to connect with each other.
- Users can share pictures and GIFs with others, upload, like, comment, and bookmark the posts. Follow each other and be connected.

## 🛠 Technologies used

#### [Frontend](https://github.com/ravikumar0403/moments-client)
- ReactJS
- Redux Toolkit
- React Router
- Tailwind

#### Backend
- Node.js
- Express
- MongoDB
- Mongoose


## Features

**User/Home Feed**:

- User will able to see all his posts and post of the people he/she follow.
- Feed can be sort based on `latest first`, `oldest first` and `trending` posts.
- User/Home feed has `infinite scroll`.

**Explore Feed**

- All the new users posts will be shown over here.
- Explore feed has `infinite scroll`

**Post**

- User can `create`, `like/unlike` `edit`, `delete`, and `bookmark` a post.
- Each post can be viewed on single page where user can add a `comment`.
- Post can consist of text, image or gifs.

**Profile**

- User can view their profile or any other users profile.
- Each user can edit their profile.
- User can follow someone by visiting their profile.

**Authentication**

- moments has login, signup and logout feature.
- A new user can also login using test credentials.
- For Signup and login, form validation is done for all the fields.

**Dark mode**

- Has light and dark mode.

## Screenshots

  
![chrome-capture-2022-4-21 (1)](https://user-images.githubusercontent.com/62254807/169636410-7c6ce203-fdb2-4312-b0ec-95fb2f1ec8c9.gif)
![chrome-capture-2022-4-21](https://user-images.githubusercontent.com/62254807/169636420-60f75e7d-af54-4399-bff7-6fe42ee3145c.gif)


<p align="left">
<img width="250px" src="https://user-images.githubusercontent.com/62254807/169636425-8913b32e-9159-4837-a463-2b09aa77d90a.png"/>
<img width="250px" src="https://user-images.githubusercontent.com/62254807/169636429-9437ec75-6304-49c5-9a83-5328f3761605.png"/>
<img width="250px" src="https://user-images.githubusercontent.com/62254807/169636552-712048a2-b0d1-4f1e-a0d4-314486ceef31.png"/>
</p>

![moments-social netlify app_](https://user-images.githubusercontent.com/62254807/169636554-5cb8d7ec-3457-4439-95ef-f6e7c58575c0.png)



## 👨‍💻 Connect with me

<a href="https://twitter.com/ravikumar0403"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>
<a href="https://www.linkedin.com/in/ravikumar0403/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
