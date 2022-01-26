const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");
const PostsController = require("../controllers/post.controller");
const saveImage = require("../middleware/save-image.middleware");
const saveImageS3 = require("../middleware/s3-save-image.middleware");

/**
 * @description Create a new post
 */
router.post("/posts", saveImageS3, PostsController.createPost);

/**
 * @description Get all posts count
 */
router.get("/posts/count", PostsController.getPostCount);

/**
 * @description Get all posts within pagination range in query params
 */
router.get("/posts", PostsController.getPosts);

/**
 * @description
 * Update single post
 */
router.put("/posts/:postId", saveImage, PostsController.updatePost);

/**
 * @description
 * Get single post
 */
router.get("/posts/:postId", PostsController.getPost);

/**
 * @description
 * Delete single post
 */
router.delete("/posts", PostsController.deletePost);

module.exports = router;
