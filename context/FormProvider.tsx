"use client";

import React, { createContext, useContext, ReactNode } from "react";
import {
  FormProvider as RHFProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";

const FormContext = createContext<{
  handleSubmit: () => void;
  getValues: any;
  formState: any;
} | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within a FormProvider");
  return context;
};

interface FormProviderProps {
  children: ReactNode;
  methods?: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  defaultValues?: object;
}

const FormProvider = ({
  children,
  methods,
  onSubmit,
  defaultValues,
}: FormProviderProps) => {
  const internalMethods = useForm({ defaultValues: defaultValues || {} });
  const formMethods = methods || internalMethods;
  // console.log("defaultValues", defaultValues);

  const submitForm = () => {
    formMethods.handleSubmit(onSubmit)();
  };
  const contextValue = {
    handleSubmit: submitForm,
    getValues: formMethods.getValues,
    formState: formMethods.formState,
  };
  return (
    <FormContext.Provider value={contextValue}>
      <RHFProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
      </RHFProvider>
    </FormContext.Provider>
  );
};

export default FormProvider;
