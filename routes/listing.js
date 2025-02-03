const express = require("express");
const router = express.Router();  //imp
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingController = require("../controllers/listings.js");

//multer to parse files
const multer = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

router
    .route("/")
    .get( wrapAsync(listingController.index))   //Listings Index route
    .post(        // req.file have the url for image on cloud                             //New Route  2] Submit
        isLoggedIn ,
        upload.single("listing[image]"), 
        validateListing,
        wrapAsync(listingController.createListing)
    );

//New Route  1] Form
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    .get(                 //show route
        wrapAsync(listingController.showListing)
    )
    .put(                 //Update 2] Submit
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"), 
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(              //delete route
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

    
//Update 1] Form 
router.get(
    "/:id/edit" , 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

 
module.exports = router;