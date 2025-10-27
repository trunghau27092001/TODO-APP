import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { login, reset } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [loggedIn, setLoggedIn]  = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError && loggedIn) toast.error(message)

    if (isSuccess && loggedIn) {
      toast.success(user?.message || "Đăng nhập thành công")
      navigate('/')
    }

    if ((isError || isSuccess) && loggedIn) {
      dispatch(reset())
      setLoggedIn(false) // tránh reset lần nữa
    }
    
  }, [user, isError, isSuccess, message, navigate, dispatch, loggedIn]);

  const onChange = (e) => {
    //set lại dữ liệu (function setFormData) từ dữ liệu trên form (...prevState: để giữ đầy đủ props của object)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    //ngăn không reload khi submit
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    setLoggedIn(true)
  };

  if (isLoading) {
    return (
      <Spinner className="size-10 text-purple-500 flex justify-center items-center min-h-screen bg-transparent dark:bg-zinc-950 mx-auto relative z-10" />
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent dark:bg-zinc-950 mx-auto relative z-10">
      <form
        onSubmit={onSubmit}
        className="shadow-glow  w-full sm:w-[350px] text-center border-1 border-primary dark:border-zinc-700 rounded-2xl px-8 bg-white/50 dark:bg-zinc-900"
      >
        <h1 className="text-primary font-bold dark:text-white text-3xl mt-10">
          Đăng nhập
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
          Đăng nhập để tiếp tục
        </p>

        <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          {/* Mail Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-500 dark:text-zinc-400"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
            name="email"
            onChange={onChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          {/* Lock Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-500 dark:text-zinc-400"
            viewBox="0 0 24 24"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            placeholder="Mật khẩu"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
            name="password"
            onChange={onChange}
            required
          />
        </div>

        {/* <div className="mt-5 text-left">
                    <a className="text-sm text-indigo-500 dark:text-indigo-400" href="#" >
                        Quên mật khẩu?
                    </a>
                </div> */}

        <Button
          type="submit"
          variant="gradient"
          className="mt-2 w-full h-11 rounded-full text-white hover:opacity-90 transition-opacity"
        >
          Đăng nhập
        </Button>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
          Chưa có tài khoản?
          <button
            type="button"
            className="text-primary dark:text-indigo-400 ml-1"
            onClick={() => navigate("/register")}
          >
            Đăng kí
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
