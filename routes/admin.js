const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", isAuth, adminController.getProducts);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 4 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 8, max: 200 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);
router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 4 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 8, max: 200 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);
router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
