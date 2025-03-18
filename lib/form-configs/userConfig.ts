import { Input } from "@/types/interfaces/form";

export const config = {
  password: <Input>{
    name: "userPassword",
    isPassword: true,
    label: "Password:",
    validation: {
      required: { value: true, message: "Please enter your password" },
    },
  },
  userName: <Input>{
    name: "userName",
    label: "User name",
    validation: {
      required: { value: true, message: "Please enter your name" },
      minLength: {
        value: 6,
        message: "Full name must be at least 6 characters",
      },
    },
  },
};
