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

    function handleLogin() {
        navigate("/login")
    }
    return (
    <div className="bg-[#01A78B] w-screen h-scree flex justify-center">
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl text-white font-bold mb-4">Vantage</h1>
            <form className="register-form w-full flex flex-col gap-4">
                <input type="text" placeholder="Username" className="w-full p-3 focus:outline-none rounded-md bg-[#D9D9D9]" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-3 focus:outline-none rounded-md bg-[#D9D9D9]" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" className="w-full p-3 focus:outline-none rounded-md bg-[#D9D9D9]" onChange={(e) => setConfirmedPassword(e.target.value)}/>
                <button type="submit" className="w-30 p-3 !bg-[#31FF6F] text-white rounded-md hover:!bg-[#13f256] transition self-center" onClick={handleSubmit}>Submit</button>
            </form>
            <p className="text-gray-600 mt-4">Already have an account?</p>
            <p className="text-blue-600 hover:underline" onClick={handleLogin}>Login</p>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    </div>
    );
};

export default Register;