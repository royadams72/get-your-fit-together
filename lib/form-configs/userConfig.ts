import { Input } from "@/types/interfaces/form";

export const config = () => ({
  password: <Input>{
    name: "userPassword",
    isPassword: true,
    label: "Password:",
    validation: { required: "Please enter a password" },
  },
  userName: <Input>{
    name: "userName",
    label: "Full name",
    validation: { required: "Please enter your name" },
  },
});
