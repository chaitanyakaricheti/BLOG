const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));

let posts = []; // Temporary storage for blog posts

// Home route - Show all posts
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// New post form
app.get("/new", (req, res) => {
    res.render("new");
});

// Create new post
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now().toString(), title, content });
    res.redirect("/");
});

// Edit post form
app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render("edit", { post });
});

// Update post
app.put("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/");
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
