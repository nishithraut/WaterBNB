const express = require("express");
const router = express.Router();  //imp
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(
        userController.renderSignUpForm       //SignUp 1] Form 
    )
    .post( 
        wrapAsync(userController.signup)      //SignUp 2] Submit
    )

router
    .route("/login")
    .get (userController.renderLoginForm)    //Login 1] Form
    .post(                                   //Login 2] Submit with Authenticate middleware
        
        saveRedirectUrl, 
        //Middleware:- for login
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true,
        }),
        //Callback after Authentication
        userController.login
    )


// Logout
router.get("/logout", userController.logout);

// //Login 2] Submit with Authenticate middleware
// router.post(
//     //Route
//     "/login",
//     saveRedirectUrl, 
//     //Middleware:- for login
//     passport.authenticate("local", {
//         failureRedirect: '/login',
//         failureFlash: true,
//     }),
//     //Callback after Authentication
//     userController.login
// );


module.exports = router;