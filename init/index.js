const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//connection
main()
.then(() => {
    console.log("connection wanderlust");
})
.catch((err) => console.log(err));

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//initData is an object in which data is array
//initData.data is array
const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "670e7ccb2cb64284753a34ac"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();


// sample testring
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "my new villa",
//         description : "by the beach",
//         price: 1200,
//         location:"goa",
//         country:"india"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesful testing");
// });