import axios from "axios";
import { useState } from "react";
import { URL } from "../../../URL";
import { useNavigate } from "react-router-dom";
function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function isValid() {
        if (email == "") {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
        if (password == "") {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    async function onLogin() {
        isValid()

        if (!emailError && !passwordError) {
            try {
                let userData = { email, password }
                let token = await axios.post(URL + "/user/loginUser", userData)
                sessionStorage.setItem("token", token.data.token)
                sessionStorage.setItem("uid", token.data.uid)
                if (token.data.status == "Success") {
                    navigate("/home")
                }
            } catch (e) {
                console.log(e.message)
            }
        }
    }
    return (
        <>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col rounded-md bg-white p-3">
                    <p className="text-purple-500 text-center font-medium text-lg">Login</p>
                    <input type="text" placeholder="Email" className="m-2 bg-slate-100 p-3 rounded-md focus:outline-none" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    {emailError && <p className="text-red-600 text-sm">Enter Your Email</p>}
                    <input type="text" placeholder="Password" className="m-2 bg-slate-100 p-3 rounded-md focus:outline-none" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    {passwordError && <p className="text-red-600 text-sm">Enter Your Password</p>}
                    <button onClick={onLogin} className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-md m-2">Login</button>
                    <div>
                        <p className="text-slate-400 text-center font-medium text-sm">New Here?</p>
                        <p className="text-purple-500 text-center font-medium text-sm" onClick={() => { navigate("/signup") }}> Create an Account.</p>
                    </div>
                </div>
            </div >
        </>)
}

export default Login;