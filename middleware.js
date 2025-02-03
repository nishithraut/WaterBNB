const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema , reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    // 1. Check if the user is authenticated
    // req.isAuthenticated() check if user is logged in 
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        // 2. If not authenticated, flash an error message
        req.flash("error", "You must be logged in to create a new listing!");
        
        // 3. Redirect the user to the login page
        return res.redirect("/login");
    }
    
    // 4. If authenticated, proceed to the next middleware or route handler
    next();
};

//to save req.session.redirectUrl in res.locals.redirectUrl
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }else{
        res.locals.redirectUrl = "/listings";
    }
    next();
};

//Authorization for listings edit deletion
module.exports.isOwner = async (req, res, next) => {
    let {id} =  req.params;
    let listing = await Listing.findById(id);

    //authorization
    if( ! listing.owner._id.equals(res.locals.currUser._id) ){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

//Authorization for reviews deletion
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } =  req.params;
    let review = await Review.findById(reviewId);

    //authorization
    if( ! review.author._id.equals(res.locals.currUser._id) ){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

//joi Validation
//middlewares
module.exports.validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//joi Validation
//middlewares
module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);  //validating req.body using reviewSchema
    
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}