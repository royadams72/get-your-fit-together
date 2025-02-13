import React, { ReactNode } from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";

const FormProvider = ({
  onSubmit,
  children,
}: {
  children: ReactNode;
  onSubmit: any;
}) => {
  const methods = useForm();
  return (
    <RHFProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFProvider>
  );
};

export default FormProvider;
