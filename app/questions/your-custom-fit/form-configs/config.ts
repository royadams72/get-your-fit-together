import { Input } from "@/types/interfaces/form";

export const config = {
  password: <Input>{
    name: "userPassword",
    isPassword: true,
    label: "Enter a password to save your personal plan:",
    validation: { required: "Please enter a password" },
  },
};
