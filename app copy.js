import express, { urlencoded } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Blog from './src/models/blog'

const app = express();
const dbURL = "mongodb+srv://manasi1234:manasi1234@devconnector.0augo.mongodb.net/Note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set("views", "./src/view");
app.set("view engine", "ejs");
app.use(morgan('tiny'));

// This urlencoded using for print the code
app.use(express.urlencoded({ extended: true }))


// const blogs = [
//     { title: "Blog 1", snipped: 'Lorem ipsum dolor, sit amet ' },
//     { title: "Blog 2", snipped: 'Lorem ipsum dolor, sit amet ' },
//     { title: "Blog 3", snipped: 'Lorem ipsum dolor, sit amet ' },
// ]
app.get('/', (req, res) => {
    // res.render('index', { title: 'Blog', blogs })
    res.redirect('/blogs')
});
app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blog" })
})
app.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "All Blogs", blogs: result })
        })
        .catch((err) => console.log(err))
})

// Form submit post method
app.post('/blogs', (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

// ID click to show details page
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => console.log(err))
})

// DELETE
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})


// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "new blog",
//         snipped: "about my job",
//         body: "test"
//     })
//     blog.save()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err))
// })
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => console.log(err))
// })
// app.get('/single-post', (req, res) => {
//     Blog.findById('5f6ef0ead27d320f90c1d291')
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err))
// })
// app.listen(3000, () =>
//     console.log('Example app listening on port 3000!'),
// );