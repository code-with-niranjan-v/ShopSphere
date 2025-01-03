import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../productCard/ProductCard"
import { useNavigate } from "react-router-dom"

function ViewCart() {
    const navigate = useNavigate();
    const cartdata = JSON.parse(sessionStorage.getItem("cart"))
    console.log(cartdata)
    const [total, setTotal] = useState(0)

    function gotoHome() {
        navigate("/home")
    }

    const [productsData, setProducts] = useState([])
    async function loadProducts() {
        const products = []
        let sum = 0;
        for (let i = 0; i < cartdata.productIds.length; i++) {
            let data = { productId: cartdata.productIds[i] }
            let responseData = await axios.post("http://localhost:4000/user/getProductById", data)
            console.log(responseData)
            products.push(responseData.data.data)
            sum += responseData.data.data.productPrice
        }
        setProducts(products)
        setTotal(sum)
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                loadProducts()

                console.log(productsData)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);

    return (<>
        <div className="flex flex-col ">

            <div className="flex flex-row justify-between">
                <p onClick={() => { gotoHome() }} className="text-purple-500 text-[20px] m-3 w-fit">Goto Home</p>
                <div className="w-full flex justify-center">
                    <p className="text-purple-500 font-bold text-[50px] m-3">Your Cart</p>
                </div>
            </div>

            <div className="w-full flex flex-row justify-around">
                <div className='grid grid-cols-2 gap-4 w-1/3'>

                    {productsData.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

                <div>
                    <p className="font-bold text-lg">Price: <span className="text-purple-500">₹{total}</span></p>
                    <p className="font-bold text-lg">GST: <span className="text-purple-500">15%</span></p>
                    <p className="font-bold text-lg">Total Price: <span className="text-purple-500">₹{total * 0.15 + total}</span></p>
                </div>
            </div>
        </div >
    </>)
}

export default ViewCart;