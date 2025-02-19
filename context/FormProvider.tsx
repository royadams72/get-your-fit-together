import React, { ReactNode } from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";

const FormProvider = ({
  onSubmit,
  children,
  defaultValues,
}: {
  children: ReactNode;
  onSubmit: any;
  defaultValues?: any; // Default values for form fields (optional)
}) => {
  const methods = useForm({ defaultValues });
  return (
    <RHFProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFProvider>
  );
};

export default FormProvider;
