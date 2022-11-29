const express = require("express");
const router = express.Router();
const kakao = require("./user/kakao");
const google = require("./user/google");
const signup = require("./user/signup");
const signin = require("./user/signin");
const signout = require("./user/signout");
const posts = require("./post/posts");
const post_add = require("./post/post-add");
const post_delete = require("./post/post-delete");
const post_modify = require("./post/post-modify");
const post_statusmodify = require("./post/post-statusModify");
const chat = require("./chat/chat");
const user_modify = require("./user/user-modify");
const user_posts = require("./user/user-posts");
const user_delete = require("./user/user-delete");

// oauth
router.get("/", kakao.get);
router.post("/kakao-login/token", kakao.getToken);
router.get("/kakao-login/userInfo?", kakao.getUserInfo);
router.post("/google-login/token", google.getToken);
router.get("/google-login/userInfo?", google.getUserInfo);

// user
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.patch("/user-modify", user_modify);
router.get("/mylist/:id", user_posts.getUserPosts);
router.delete("/user-delete/:id", user_delete.userDelete);

// post
router.get("/posts", posts.getAllPost);
router.post("/post-add", post_add.sendPost);
router.delete("/post-delete/:id", post_delete.postdelete);
router.patch("/post-modify/:id", post_modify.postmodify);
router.patch("/post-statusmodify/:id", post_statusmodify.statysModify);
router.get("/chat", chat.chatAll);
module.exports = router;
