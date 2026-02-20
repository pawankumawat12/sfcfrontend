import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from "../../../redux/services/authApi";
import { useForm } from "react-hook-form";
import { setCredentials } from "../../../redux/features/authSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateRules = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "Invalid email",
      },
    },
    password: {
      required: "Password is required",
    },
  };

  const signInSubmit = async (data) => {
    try {
      const res = await signIn(data);
      if (res.data?.success) {
        dispatch(setCredentials(res?.data?.admin));
        toast.success(res.data?.message);
        navigate("/");
      } else {
        toast.error(res.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#4b2e2b]">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(signInSubmit)}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register("email", validateRules.email)}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", validateRules.password)}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            className="w-full bg-[#4b2e2b] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </form>

        <Link to="/signup" className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-[#4b2e2b] font-medium cursor-pointer">
            Sign Up
          </span>
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
