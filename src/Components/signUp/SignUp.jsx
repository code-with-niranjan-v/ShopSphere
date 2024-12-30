import axios from "axios";
import { use } from "react";
import { useState } from "react";
import Notification from "../notification/Notification";
import { useNavigate } from "react-router-dom";
function SignUp() {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isNotValid, setIsNotValid] = useState(false);
    const [isNotified, setIsNotified] = useState(false)

    function checkData(data, setData) {
        let result = (data == "") ? true : false
        setData(result)
        return result;
    }

    function handleSignUp() {
        checkData(name, setNameError)
        checkData(email, setEmailError)
        checkData(address, setAddressError)
        checkData(password, setPasswordError)
        if (email != "" && name != "" && address != "" && password != "") {
            let userData = { name, email, address, password }
            axios.post("http://localhost:4000/user/registerUser", userData)
                .then((res) => {
                    console.log(res);
                    setIsNotified(true);
                    setTimeout(() => setIsNotified(false), 3000);
                })
                .catch((e) => { console.log(e) })
        }
    }

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col rounded-md bg-white p-3">
                    <p className="text-purple-500 text-center font-medium text-lg">Sign Up</p>
                    <input type="text" placeholder="Name" className="m-2 bg-slate-100 p-3 rounded-md focus:outline-none" value={name} onChange={(e) => { setName(e.target.value) }} />
                    {nameError && <p className="text-red-600 text-sm">Enter Your Name</p>}
                    <input type="text" placeholder="Email" className="m-2 bg-slate-100 p-3 rounded-md focus:outline-none" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    {emailError && <p className="text-red-600 text-sm">Enter Your Email</p>}
                    <input type="text" placeholder="Address" className="m-2 bg-slate-100 p-3 rounded-md focus:outline-none" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    {addressError && <p className="text-red-600 text-sm">Enter Your Address</p>}
                    <input type="text" placeholder="Password" className="m-2 bg-slate-100 p-3 rounded-md focus:outline-none" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {passwordError && <p className="text-red-600 text-sm">Enter Your Password</p>}
                    <button onClick={handleSignUp} className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-md m-2">Sign Up</button>
                    <div>
                        <p className="text-slate-400 text-center font-medium text-sm">Already have a account?</p>
                        <p className="text-purple-500 text-center font-medium text-sm" onClick={() => { navigate("/login") }}>Log in</p>
                    </div>
                </div>
                {isNotified && <div className="fixed top-0 left-0 right-0 m-5">
                    <Notification />
                </div>}
            </div>
        </>)
}

export default SignUp;