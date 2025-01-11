const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");// to access method override which enables
// html forms to use method other than post or get

const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username: "Devang",
        content: "Hii, I am Devang Vala!",
    },
    {
        id: uuidv4(),
        username: "Raj",
        content: "I love coding!",
    },
    {
        id: uuidv4(),
        username: "Rahul",
        content: "Naam to suna hi hoga!",
    },
];

app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
})

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

//new post route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs", { posts });
})

//on submit new post route
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts');
});

//see in detail route
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs", { post });
})

//edit route
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", { post });
})

//destroy route
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);//so that store all the other posts into posts array
    res.redirect("/posts");
})