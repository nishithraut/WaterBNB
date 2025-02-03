const User = require("../models/user.js");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res)=>{
    //try catch is used bcos we want to be on same page and flash error msg
    try {
        let {username , email , password} = req.body;
        let newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);  //newUser.save()-like

        //Automatic login
        req.login(registeredUser, (err)=>{
             if (err){
                return next(err);
             }
            req.flash("success", "Welocme to WaterBNB");
            res.redirect("/listings");
        }); 
        
    } catch (error) {
        req.flash("error", error.message); 
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}
 
module.exports.login = async (req,res)=>{
    req.flash("success", "Welcome Back to WaterBNB");
    console.log(res.locals.redirectUrl);
    res.redirect(res.locals.redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err) => {
        if(err){
            return next();
        }
        req.flash("success","You are Logged out!");
        res.redirect("/listings");
    });
}