export interface Select {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  };
  hint?: { __html: string };
  label: string;
  name: string;
  options: { value: string | null; display: string; selected?: boolean }[];
  toggleOptions?: { value: string; label: string; toggleOption: any }[];
  validation?: {};
}

export interface CheckBox {
  defaultChecked?: boolean;
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { __html: string };
  label: string;
  name: string;
  value?: any;
  validation?: {};
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
  options: { value: string; id: string; label: string; selected?: boolean }[];
  validation?: {};
}

export interface Input {
  defualtValue?: string;
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { __html: string };
  label: string;
  name: string;
  placeHolder?: string;
  validation?: {};
}
