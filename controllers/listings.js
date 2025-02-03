const Listing = require("../models/listing.js");





//mbx required here bcos we need to do forward geocoding in creatlisting
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MapToken;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });





module.exports.index = async (req,res)=>{
    let allListings =  await Listing.find({});
    res.render("listings/index.ejs", {allListings});
 }

module.exports.renderNewForm =(req,res)=>{ 
    console.log(req.user);
    res.render("listings/new.ejs");
}

module.exports.createListing = async(req,res,next)=>{
    console.log(req.body.listing);

    let geoLocation = req.body.listing.location + ", " + req.body.listing.country;

    let response = await geocodingClient.forwardGeocode({
        query: geoLocation,
        limit: 1
      })
        .send()
        
    let coordinates=response.body.features[0].geometry;
    console.log(coordinates);
    

    let url = req.file.path;
    let filename = req.file.filename;

    let newlisting= new Listing(req.body.listing);  //const user1 = new User({ key: value })
    newlisting.owner = req.user._id;                //Adding current user._id in newlisting.ownerowner
    newlisting.image = {url, filename};

    newlisting.geometry = response.body.features[0].geometry;  // to save coodnts of location entered by user (coming from mapbox fwd geocode)
    
    let savedListing = await newlisting.save();
    console.log("saved listing\n" + savedListing);
    req.flash("success", "New Listing Created!");  //Creating flash msg
    res.redirect("/listings");      
}

module.exports.showListing = async (req,res)=>{
    let {id} =  req.params;
    
    let listing =  await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author",
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.renderEditForm = async (req,res) => {
    let {id} =  req.params;
    let listing =  await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }

    let orgImage = listing.image.url;
    orgImage.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", {listing, orgImage});
}

module.exports.updateListing = async (req,res) => {
    
    let {id} =  req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing } );
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image= {url, filename};
        await listing.save();
    }
    

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let {id} =  req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}