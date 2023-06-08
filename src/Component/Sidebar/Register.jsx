import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/Authapi";
import LoginLago from "./LoginLago";

const Register = () => {
  const [register, { isError, isLoading, isSuccess, isUninitialized }] =
    useRegisterMutation();
  const nav = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validate: {
      name: (value) =>
        value.length < 4 ? "Name must have at least 4 letters" : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 letters" : null,
    },
  });
  return (
    <div className="min-h-screen relative md:block dark:bg-white">
      <div className=" backdrop-blur-sm md:backdrop-blur-none mt-5 md:mt-0  bg-white/10 z-30 md:z-0 ">
        <div className="  flex justify-center  items-center">
          <div className=" shadow-xl w-[900px]  m-3  border rounded-md">
            <p className=" text-4xl text-blue-600 flex justify-center mt-8 font-body font-bold">
              Register
            </p>
            <div className="  p-3 lg:p-4 flex justify-around  items-center ">
              <form
                onSubmit={form.onSubmit(async (values) => {
                  try {
                    const { data } = await register(values);
                    if (data?.success) {
                      nav("/login");
                    }
                  } catch (error) {
                    console.log(error);
                    alert(e);
                  }
                })}
                className=" w-[100%] xl:w-[40%] lg:w-[40%]  p-2 flex flex-col gap-5  md:gap-7"
              >
                <div className="  flex items-center gap-5">
                  <label htmlFor="">
                    <BsFillPersonFill className=" text-2xl" />
                  </label>
                  <TextInput
                    className=" w-[100%]   "
                    {...form.getInputProps("name")}
                    placeholder="Your Name"
                  />
                </div>
                <div className=" w-[100%] flex items-center gap-5">
                  <label htmlFor="">
                    <MdEmail className=" text-2xl" />
                  </label>
                  <TextInput
                    className=" w-[100%]   "
                    {...form.getInputProps("email")}
                    placeholder="Your Email"
                  />
                </div>
                <div className=" flex items-center gap-5">
                  <label htmlFor="">
                    <RiLockPasswordFill className=" text-2xl" />
                  </label>
                  <PasswordInput
                    className=" w-[100%] "
                    {...form.getInputProps("password")}
                    placeholder="Password "
                  />
                </div>
                <div className=" flex flex-col  gap-5">
                  <div className=" flex justify-center gap-5">
                    <label htmlFor="">
                      <RiLockPasswordFill className=" text-2xl" />
                    </label>
                    <PasswordInput
                      className=" w-[100%]   "
                      {...form.getInputProps("password_confirmation")}
                      placeholder="Password confirmation"
                    />
                  </div>
                  <div className=" justify-center flex items-center gap-2 ">
                    <p className=" text-sm md:text-md lg:text-md xl:text-md font-mono  ">
                      Already have an account?
                    </p>
                    <Link
                      className=" underline text-xs md:text-md lg:text-md xl:text-md text-blue-600 font-serif"
                      to={`/login`}
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
                <div className=" flex flex-col  ">
                  <button
                    disabled={isLoading && true}
                    type="submit"
                    className=" bg-blue-600 hover:bg-blue-500 font-mono px-7 py-2  mx-auto  text-white rounded-md"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className=" w-[0] sm:w-[90%] lg:w-[60%] md:[60%] xl:w-[60%] ">
                <LoginLago />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[80%]  absolute left-10 top-5 sm:hidden md:hidden -z-50 ">
        <LoginLago />
      </div>
    </div>
  );
};

export default Register;
