import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Image from "./Image";
import userOwner from "../../assets/images/user/owner.jpg";
import { ChevronDownIcon, LogoutIcon } from "../../assets/svg/SvgIcons";
import { userMenuItems } from "../../constants/MenuItems";
import LogoutModal from "../../models/Logout";
import { useSignoutMutation } from "../../redux/services/authApi";
import { clearCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const [signout, { isLoading }] = useSignoutMutation();

  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state?.auth?.user);
  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  //logout
  const handleLogout = async () => {
    try {
      await signout().unwrap();
      await dispatch(clearCredentials());
      setOpenLogout(false);
      navigate("/signin");
      toast.success("Logged out successfully");
    } catch (err) {
      console.log(err);
      await dispatch(clearCredentials());
      navigate("/signin");
    }
  };
  return (
    <>
      <div className="relative" ref={ref}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
          className="flex items-center text-gray-700 dark:text-gray-400"
        >
          <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
            <Image src={userOwner} alt="User" className="object-cover" />
          </span>

          <span className="block mr-1 font-medium text-theme-sm">
            {/* {user?.name} */}
          </span>

          <ChevronDownIcon
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>

        {open && (
          <div className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
            <div>
              <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                {/* {user?.name} */}
              </span>
              <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                {/* {user?.email} */}
              </span>
            </div>

            <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
              {userMenuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <item.icon className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300" />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sign out */}
            <Button
              className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 "
              onClick={() => setOpenLogout(true)}
            >
              <LogoutIcon className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 fill-current" />
              Sign out
            </Button>
          </div>
        )}
      </div>
      <LogoutModal
        isOpen={openLogout}
        close={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
