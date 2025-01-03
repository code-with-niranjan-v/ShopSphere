import { useState } from "react";
import ImageSlider from "../../imageSlider/ImageSilder";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
function Product() {
    const navigate = useNavigate()
    const location = useLocation();
    const { productName, productDescription, productPrice, review, id } = location.state || {
        productName: "Vivobook Pro 15 OLED (K6502)",
        productDescription: "Lighting up your creativity is easier than ever with the powerful Vivobook Pro 15 OLED. Equipped with the 13th Gen Intel® Core™ H-series CPU, a dual-fan, triple-vented cooling system and Up to NVIDIA® GeForce RTX™ 4050 Laptop GPU2, it’s designed to deliver maximum performance for everything creative, whether you’re an artist, a vlogger, a video creator, a musician, or just someone who likes to have fun. For maximum gaming power we’ve included a MUX switch that unleashes the full power of the GPU. Any kind of visual creation will look its best on the fantastic up to 2.8K OLED display, with its super-smooth 120 Hz refresh rate and ultra-accurate vivid colors, and your ears will really appreciate the powerful Dolby Atmos® sound system with its multi-dimensional audio. Get creative, get Vivobook Pro 15 OLED!",
        productPrice: "150670",
        review: 1,
        id: ""
    }
    const [searchQuery, setSearchQuery] = useState("")

    function handleSearch() {

    }

    function handleAddToCart() {
        let uid = sessionStorage.getItem("uid");
        axios.post("http://localhost:4000/user/getcart", { uid: uid }).then((res) => {
            let products = res.data.data?.productIds || [];
            console.log("product " + res.data.data.productIds)
            if (!Array.isArray(products)) {
                products = [];
            }


            if (!products.includes(id)) {
                products.push(id);
            }
            let cartData = {
                uid: uid,
                productIds: products
            }
            axios.post("http://localhost:4000/user/addcart", cartData)
        })




    }
    const [urls, setUrls] = useState([]);
    function handleViewCart() {
        storeCart()

        navigate("/viewCart")
    }

    function storeCart() {
        let uid = sessionStorage.getItem("uid");
        axios.post("http://localhost:4000/user/getcart", { uid: uid }).then((req) => {
            sessionStorage.setItem("cart", JSON.stringify(req.data.data))
        })
    }
    useEffect(() => {
        const storedUrls = JSON.parse(localStorage.getItem("urls") || "[]");
        setUrls(storedUrls);
    }, []);


    return (<>
        <div className=" w-screen h-screen flex flex-col">
            <div className='flex flex-row justify-center items-center  w-screen m-2'>
                <input type="text" className='p-3 bg-slate-200 m-2 w-2/4 focus:outline-none rounded-md' placeholder='Search' value={searchQuery} onChange={(e) => { setSearch(e.target.value); reload(e.target.value) }} />
                <button onClick={handleSearch} className='bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 text-white p-3 rounded-md'>Search</button>
                <div className="">
                    <ShoppingCartIcon onClick={() => { handleViewCart() }} className="text-purple-500 m-6" fontSize="large" />
                </div>
            </div>
            <div className='flex flex-row m-2 p-2'>
                <div className="flex-1 m-2 p-2">
                    {/* <img src="https://m.media-amazon.com/images/I/61fsBFww9DL._SX679_.jpg" alt="" /> */}
                    <ImageSlider />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="">
                        <p className="font-bold text-[20px] w-full">{productName}</p>
                    </div>
                    <div className="mt-5">
                        <p className=" text-[15px] w-full">{productDescription}</p>
                    </div>
                    <div className="mt-5">

                        {/* <div class="flex flex-row-reverse justify-end items-center">
                            <input id="hs-ratings-readonly-1" type="radio" class="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="1" />
                            <label for="hs-ratings-readonly-1" class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none">
                                <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                </svg>
                            </label>
                            <input id="hs-ratings-readonly-2" type="radio" class="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="2" />
                            <label for="hs-ratings-readonly-2" class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none">
                                <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                </svg>
                            </label>
                            <input id="hs-ratings-readonly-3" type="radio" class="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="3" />
                            <label for="hs-ratings-readonly-3" class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none">
                                <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                </svg>
                            </label>
                            <input id="hs-ratings-readonly-4" type="radio" class="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="4" />
                            <label for="hs-ratings-readonly-4" class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none">
                                <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                </svg>
                            </label>
                            <input id="hs-ratings-readonly-5" type="radio" class="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="5" />
                            <label for="hs-ratings-readonly-5" class="peer-checked:text-yellow-400 text-gray-300 pointer-events-none">
                                <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                </svg>
                            </label>
                        </div> */}
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill={
                                        star <= review
                                            ? "#FFC300"
                                            : "gray"
                                    }
                                    viewBox="0 0 16 16"
                                    className="shrink-0 size-5 mx-1"
                                >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                </svg>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-purple-500 font-bold text-[20px] w-full">₹{productPrice}</p>
                    </div>
                    <div className="mt-5  flex flex-row">
                        <button className='bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 text-white p-3 rounded-md w-2/5 m-2'>Buy Now</button>
                        <button onClick={() => { handleAddToCart() }} className='bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 text-white p-3 rounded-md w-2/5 m-2'>Add to Cart</button>
                    </div>

                </div>
            </div>
        </div>
    </>)


}

export default Product;