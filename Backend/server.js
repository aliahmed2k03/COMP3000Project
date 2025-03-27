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

app.post('/scrapeZoopla',async (req,res)=>{
    const {url} = req.body;
    console.log("reached api")
    if(!url){
        return res.status(400).json({error: "Invalid URL"})
    }
    try{
        console.log("grabbing house address and price...")
        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/110.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });
        const address = await page.$eval('address._1olqsf98', el => el.textContent.trim());
        const price = await page.$eval('p._194zg6t3.r4q9to1', el => el.textContent.trim());
        const estate = await page.$eval('p._194zg6t7._133vwz72', el => el.textContent.trim());
        const beds = await page.$eval("p._194zg6t8._1wmbmfq3", el => el.textContent.trim());
        const baths = await page.$$eval("p._194zg6t8._1wmbmfq3",elements =>{
            const bathtext = elements.find(el => el.textContent.includes('bath'))
            return bathtext ? bathtext.textContent.trim(): null;
        });
        const image = await page.evaluate(()=>{
            const gallerySlide = document.querySelector('li[data-key="gallery-slide-0"] source');
            return gallerySlide ? gallerySlide.getAttribute('srcset') : null;
        });
        imageUrl = image.substring(0, image.indexOf('.jpg') + 4);
        await browser.close();
        console.log({ address, price , estate,beds,baths,imageUrl})
        res.json({ address, price , estate,beds,baths,imageUrl});
    }catch(error){
        console.log("grabbing house address and price...")
        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/110.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2' });
        const address = await page.$eval('address._1uw1x3v8', el => el.textContent.trim());
        const price = await page.$eval('p._194zg6t3.r4q9to1', el => el.textContent.trim());
        const estate = await page.$eval('p._194zg6t7._133vwz72', el => el.textContent.trim());
        const beds = await page.$eval("p._194zg6t8._1wmbmfq3", el => el.textContent.trim());
        const baths = await page.$$eval("p._194zg6t8._1wmbmfq3",elements =>{
            const bathtext = elements.find(el => el.textContent.includes('bath'))
            return bathtext ? bathtext.textContent.trim(): null;
        });
        const image = await page.evaluate(()=>{
            const gallerySlide = document.querySelector('li[data-key="gallery-slide-0"] source');
            return gallerySlide ? gallerySlide.getAttribute('srcset') : null;
        });
        imageUrl = image.substring(0, image.indexOf('.jpg') + 4);
        await browser.close();
        console.log({ address, price , estate,beds,baths,imageUrl})
        res.json({ address, price , estate,beds,baths,imageUrl});
    }
}); 
    

app.listen(5000, ()=>{
    console.log('Server is running on 5000');
});