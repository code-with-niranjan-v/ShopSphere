import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
function NavigationBar() {
    const navigate = useNavigate();
    return (<>
        <div className="w-72  bg-gradient-to-b from-indigo-500 via-purple-500  to-pink-500 h-full">
            <div className="flex flex-row  items-center">
                <p className="text-lg text-white italic p-3 m-2">ShopSphere</p>
                <img src="./src/Components/home/cart.png" alt="cartIcon" className="w-12 h-12" />
            </div>

            <div className="flex flex-row  items-center p-3 m-2 space-x-4">
                <HomeIcon style={{ color: 'white' }}></HomeIcon>
                <p onClick={() => { navigate("/home") }} className="text-lg text-white  ">Home</p>
            </div>

            <div className="flex flex-row  items-center p-3 m-2 space-x-4">
                <ShoppingCartIcon style={{ color: 'white' }}></ShoppingCartIcon>
                <p className="text-lg text-white  ">Buy</p>
            </div>

            <div className="flex flex-row  items-center p-3 m-2 space-x-4">
                <AddShoppingCartIcon style={{ color: 'white' }}></AddShoppingCartIcon>
                <p onClick={() => { navigate("/addproduct") }} className="text-lg text-white  ">Add Product</p>
            </div>

            <div className="flex flex-row  items-center p-3 m-2 space-x-4">
                <SettingsIcon style={{ color: 'white' }}></SettingsIcon>
                <p className="text-lg text-white  ">Settings</p>
            </div>

        </div>
    </>)
}

export default NavigationBar;