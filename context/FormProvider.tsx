// import React, { ReactNode } from "react";
// import { useForm, FormProvider as RHFProvider } from "react-hook-form";

// const FormProvider = ({
//   onSubmit,
//   children,
//   defaultValues,
// }: {
//   children: ReactNode;
//   onSubmit: any;
//   defaultValues?: any; // Default values for form fields (optional)
// }) => {
//   const methods = useForm({ defaultValues });
//   return (
//     <RHFProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
//     </RHFProvider>
//   );
// };

// export default FormProvider;

"use client";

import {
  FormProvider as RHFProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";

interface FormProviderProps {
  children: React.ReactNode;
  methods?: UseFormReturn<any>; // Accept external methods (including reset)
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

const FormProvider = ({
  children,
  methods,
  onSubmit,
  defaultValues,
}: FormProviderProps) => {
  const internalMethods = useForm({ defaultValues }); // If no external methods, use internal
  const formMethods = methods || internalMethods;

  return (
    <RHFProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
    </RHFProvider>
  );
};

export default FormProvider;
