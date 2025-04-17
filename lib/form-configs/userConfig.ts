import { Input } from "@/types/interfaces/form";

export const config = {
  userPassword: <Input>{
    name: "userPassword",
    isPassword: true,
    label: "Password:",
    placeHolder: "Enter your password",
    validation: {
      required: { value: true, message: "Please enter your password" },
    },
  },
  userName: <Input>{
    name: "userName",
    label: "User name",
    placeHolder: "Enter your user name",
    hint: { __html: "User name must be at least 6 characters" },
    validation: {
      required: { value: true, message: "Please enter your name" },
      minLength: {
        value: 6,
        message: "User name must be at least 6 characters",
      },
    },
  },
};
