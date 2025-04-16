// Import necessary dependencies from React and external libraries
import React from "react"; // React is imported for JSX syntax and component creation
import { ArrowLeft, EllipsisVertical } from "lucide-react"; // Importing specific icons from the lucide-react library
import { Link, useLocation } from "react-router-dom"; // Importing Link for navigation and useLocation to access current route

// Define the Navbar component
function Navbar() {
  // useLocation hook is used to get the current pathname of the app
  const location = useLocation();
  
  // Check if the current path is the homepage ("/")
  const isHome = location.pathname === "/";

  return (
    // The header section that contains the navigation bar
    <header>
      {/* Navbar container with dynamic classes for styling */}
      <div className="w-full h-16 backdrop-blur-3xl shadow-[0px_2px_36px_0px_rgba(0,0,0,0.08)] flex justify-between items-center px-5 md:px-14 lg:px-20">
        
        {/* Conditional rendering based on the current page */}
        {/* If the user is on the homepage, display an empty space (for alignment purposes) */}
        {isHome ? (
          <div className="w-5 h-5 lg:w-6 lg:h-6"></div>
        ) : (
          // If the user is not on the homepage, display a "Back" button using an ArrowLeft icon
          <Link to='/'>
            {/* ArrowLeft icon that serves as a back button */}
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900 cursor-pointer" />
          </Link>
        )}

        {/* The main title of the navbar */}
        <h1 className="font-medium lg:text-lg text-neutral-700">
          Sentence Construction
        </h1>

        {/* An ellipsis icon (three dots) typically used for more options */}
        <EllipsisVertical className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900 cursor-pointer" />
      </div>
    </header>
  );
}

// Export the Navbar component to be used in other parts of the application
export default Navbar;
