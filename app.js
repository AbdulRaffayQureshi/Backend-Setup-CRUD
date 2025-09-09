if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //👈 .strategy should be check at the end of the project
const User = require("./models/user.js");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const progressRouter = require("./routes/user.js");

// MongoDB URL

const dbURL = process.env.ATLASDB_URL;

// view engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// Session store in MongoDB
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, // 24 hours
});

store.on("error", (err) => {
  console.log("❌ Session store error:", err);
});



// session + flash setup
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// locals (for flash + user info)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
app.use((req, res, next) => {
  console.log("🔑 Current Session:", req.session);
  console.log("🧑‍💼 Current User:", req.user);
  next();
});

// // routes
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// error handler (only one response allowed)
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error.ejs", { message: err.message });
});

// connect DB and start server
async function main() {
  try {
    await mongoose.connect(dbURL);
    console.log("✅ Connected to DB");

    app.listen(8080, () => {
      console.log("🚀 Server is listening on port 8080");
    });
  } catch (err) {
    console.log("❌ DB Connection Error:", err);
  }
}

main();
