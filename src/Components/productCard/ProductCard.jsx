function ProductCard({ product }) {
    console.log(product.productImageName)
    return (
        <div className="border rounded shadow p-4 ">
            <img
                src={`http://localhost:4000/uploads/${product.productImageName}`}
                alt={product.productName}
                className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{product.productName}</h2>
            <p className="truncate text-sm text-gray-600 mt-1">{product.productDescription}</p>
            <p className=" truncate text-lg font-bold text-purple-600 mt-2">₹{product.productPrice}</p>
        </div>
    );
}

export default ProductCard;