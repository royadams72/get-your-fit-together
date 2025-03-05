import { API } from "@/static_routes.config";

import React from "react";
import { useForm } from "react-hook-form";
import InputComponent from "./InputComponent";
import FormProvider from "@/context/FormProvider";
import { config } from "@/lib/form-configs/userConfig";

const UserForm = () => {
  const methods = useForm();
  const { reset } = methods;

  // useEffect(() => {
  //   if (isNotEmpty(user)) {
  //     console.log(user);
  //   }
  // }, [user]);

  const onSubmit = async (data: any) => {
    console.log("Form Submitted:", data);

    try {
      const response = await fetch(`${API.RETRIEVE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.success) {
        console.log("Data saved successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <InputComponent config={config().userName} />
      <InputComponent config={config().password} />
      <button type="submit">Submit</button>
    </FormProvider>
  );
};

export default UserForm;
