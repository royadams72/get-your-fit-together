export interface Select {
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  };
  hint?: { text: string };
  lable: string;
  name: string;
  options: { value: string | null; display: string; selected?: boolean }[];
  validation?: {};
}

export interface CheckBox {
  defaultChecked?: boolean;
  eventHandlers?: {
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { text: string };
  lable: string;
  name: string;
  validation?: {};
}

export interface Input {
  defualtValue?: string;
  eventHandlers?: {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  hint?: { text: string };
  lable: string;
  name: string;
  placeHolder?: string;
  validation?: {};
}
