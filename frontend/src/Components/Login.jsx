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
                navigate("/dashboard")
            }else{
                toast.error("password/ username is incorrect")
            }
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1 className="title">Vantage</h1>
            <form className="login-form">
            <input type="text" placeholder="Username" className="input-box" onChange={(e)=> setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" className="input-box" onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
            </form>
            <p className="register-text">Don't have an account?</p>
            <a href="/" className="register-link">Register</a>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default Login;