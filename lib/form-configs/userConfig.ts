import { Input } from "@/types/interfaces/form";

export const config = (isOnRetrievePage?: boolean) => ({
  password: <Input>{
    name: "userPassword",
    isPassword: true,
    label: isOnRetrievePage
      ? "Enter your password to retrieve your personal plan:"
      : "Enter a password to save your personal plan:",
    validation: { required: "Please enter a password" },
  },
});
