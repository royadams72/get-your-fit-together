import { ReactNode } from "react";
import Link from "next/link";

import styles from "@/styles/components/_button.module.scss";

export interface ButtonProps {
  children: ReactNode;
  disabled: boolean;
  href?: string;
  type?: string;
  inverted?: boolean;
  aux?: boolean;
  onClick?: () => void;
}
const Button = ({
  children,
  disabled,
  href,
  inverted,
  aux,
  onClick,
}: ButtonProps) => {
  const buttonStyles = `${styles.button} ${inverted && styles.buttonInverted} ${
    aux && styles.buttonAux
  }`;
  if (href)
    return (
      <Link href={href} className={`${styles.button} ${buttonStyles}`}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${buttonStyles}`}
      >
        {children}
      </button>
    );
};

export default Button;
