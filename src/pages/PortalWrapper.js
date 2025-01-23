import React, { useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavRoutes from "../Navroutes";

const PortalWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") !== "dharmanaprodhan" && window.location.replace("/login");
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <section className="w-screen lg:h-screen flex font-poppins">
      <div className={`${location.pathname === "/" ? "w-full" : "hidden lg:block"} lg:w-1/3 overflow-y-scroll bg-amber-100 px-[calc(100vw/12)] lg:px-[calc(100vw/24)] py-8 shadow-xl relative z-10`}>
        <div className="flex justify-between items-center">
          <div
            className="w-24 lg:w-36 h-24 lg:h-36 aspect-square"
            style={{
              background: "url(/assets/new_2024.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="w-[40%] text-right">
            <h1 className="text-2xl lg:text-3xl font-semibold text-amber-500">
              Hostel Dashboard
            </h1>
            <button
              className="pt-2 text-lg lg:text-xl font-semibold text-gray-600 flex flex-row items-center gap-x-2 justify-end w-full"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <BiLogOutCircle /> Logout
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-12 mb-12 lg:mb-0 justify-center">
          {NavRoutes.map((nav) => (
            <NavItem title={nav.title} icon={nav.icon} href={nav.href} />
          ))}
        </div>
      </div>
      <main className={`${location.pathname === "/" ? "hidden lg:block" : "w-full"} lg:w-2/3 bg-gray-100 h-screen`}>
        <Outlet />
      </main>
    </section>
  );
};

const NavItem = ({ title, href, icon }) => {
  return (
    <Link
      to={href}
      className="shadow-xl aspect-video h-32 rounded-xl border-[4px] hover:bg-amber-500 hover:bg-opacity-10  border-amber-400 group "
    >
      <div className="w-full h-full relative p-4 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
        <h1 className="text-xl [line-height:1.75rem] text-amber-600 font-semibold w-[60%] ">
          {title}
        </h1>
        {React.cloneElement(icon, {
          className:
            "text-8xl transition-all group-hover:-translate-y-[10%] absolute -bottom-4 right-4 text-amber-400 opacity-40",
        })}
      </div>
    </Link>
  );
};

export default PortalWrapper;
