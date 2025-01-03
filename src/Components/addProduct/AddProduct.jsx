import { useState } from "react";
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import NavigationBar from "../navigationBar/NavigationBar";
function AddProduct() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [productImage, setProductImage] = useState(null);
    const [isVisible, setVisible] = useState(false);
    const toggleNav = () => {
        setVisible(!isVisible);
    };

    function validateDetails() {
        return (productImage != "" && productDescription != "" && productPrice != "" && productImage != null);
    }

    function handleAddProduct() {
        if (validateDetails()) {
            const formData = new FormData();


            formData.append("productName", productName);
            formData.append("productDescription", productDescription);
            formData.append("productPrice", productPrice);
            formData.append("image", productImage);


            axios.post("http://localhost:4000/user/uploadFile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {
                    console.log("Upload successful:", response.data);
                })
                .catch(error => {
                    console.error("Upload failed:", error);
                });
        }
    }

    return (<>
        <div className=" w-screen h-screen flex flex-row space-x-2">
            <div className={`sm:block ${isVisible ? 'block' : 'hidden'}`}>
                <NavigationBar />
            </div>

            <div className='flex flex-col flex-1 '>
                <div className="sm:hidden p-3 m-2 h-11 rounded-sm bg-purple-500 w-14 flex justify-center" onClick={toggleNav} >
                    <MenuIcon style={{ color: 'white' }}></MenuIcon>
                </div>
                <p className="font-bold text-black text-lg p-3 m-2">Add New Product</p>
                <p className=" text-black text-lg p-3 mt-3">Enter the Product Name</p>
                <input type="text" placeholder="Product Name" className="mt-3 ms-2 bg-slate-100 p-3 rounded-md focus:outline-none w-2/5" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                <p className=" text-black text-lg p-3 mt-3">Enter the Product Description</p>
                <input type="text" placeholder="Eg. Explain its Features" className="mt-3 ms-2 bg-slate-100 p-3 rounded-md focus:outline-none w-2/5" value={productDescription} onChange={(e) => { setProductDescription(e.target.value) }} />
                <p className=" text-black text-lg p-3 mt-3">Enter the Product Price</p>
                <input type="text" placeholder="₹ 0.00" className="mt-3 ms-2 bg-slate-100 p-3 rounded-md focus:outline-none w-2/5" onChange={(e) => { setProductPrice(e.target.value) }} />
                <p className=" text-black text-lg p-3 mt-3">Select the Product Image</p>
                <input type="file" placeholder="Select File" className="mt-3 ms-2 bg-slate-100 p-3 rounded-md focus:outline-none w-2/6" onChange={(e) => { setProductImage(e.target.files[0]) }} />
                <button onClick={handleAddProduct} className='bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 text-white p-3 rounded-md w-24 mt-3 ms-2'>Add</button>
            </div>
        </div>
    </>)
}

export default AddProduct;