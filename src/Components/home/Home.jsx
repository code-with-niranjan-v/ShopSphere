import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard.jsx';
import MenuIcon from '@mui/icons-material/Menu';
import NavigationBar from '../navigationBar/NavigationBar.jsx';
function Home() {
    const [products, setProducts] = useState([]);
    const [isVisible, setVisible] = useState(false);
    const toggleNav = () => {
        setVisible(!isVisible);
    };

    const [searchQuery, setSearch] = useState("")

    async function handleSearch() {
        if (searchQuery != "") {
            try {
                let productName = { productName: { productName: searchQuery } }
                let data = await axios.post("http://localhost:4000/user/search", productName)
                console.log(data)
                let productArray = []
                for (const productData of data.data.products) {
                    productArray.push(productData)
                }
                setProducts(productArray)
            } catch (e) {
                console.error("Error fetching products:", e);
            }
        } else {
            loadProducts()
        }
    }

    async function loadProducts() {
        const response = await axios.post("http://localhost:4000/user/getAllProducts", { token: sessionStorage.getItem("token") });
        if (response.data.status === "Success") {
            const productArray = [];
            // Use a for loop to store each product in the array
            for (const product of response.data.products) {
                productArray.push(product);
            }
            setProducts(productArray);
            console.log(productArray)
        }
    }

    async function reload(value) {
        if (value == "") {
            loadProducts()
        }
        console.log("running")
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                loadProducts()
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);
    return (
        <>
            <div className=" w-screen h-screen flex flex-row">

                <div className={`fixed top-0 bottom-0 left-0  sm:block ${isVisible ? 'block' : 'hidden'}`}>
                    <NavigationBar />
                </div>
                {/* 'flex flex-col flex-1 ml-72' */}
                <div className='flex flex-col flex-1 lg:ml-72 md:ml-72 sm:flex-1 '>
                    <div className='flex flex-row justify-center items-center'>
                        <input type="text" className='p-3 bg-slate-200 m-2 w-2/4 focus:outline-none rounded-md' placeholder='Search' value={searchQuery} onChange={(e) => { setSearch(e.target.value); reload(e.target.value) }} />
                        <button onClick={handleSearch} className='bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 text-white p-3 rounded-md'>Search</button>
                        <div className="sm:hidden p-3 m-2 h-11 rounded-sm bg-purple-500" onClick={toggleNav} >
                            <MenuIcon style={{ color: 'white' }}></MenuIcon>
                        </div>
                    </div>
                    <p className='text-slate-900 text-lg font-bold m-2 p-3'>Trending Offers</p>
                    <div className='grid grid-cols-1   lg:grid-cols-3 lg:gap-2 lg:m-6'>

                        {products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Home;