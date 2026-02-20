import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./pages/frontend/Navbar/Navbar";
import HeroSlider from "./pages/frontend/HeroSlider/HeroSlider";
import Categories from "./pages/frontend/Categories/Categories";
import OurCafes from "./pages/frontend/OurCafes/OurCafes";
import AboutUs from "./pages/frontend/AboutUs/AboutUs";
import Contact from "./pages/frontend/ContactUs/ContactUs";
import Footer from "./pages/frontend/Footer/Footer";
import ShowProduct from "./pages/frontend/Products/ShowProduct";
import AdminRoutes from "./routes/AdminRoute";
import SignIn from "./pages/frontend/Auth/SignIn";
import Signup from "./pages/frontend/Auth/SignUp";
import { useDispatch } from "react-redux";
import { useVerifyQuery } from "./redux/services/authApi";
import { useEffect } from "react";
import { setCredentials } from "./redux/features/authSlice";
import PublicRoute from "./components/validRoute/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useVerifyQuery();

  useEffect(() => {
    dispatch(setCredentials(data?.user));
  }, [data]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <BrowserRouter>
        {/* Frontend Navbar */}
        <Routes>
          {/* FRONTEND */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroSlider />
                <Categories />
                <OurCafes />
                <AboutUs />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/product/:slug"
            element={
              <>
                <Navbar />
                <ShowProduct />
                <Footer />
              </>
            }
          />

          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
