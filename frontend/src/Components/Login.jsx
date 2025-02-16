import {useState} from "react";
import "./login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Login(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login',{username,password})
        .then(result => {
            console.log(result)
            if(result.data === "Successfully logged in"){
                localStorage.setItem("username", username);
                navigate("/dashboard")
            }else{
                toast.error("password / username is incorrect")
            }
        })
        .catch(err=>console.log(err))
    }
    function handleRegister(){
        navigate("/")
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl text-white font-bold mb-4">Vantage</h1>
            <form className="login-form w-full flex flex-col gap-4">
                <input type="text" placeholder="Username" className="w-full p-3 focus:outline-none rounded-md bg-[#D9D9D9]" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-3 focus:outline-none rounded-md bg-[#D9D9D9]" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-30 p-3 !bg-[#31FF6F] text-white rounded-md hover:!bg-[#13f256] transition self-center" onClick={handleSubmit}>Submit</button>
            </form>
            <p className="text-gray-600 mt-4">Don't have an account?</p>
            <p className="text-blue-600 hover:underline" onClick={handleRegister}>Register</p>
            <ToastContainer position="top-right" autoClose={2000} />
    </div>
    )
       
}

export default Login;