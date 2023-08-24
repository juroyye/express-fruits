require('dotenv').config()
const express = require('express')
const app = express();
const Fruit = require('./models/fruit.js')
const vegetables = require('./models/Vegetable.js');
const mongoose = require('mongoose');
const port = 3007;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once("open", () => {
    console.log("connected to MongoDB")
});


//Setting up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use((req, res, next) =>{
    console.log('I run for all routes')
     next();
})

// Middleware
app.use((req, res, next) => {
    console.log('I run for all routes!');
    next();
})


app.use(express.urlencoded({extended:false}))


//ROUTES
//index
app.get('/fruits', async function(req, res) {
    const foundFruits = await Fruit.find({})
    res.render("fruits/index", {
        fruits: fruits
    })
});

// New
app.get('/fruits/new', (req, res) =>{
    res.render('fruits/New')
})

// New
app.get('/veggies/new', (req, res) =>{
    res.render('veggies/New')
})



//show
app.get('/fruits/:indexOfFruitsArray', (req, res)=>{
    res.render('fruits/Show', {
        fruit: fruits[req.params.indexOfFruitsArray]
    })
})

// CREATE = POST

app.post("/fruits", async(req, res)=> {
    console.log(req.body)
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    const createdFruit = await Fruit.create(req.body)
    console.log(createdFruit)
    res.redirect('/fruits')
})


app.get("/fruits/:id", async(req, res) =>{
    const oneFruit = await fruit.findById(req.params.id)
    res.render('fruits/Show', {
        fruit: oneFruit
    })
});


app.get('/vegetable', (req, res)=>{
    res.render("veggies/Index", {
        vegetables: vegetables
    })
});


//show
app.get('/vegetable/:indexOfVegetablesArray', (req, res)=>{
    res.render('veggies/Show', {
        vegetables: vegetables[req.params.indexOfVegetablesArray]
    })
})

// CREATE = POST

app.post("/vegetables", async(req, res)=> {
    console.log(req.body)
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    const createdVegetable = await vegetables.create(req.body)
    console.log(createdVegetable)
    res.redirect('/vegetables')
})


app.listen(port, () => {
    console.log('listening')
})