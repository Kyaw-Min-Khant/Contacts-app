import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useLoginMutation } from "../../app/Authapi";
import Cookies from "js-cookie";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import LoginLago2 from "./LoginLago2";
const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 letters" : null,
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  return (
    <div className=" h-screen dark:bg-white relative md:block  ">
      <div className="flex justify-center mt-5  items-center backdrop-blur-sm md:backdrop-blur-none  md:mt-0  bg-white/10 z-50 md:z-0">
        <div className=" shadow-xl w-[900px] m-3 border rounded-md">
          <p className=" text-4xl flex justify-center mt-5  font-bold font-body text-blue-600 ">
            Sign In
          </p>
          <div className=" p-5 sm:p-5 md:p-10 lg:p-10  flex justify-around items-center  ">
            <form
              onSubmit={form.onSubmit(async (values) => {
                try {
                  const { data } = await login(values);
                  Cookies.set("User", data.token, { expires: 7 });
                  Cookies.set("Info", JSON.stringify(data.user), {
                    expires: 7,
                  });
                  if (data?.success) {
                    navigate("/");
                  }
                } catch (error) {
                  console.log(error);
                  alert(e);
                }
              })}
              className=" flex flex-col sm:gap-10 md:gap-8 lg:gap-8 xl:gap-10 w-[100%] sm:w-[45%] sm:p-5 md:p-5 lg:p-5 xl:p-5 p-0 gap-7"
            >
              <div className=" flex items-center gap-5">
                <label>
                  <MdEmail className=" text-2xl" />
                </label>
                <TextInput
                  required
                  {...form.getInputProps("email")}
                  className=" w-[100%]"
                  placeholder="Enter Your Email..."
                />
              </div>
              <div className=" flex flex-col gap-5">
                <div className=" flex items-center gap-5">
                  <label>
                    <RiLockPasswordFill className=" text-2xl" />
                  </label>
                  <PasswordInput
                    required
                    className=" w-[100%]"
                    {...form.getInputProps("password")}
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className=" flex sm:gap-2 flex-col gap-1 items-center md:flex-row sm:flex-row lg:flex-row xl:flex-row justify-center">
                  <p className=" text-sm sm:text-md lg:text-md xl:text-md ml-4 font-mono">
                    If you don't have an account,{" "}
                  </p>
                  <Link
                    to={"/register"}
                    className="  text-sm sm:text-md  lg:text-md xl:text-md m-0 text-blue-500 font-serif underline"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
              <div className=" flex justify-center">
                <button
                  disabled={isLoading && true}
                  type="submit"
                  className=" bg-blue-600 hover:bg-blue-500  rounded-md text-white px-8 py-2 font-mono "
                >
                  {isLoading ? (
                    <Loader
                      size={"sm"}
                      color="white"
                      className=" block mx-auto"
                    />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
            <div className=" w-[0] sm:w-[40%]">
              <LoginLago2 />
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute left-12 top-5 sm:hidden md:hidden -z-50  w-[55%]">
        <LoginLago2 />
      </div>
    </div>
  );
};
export default Login;
