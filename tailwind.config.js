/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}", // Include Flowbite
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    flowbite.content() // Include Flowbite React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(), // Correct Flowbite plugin usage
  ],
};
