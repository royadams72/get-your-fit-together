export interface Select {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  };
  hint?: { __html: string };
  label: string;
  name: string;
  options: { value: string | null; display: string }[];
  toggleOptions?: { value: string; label: string; toggleOption: any }[];
  validation?: object;
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
  groupName?: string;
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
  validation?: any;
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
  validation?: object;
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
  validation?: object;
}
