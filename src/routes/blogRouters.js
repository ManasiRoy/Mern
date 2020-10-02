import express from "express"
import Blog from '../models/blog'

const router = express.Router()

router.get('/', (req, res) => {
    // res.render('index', { title: 'Blog', blogs })
    res.redirect('/blogs')
});
router.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create Blog" })
})
router.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "All Blogs", blogs: result })
        })
        .catch((err) => console.log(err))
})

// Form submit post method
router.post('/blogs', (req, res) => {
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
router.get("/blogs/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => console.log(err))
})

// DELETE
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})

export default router