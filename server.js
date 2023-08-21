const express = require('express')
const app = express();
const fruits = require('./models/fruit.js');
const vegetables = require('./models/Vegetable.js');

const port = 3007;

//Setting up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use((req, res, next) =>{
    console.log('I run for all routes')
     next();
})


app.use(express.urlencoded({extended:false}))


//ROUTES
//index
app.get('/fruits', (req, res)=>{
    res.render("fruits/Index", {
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


app.listen(port, () => {
    console.log('listening')
})