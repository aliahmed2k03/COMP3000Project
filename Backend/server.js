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
app.delete("/deleteHouse", async (req, res) => {
    const User = require('./models/Users'); 
    const { username, address } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.houses = user.houses.filter(house => house.address !== address);
      await user.save();
      console.log("deleted succesfully")
      res.status(200).send("House deleted");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting house");
    }
  });
app.post('/addhouse',async (req,res)=>{
    const {username, house} = req.body;
    try{
        const user= await UserModel.findOne({username});
        if (!user) return res.status(404).json({error: "User not Found"});
        user.houses.push(house);
        await user.save();
        res.json({message:"house added succesfully", house})
    } catch (err){
        res.status(500).json({error:err.message});
    }    
});

app.get('/Houses/:username', async (req,res)=>{
    try {
        const user = await UserModel.findOne({username: req.params.username});
        if (!user) return res.status(404).json({error: "User not Found"});
        res.json(user.houses);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
app.post("/ViewingTime", async (req, res) => {
    const { username, address, viewingTime } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(404).send("User not found");
        const house = user.houses.find(h => h.address === address);
        if (!house) return res.status(404).send("House not found");
        house.viewingTime = viewingTime;
        await user.save();
        console.log("viewing time saved"+house.viewingTime)
        res.status(200).send("Viewing time updated: "+house.viewingTime);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving viewing time");
    }
});

app.post("/Consideration", async (req, res) => {
    const { username, address, consideration } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(404).send("User not found");
        const house = user.houses.find(h => h.address === address);
        if (!house) return res.status(404).send("House not found");
        house.consideration = consideration;
        await user.save();
        console.log("consideration updated "+house.consideration)
        res.status(200).send("Consideration updated: "+house.consideration);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving consideration");
    }
});
app.post("/clearDashboard", async (req, res) => {
    const { username } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) return res.status(404).send("User not found");
        user.houses = [];
        await user.save();
        console.log(`Cleared houses for ${username}`);
        res.status(200).send("All houses cleared");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error clearing houses");
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
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const addressSelectors = ['address._1olqsf98', 'address._1uw1x3v8', 'address._1kxlhi2a'];
        let address = null;
        for (const selector of addressSelectors) {
            address = await page.$eval(selector, el => el.textContent.trim()).catch(() => null);
            if (address) break;
        }
        if (!address) {
            console.warn("No address found with any selector.");
            address = "Address not available"; 
        }
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
        if(image.includes('.png')){
            imageUrl = image.substring(0, image.indexOf('.png') + 4);
        }else{
            imageUrl = image.substring(0, image.indexOf('.jpg') + 4);
        }

        await browser.close();
        console.log({ address, price , estate,beds,baths,imageUrl,url})
        res.json({ address, price , estate,beds,baths,imageUrl,url});
    }catch(error){
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Failed to scrape Zoopla" });
    }
}); 
    

app.listen(5000, ()=>{
    console.log('Server is running on 5000');
});