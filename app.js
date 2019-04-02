const express = require ("express")
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const clucksRouter = require("./routes/clucks");
const app = express();

app.set("view engine", "ejs")
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//STATIC ASSETS
console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")));

// CUSTOM MIDDLEWARE
app.use((request, response, next) => {
    console.log("Cookies:", request.cookies);
    response.locals.username = "";
    const username = request.cookies.username;
    if (username) {
        response.locals.username = username;
    }
    next();
});  

app.get("/", (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.render('signIn');
    }else{
        res.redirect('/welcome')
    }
});

const ONE_DAY = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

app.get('/welcome', (req, res) => {
    res.render('welcome');
})

app.post('/sign-in', (req, res) => {
    const { username } = req.body
    res.cookie('username', username, { expires: ONE_DAY })
    res.redirect('/welcome')
})
app.get('/sign-in', (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.render('signIn');
    }else{
        res.redirect('/welcome')
    }
})
app.post("/sign-out", (req, res) => {
    res.clearCookie('username');
    // console.log(res)
    res.redirect("/sign-in");
})

app.use("/clucks", clucksRouter);


const PORT = 4000;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});

  
