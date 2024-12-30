import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './Components/login/Login.jsx'
import SignUp from './Components/signUp/SignUp.jsx'
import Home from './Components/home/Home.jsx'
import AddProduct from './Components/addProduct/AddProduct.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/addProduct" element={<AddProduct></AddProduct>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
