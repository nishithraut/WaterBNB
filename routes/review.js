const express = require("express");
const router = express.Router( { mergeParams : true } );  //imp

const reviewController = require("../controllers/reviews.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

//error handlers
const wrapAsync = require("../utils/wrapAsync.js");

//Review
router.post("/",
    isLoggedIn, 
    validateReview , 
    wrapAsync(reviewController.createReview)
);

//Delete review route
router.delete("/:reviewId",
    isLoggedIn, 
    isReviewAuthor,
    wrapAsync (reviewController.destroyReview)
);

module.exports = router;
