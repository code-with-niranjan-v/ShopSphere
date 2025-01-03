import React from 'react';
import 'flowbite/dist/flowbite.css'; // Import Flowbite CSS
import 'flowbite'; // Import Flowbite JavaScript
import { Carousel } from "flowbite-react";
import { useEffect } from 'react';
import { useState } from 'react';
function ImageSlider({ props }) {
    const defaultUrls = [
        "https://m.media-amazon.com/images/I/51QGlg5iRdL._AC_UY436_FMwebp_QL65_.jpg",
        "https://m.media-amazon.com/images/I/614TqOFmRtL._AC_UY436_FMwebp_QL65_.jpg",
        "https://m.media-amazon.com/images/I/611AaVzaCQL._AC_UY436_FMwebp_QL65_.jpg",
        "https://m.media-amazon.com/images/I/81+SKGgJ9yL._AC_UY436_FMwebp_QL65_.jpg",
        "https://m.media-amazon.com/images/I/81+SKGgJ9yL._AC_UY436_FMwebp_QL65_.jpg",
    ];

    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const storedUrls = JSON.parse(localStorage.getItem("urls") || "[]");
        setUrls(storedUrls);
    }, []);

    useEffect(() => {
        if (window.Flowbite && window.Flowbite.carousel) {
            const carouselElement = document.querySelector('#default-carousel');
            if (carouselElement) {
                const carousel = new window.Flowbite.Carousel(carouselElement);
                carousel.start();
            }
        } else {
            console.error('Flowbite carousel is not available. Ensure Flowbite is properly imported.');
        }
    }, []);
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {urls.map((url, index) => (
                    <div
                        key={index}
                        className={`hidden duration-700 ease-in-out`}
                        data-carousel-item
                    >
                        <img
                            src={url}
                            className="absolute block  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 m-4"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {urls.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className="w-3 h-3 rounded-full"
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>

            {/* Prev and Next Buttons */}
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                    <svg
                        className="w-4 h-4 text-white rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                    <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}

export default ImageSlider;
