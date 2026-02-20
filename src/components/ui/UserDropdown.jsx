import { Menu } from "@headlessui/react";
import { UserIcon } from "lucide-react";
import { Activity, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../../models/Logout";
import { useSignoutMutation } from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { clearCredentials } from "../../redux/features/authSlice";
const UserDropdown = () => {
  const auth = useSelector((state) => state.auth?.user);
  const [openLogout, setOpenLogout] = useState(false);

  const [signout, { isLoading }] = useSignoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    }
  };
  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="w-9 h-9 rounded-full bg-[#4b2e2b] text-white flex items-center justify-center">
          <UserIcon />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border rounded-md shadow-lg focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Activity
                mode={
                  ["owner", "sub_admin", "admin"].includes(auth?.role)
                    ? "visible"
                    : "hidden"
                }
              >
                <Link
                  to="/admin"
                  className={`block px-4 py-2 text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </Activity>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <Link
                to="/"
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                My Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) =>
              !auth?.role ? (
                <Link
                  to="/signin"
                  className={`block px-4 py-2 text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Login
                </Link>
              ) : (
                <Link
                  onClick={() => setOpenLogout(true)}
                  className={`block px-4 py-2 text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  Logout
                </Link>
              )
            }
          </Menu.Item>

          {/* <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => console.log("logout")}
              className={`w-full text-left px-4 py-2 text-sm text-red-600 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Logout
            </button>
          )}
        </Menu.Item> */}
        </Menu.Items>
      </Menu>
      <LogoutModal
        isOpen={openLogout}
        close={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default UserDropdown;
