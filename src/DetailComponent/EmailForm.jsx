import { TextInput, Textarea } from "@mantine/core";
import React, { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
const Form = ({ close, data }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const form = useRef();

  useEffect(() => {
    setEmail(data.email);
    setName(data.name);
  }, [name, email]);
  const sendEmail = async (e) => {
    if (e === undefined) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        width: "20em",
        showConfirmButton: false,
        timer: 500,
        padding: ".3rem",
        timerProgressBar: true,
        heightAuto: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "process",
        title: "Processing...",
      });
    } else {
      try {
        e.preventDefault();
        const result = await emailjs.sendForm(
          "service_7g0eywj",
          "template_7qnrxoi",
          form.current,
          "Ebu4oArSdzC-7RLH3"
        );
        if (result.text === "OK") {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            width: "20em",
            showConfirmButton: false,
            timer: 3000,
            padding: ".3rem",
            timerProgressBar: true,
            heightAuto: false,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Thanks you for sending message",
          });
        }
      } catch (error) {
        console.error(error.text);
      }
    }
  };
  return (
    <form
      ref={form}
      className="flex flex-col w-80 gap-3 p-5"
      onSubmit={sendEmail}
    >
      <TextInput
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <TextInput
        mt="md"
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        mt="md"
        label="Message"
        name="message"
        type="text"
        placeholder="Message"
        required
      />
      <div className="mt-5">
        <button
          type="submit"
          onClick={() => {
            close();
            sendEmail();
          }}
          className="flex btn-send items-center gap-1 px-4 py-1 text-sm bg-[#5097c7d2] hover:bg-[#5c96b8e5] transition duration-500 text-white font-serif"
        >
          Send <AiOutlineSend className="send-icons" />
        </button>
      </div>
    </form>
  );
};
export default Form;
