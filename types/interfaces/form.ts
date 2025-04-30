import { RegisterOptions } from "react-hook-form";

export interface Select {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  };
  hint?: { __html: string };
  label: string;
  name: string;
  options?: SelectOption[];
  toggleOptions?: Toggle[] | undefined;
  validation?: RegisterOptions;
}

export interface SelectOption {
  value: string | null;
  display: string;
}
export interface Toggle {
  value: string;
  customValue?: string;
  label: string;
  toggleOption: SelectOption[];
}
export interface CheckBox {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { __html: string };
  label: string;
  name: string;
  value?: any;
  validation?: object;
  groupName?: RegisterOptions;
}

export interface CheckBoxGroup {
  checkboxes: { label: string; value: boolean }[];
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { __html: string };
  legend?: string;
  requiredError?: string;
  name: string;
  validation?: RegisterOptions;
}

export interface Radio {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { __html: string };
  legend: string;
  name: string;
  options: {
    value: string;
    id: string;
    label: string;
    checked?: boolean;
  }[];
  validation?: RegisterOptions;
}

export interface Input {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { __html: string };
  isPassword?: boolean;
  label: string;
  name: string;
  placeHolder?: string;
  validation?: RegisterOptions;
}

export interface FormValue {
  name: string;
  value: string;
}
