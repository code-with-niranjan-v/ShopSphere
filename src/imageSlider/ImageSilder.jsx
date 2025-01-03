import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { jsx } from "react/jsx-runtime";

function ImageSlider() {
    const [urls, setUrls] = useState([]);

    // Fetch URLs from localStorage on component mount
    useEffect(() => {
        const storedUrls = JSON.parse(localStorage.getItem("urls") || "[]");
        setUrls(storedUrls);
    }, []);

    return (
        <div className="h-96">
            <Carousel className="" slideInterval={3000}>
                {urls.length > 0 ? (
                    urls.map((url, index) => (
                        <div key={index} className="flex items-center justify-center h-full">
                            <img
                                src={url}
                                alt={`Slide ${index + 1}`}
                                className="object-contain h-full w-full"
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No images available. Please add URLs to local storage with the key "urls".
                    </div>
                )}
            </Carousel>
        </div>
    );
}

export default ImageSlider;
