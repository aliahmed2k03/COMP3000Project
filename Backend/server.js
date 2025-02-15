const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users")
const app = express();
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

app.listen(5000, ()=>{
    console.log('Server is running on 5000');
});