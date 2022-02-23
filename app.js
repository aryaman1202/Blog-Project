const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

var posts = [];

const homeStartingContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias nesciunt dolor voluptate quasi consequatur doloremque optio expedita in unde porro sed animi nostrum, commodi repellat, laborum autem perspiciatis illo. Omnis vero qui delectus itaque. Eveniet, temporibus nostrum? Optio recusandae quam quos tenetur officia soluta et sit eaque iste consequatur nobis in hic vel mollitia iusto vitae, magni, culpa quisquam accusantium nisi quasi id ipsa reiciendis? Possimus eaque natus corporis. Distinctio assumenda aperiam reiciendis nobis dolorem.";
const aboutContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias nesciunt dolor voluptate quasi consequatur doloremque optio expedita in unde porro sed animi nostrum, commodi repellat, laborum autem perspiciatis illo. Omnis vero qui delectus itaque. Eveniet, temporibus nostrum? Optio recusandae quam quos tenetur officia soluta et sit eaque iste consequatur nobis in hic vel mollitia iusto vitae, magni, culpa quisquam accusantium nisi quasi id ipsa reiciendis? Possimus eaque natus corporis. Distinctio assumenda aperiam reiciendis nobis dolorem.";
const contactContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias nesciunt dolor voluptate quasi consequatur doloremque optio expedita in unde porro sed animi nostrum, commodi repellat, laborum autem perspiciatis illo. Omnis vero qui delectus itaque. Eveniet, temporibus nostrum? Optio recusandae quam quos tenetur officia soluta et sit eaque iste consequatur nobis in hic vel mollitia iusto vitae, magni, culpa quisquam accusantium nisi quasi id ipsa reiciendis? Possimus eaque natus corporis. Distinctio assumenda aperiam reiciendis nobis dolorem.";

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("Views/home", {starting_content: homeStartingContent,
    posts: posts});
})

app.get("/about",function(req,res){
    res.render("Views/about", {about_content: aboutContent});
})

app.get("/contact",function(req,res){
    res.render("Views/contact", {contact_content: contactContent});
})

app.get("/compose",function(req,res){
    res.render("Views/compose");
})

app.post("/compose", function(req,res){
    const post = {
        title: req.body.title,
        blog: req.body.blog
    };
    posts.push(post);

    res.redirect("/");
})

app.get("/posts/:postName", function(req,res){
    const requestTitle = _.lowerCase(req.params.postName);
    for(var i=0;i<posts.length;i++){
        const storedTitle = _.lowerCase(posts[i].title);
        if(storedTitle===requestTitle){
            res.render("post",{
                title: posts[i].title,
                blog : posts[i].blog,
            });
        }
    }
});

app.listen(3000, function(req,res){
    console.log("Server is running on localhost 3000");
})
