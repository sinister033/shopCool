const express = require("express");
const authController = require("../controllers/auth");
const { check, body } = require("express-validator/check");
const User = require("../models/user");
const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.get("/reset", authController.getReset);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a Valid Email Address.")
      .normalizeEmail(),
    body("password", "Enter a Valid Password.")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);
router.post("/logout", authController.postLogout);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please Enter a valid Email.")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email has been forbidden");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a valid password with numbers and text only that is at least 6 characters long."
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords aren't Matching!");
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup
);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
