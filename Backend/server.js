const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const puppeteer = require("puppeteer");
const app = express();
const axios= require("axios")
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://aliahmed125755:aliloo1234@vantage.vjv2g.mongodb.net/Users")


app.post('/login',(req,res) =>{
    const {username,password} = req.body;
    UserModel.findOne({username: username})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Successfully logged in")
            }else{
                res.json("username or password is incorrect")
            }
        } else{
            res.json("no such record exists")
        }
    })
})
app.post('/register',async (req,res) => {
    const {username,password} = req.body;
    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.json("That user exists already");  
        }
        const newUser = await UserModel.create({ username, password });
        return res.json(newUser); 

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

async function scrapeZoopla() {
    const url = "https://www.zoopla.co.uk/for-sale/details/69524047/?search_identifier=d596ed4ede7f8b13259e087cd518478b33e4ac98156a80ea577e24746240c890"
    try{
        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });
        const address = await page.$eval('address._1olqsf98', el => el.textContent.trim());
        const price = await page.$eval('p._194zg6t3.r4q9to1', el => el.textContent.trim());
        console.log({ address, price });
        await browser.close();
    }catch(error){
        console.log("Error",error.message);
    }
    
}

app.listen(5000, ()=>{
    scrapeZoopla();
    console.log('Server is running on 5000');
});