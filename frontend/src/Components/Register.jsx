import { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom"

function Register(){
    const [username,setUsername] = useState()   
    const [password,setPassword] = useState()
    const [confirmedpassword, setConfirmedPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!username  || !password || !confirmedpassword){
            toast.error("All fields are required!")
            return;
        }
        if(password.length <= 8 ){
            toast.error("Password must be above 8 characters")
            return;
        }
        if(password !== confirmedpassword){
            toast.error("Passwords aren't matching")
            return;
        }
        axios.post('http://localhost:5000/register',{username,password})
            .then(result => {
                console.log(result)
                if(result.data === "That user exists already"){
                    toast.warning("That username is taken")
                }else{
                    navigate("/login")
                    toast.success("you have registered your user")
                }
            })
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1 className="absolute top-30 text-2xl text-white font-bold">Vantage</h1>
            <form className="register-form">
                <input type="text" placeholder="Username" className="flex justify-center absolute top-50 w-53 h-10  p-3 mb-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-[#D9D9D9] bg-[#D9D9D9]" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="flex justify-center absolute top-64 w-53 h-10  p-3 mb-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-[#D9D9D9] bg-[#D9D9D9]" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" className="flex justify-center absolute top-78 w-53 h-10  p-3 mb-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-[#D9D9D9] bg-[#D9D9D9]" onChange={(e) => setConfirmedPassword(e.target.value)}/>
                <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
            </form>
            <p className="login-text">Already have an account?</p>
            <a href="/login" className="login-link">Login</a>
            <ToastContainer position="top-right" autoClose={2000} />
    </div>
    );
};

export default Register;