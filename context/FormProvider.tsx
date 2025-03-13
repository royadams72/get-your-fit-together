"use client";

import React, { createContext, useContext, ReactNode } from "react";
import {
  FormProvider as RHFProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";

// Create a FormContext to expose the submit function
const FormContext = createContext<{
  handleSubmit: (path: string) => void;
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
  onSubmit: (path: string) => void;
  defaultValues?: any;
}

const FormProvider = ({
  children,
  methods,
  onSubmit,
  defaultValues,
}: FormProviderProps) => {
  const internalMethods = useForm({ defaultValues });
  const formMethods = methods || internalMethods;

  const submitForm = (path: string) => {
    formMethods.handleSubmit(() => onSubmit(path))(); // ✅ Ensure onSubmit is called correctly
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
