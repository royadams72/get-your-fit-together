"use client";
import { useForm } from "react-hook-form";

import { config } from "@/lib/form-configs/userConfig";
import InputComponent from "@/components/forms/InputComponent";
import FormProvider from "@/context/FormProvider";
import { API } from "@/static_routes.config";
import { ENV } from "@/lib/services/envService";

const RetrieveYourPlan = () => {
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
      <InputComponent config={config(true).password} />
      <button type="submit">Submit</button>
    </FormProvider>
  );
};
export default RetrieveYourPlan;
