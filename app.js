import express, { urlencoded } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import blogRouter from './src/routes/blogRouters'

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
app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

app.use(blogRouter)
app.use(express.static('public'));
