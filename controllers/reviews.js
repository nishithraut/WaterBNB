const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);  //will find the listing
    let newReview = new Review(req.body.review);  //new review
    newReview.author = req.user._id;
    listing.review.push(newReview);  //will push the new review(id) in the array"review" in "Listing"

    await newReview.save();   //saving the new review in Review collection
    await listing.save();    //saving the modifiaction in the existing entry of listing collection

    console.log("new review saved");
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyReview = async (req,res)=>{
    let {id, reviewId}= req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {review: reviewId}});   //find with id and then pull the review from array with reviewId 
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`)
}

