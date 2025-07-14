import React from "react";
import Search from "../components/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import useMobile from "../hooks/useMobile";

export default function Header() {
  const isMobile = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-28 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-center w-full ">
          {/* {css a revoir carement} */}
          <div className="h-full flex flex-row px-10 w-full items-center justify-between">
            {/* {logo} */}

            <span className="text-2xl">Excell Is Hub</span>
            {/* {search} */}
            <div className="hidden lg:block">
              <Search />
            </div>
            {/* {login and my card} */}
            <div>
              {/* {this user icon display only is mobile version} */}
              <button className="lg:hidden my-2 text-gray-600 mr-2">
                <FaRegCircleUser size={26} />
              </button>
              {/* {this user icon display only is desktop version} */}
              <div className="hidden lg:flex items-center gap-10">
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 cursor-pointer"
                >
                  {" "}
                  Login
                </button>
                <button className="flex items-center gap-2 bg-green-700 px-3 hover:bg-green-800 cursor-pointer py-3 rounded text-white">
                  <div className="animate-bounce">
                    {/* {add to card icon} */}
                    <BsCart4 size={26} />
                  </div>
                  <div className="font-semibold">
                    <p>My card</p>
                    {/* <p>1 item</p>
                    <p>total price</p> */}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
}
