import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useSignUpMutation } from "../../../redux/services/authApi";
import Loader from "../../../components/ui/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/features/authSlice.js";

const Signup = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register: signup,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitSignUp = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;
      let res = await signUp(payload);
      if (res.data?.success) {
        dispatch(setCredentials(res?.data?.user));
        toast.success(res.data?.message);
        navigate("/");
      } else {
        toast.error(res.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const validationRules = {
    name: {
      required: "Name is required",
      minLength: {
        value: 3,
        message: "Minimum 3 characters",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "Invalid email",
      },
    },
    password: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        message: "Weak password",
      },
    },
  };
  const confirmPasswordValidation = (watch) => ({
    required: "Confirm password is required",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  });
  if (isLoading) return <Loader />;

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#4b2e2b]">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(submitSignUp)}>
            <Input
              type="text"
              label="Name"
              placeholder="Enter your name"
              {...signup("name", validationRules.name)}
              error={errors.name?.message}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...signup("email", validationRules.email)}
              error={errors.email?.message}
            />
            <Input
              label="password"
              type="password"
              placeholder="Enter password"
              {...signup("password", validationRules.password)}
              error={errors.password?.message}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              {...signup("confirmPassword", confirmPasswordValidation(watch))}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              className="w-full bg-[#4b2e2b] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </form>

          <Link to="/signin" className="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <span className="text-[#4b2e2b] font-medium cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Signup;
