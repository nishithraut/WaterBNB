if(process.env.NODE_ENV != "production"){
    require("dotenv").config();   //importing dotenv
}

// console.log(process.env.SECRET);

// Require necessary packages and modules
const express = require("express"); // Web framework for building the app
const app = express(); // Initialize the Express application
const mongoose = require("mongoose"); // For MongoDB database connection
const path = require("path"); // For handling file and directory paths
const methodOverride = require("method-override"); // Allows using HTTP verbs like PUT or DELETE in forms
const ejsMate = require("ejs-mate"); // For using EJS layout templates
const ExpressError = require("./utils/ExpressError.js"); // Custom error handling class
const session = require("express-session"); // Middleware for session management
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); // Middleware for flash messages
const passport = require("passport"); // Authentication middleware
const LocalStrategy = require("passport-local"); // Passport strategy for local authentication
const User = require("./models/user.js"); // User model for authentication


// Import routes
const listingRouter = require("./routes/listing.js"); // Handles routes related to listings
const reviewRouter = require("./routes/review.js"); // Handles routes related to reviews
const userRouter = require("./routes/user.js"); // Handles user-related functionality (login, signup, etc.)

// Set up views and static files
app.set("views", path.join(__dirname, "views")); // Specify the directory for EJS templates
app.set("view engine", "ejs"); // Use EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies (for form submissions)
app.use(methodOverride("_method")); // Support for HTTP verbs like PUT and DELETE using query parameters
app.engine("ejs", ejsMate); // Use EJS-Mate for layouts and partials
app.use(express.static(path.join(__dirname, "public"))); // Serve static files like CSS, JS, and images




const dbURL = process.env.ATLASDB_URL;

//Database Connection
main()
    .then(() => {
        console.log("connecting to wanderlust");
    })
    .catch((err) => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust'); this was for to connect with local devide
    await mongoose.connect(dbURL);
}


const store = MongoStore.create({
    mongoUrl: dbURL,  // Connects session store to MongoDB Atlas using the provided database URL.
    crypto: {
        secret: process.env.secret, // Encrypts session data for security.
    },
    touchAfter: 24 * 3600, // Reduces unnecessary database writes by updating session data only once per day.
}); 

store.on("error", () => {
    console.log("error in mongo session store", error);
})

// Session configuration options
const sessionOptions = {
    store, // Uses MongoDB Atlas for session storage instead of the default in-memory store.
    secret: process.env.secret, // A secret key used to sign the session ID, preventing tampering.
    resave: false, // Ensures the session is not saved back to the store if it wasn't modified.
    saveUninitialized: true, // Forces uninitialized sessions (new sessions with no data) to be saved.
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Sets expiration for the session cookie (1 week from now).
        maxAge: 7 * 24 * 60 * 60 * 1000, // Specifies the maximum age for the session cookie (1 week).
        httpOnly: true, // Ensures the cookie is accessible only via HTTP (prevents JavaScript access for security).
    }
}

// Middleware should be set up before defining routes
app.use(session(sessionOptions)); // Applies session middleware using the configured session options.
app.use(flash()); // Enables flash messages, allowing temporary messages to be stored in the session.


// Passport.js setup for authentication
// After session
app.use(passport.initialize()); // Initialize Passport.js
app.use(passport.session()); // Use session-based authentication

// Configure Passport.js to use the local strategy for user authentication
passport.use(new LocalStrategy(User.authenticate()));

// Serialize(Store) user information into the session(After login)
passport.serializeUser(User.serializeUser());

// Deserialize(Remove) user information from the session(After logout)
passport.deserializeUser(User.deserializeUser());


// Middleware to set up res.locals variables that are accessible in EJS templates
app.use((req, res, next) => {

    // 1. Set res.locals.success to any "success" flash messages
    // - `req.flash("success")` retrieves any flash messages with the key "success".
    // - Flash messages are temporary messages (e.g., for notifications) stored in the session.
    // - Once retrieved, they are stored in `res.locals.success` so they can be used in the EJS template.
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    // 3. Set res.locals.currUser to the currently authenticated user (if any)
    // - `req.user` is provided by Passport.js if a user is logged in and authenticated.
    // - This allows you to access the logged-in user's information (e.g., username, email) in your EJS templates.
    // - If no user is logged in, `req.user` will be `undefined` or `null`.
    res.locals.currUser = req.user;

    // 4. Call next() to pass control to the next middleware function or route handler
    // - This ensures that the request continues through the rest of the middleware stack.
    next();
});



// Routings
// Define application routes
app.use("/", userRouter); // User-related routes (e.g., login, signup)
app.use("/listings", listingRouter); // Routes for managing listings
app.use("/listings/:id/reviews", reviewRouter); // Routes for managing reviews on listings


// Catch-all route for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!")); // Pass 404 error to the error-handling middleware
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err; // Default to 500 if no status code is provided
    console.log(err);
    res.status(statusCode).render("error.ejs", { err }); // Render the error page with error details
});

//Port
app.listen(8080, ()=>{
    console.log("server is listening to port");
});