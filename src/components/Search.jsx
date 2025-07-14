// import { Divide } from "lucide-react";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { TypeAnimation } from "react-type-animation";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const isSearchPage = location.pathname === "/search";
    setIsSearchPage(isSearchPage);
  }, [location]);

  console.log(isSearchPage);

  const redictToSearchPage = () => {
    navigate("/search");
  };

  return (
    // <div className="flex justify-center">
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden  flex items-center">
      <div className="flex w-full justify-center items-center h-full p-3 group focus-within:border-amber-400">
        <div>
          {" "}
          {isMobile && isSearchPage ? (
            <Link
              to={"/"}
              className="m-1 bg-white rounded-2xl group-focus-within:text-red-800 text-gray-500 "
            >
              <FaArrowCircleLeft size={20} />
            </Link>
          ) : (
            <button
              onClick={redictToSearchPage}
              className="p-2 group-focus-within:text-gray-500 text-gray-500"
            >
              <IoSearch size={22} />
            </button>
          )}
        </div>
        <div className="flex w-full items-center justify-start px-8">
          {isSearchPage ? (
            //ne pas dans la page de recherche
            <div className="flex justify-center items-center w-full h-full">
              <input
                type="text"
                placeholder="searching.."
                className="flex w-full h-full outline-0 items-center justify-center"
              />
            </div>
          ) : (
            <span
              onClick={redictToSearchPage}
              className="flex ml-4 text-sm sm:text-base text-gray-700 whitespace-nowrap overflow-hidden"
            >
              <TypeAnimation
                sequence={[
                  "Search for phone cases",
                  2000,
                  "Search for phone cables",
                  2000,
                  "Search for computers",
                  2000,
                  "Search for computer accessories",
                  2000,
                ]}
                speed={10}
                repeat={Infinity}
                wrapper="span"
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
