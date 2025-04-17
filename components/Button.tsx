import { ReactNode } from "react";
import Link from "next/link";

import styles from "@/styles/components/_button.module.scss";

export interface ButtonProps {
  children: ReactNode;
  disabled: boolean;
  href?: string;
  type?: any;
  inverted?: boolean;
  aux?: boolean;
  onClick?: () => void;
}
const Button = ({
  children,
  disabled,
  href,
  type = "button",
  inverted,
  aux,
  onClick,
}: ButtonProps) => {
  const buttonStyles = `${styles.button} ${inverted && styles.buttonInverted} ${
    aux && styles.buttonAux
  }`;

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={buttonStyles}
      >
        {children}
      </button>
    );
  }
};

export default Button;
