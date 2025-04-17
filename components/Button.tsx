import { ReactNode } from "react";
import Link from "next/link";

import styles from "@/styles/components/_button.module.scss";

export interface ButtonProps {
  children: ReactNode;
  disabled: boolean;
  href?: string;
  type?: string;
  inverted?: boolean;
  onClick?: () => void;
}
const Button = ({
  children,
  disabled,
  href,
  inverted,
  onClick,
}: ButtonProps) => {
  if (href)
    return (
      <Link
        href={href}
        className={`${styles.button} ${inverted && styles.buttonInverted}`}
      >
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${inverted && styles.buttonInverted}`}
      >
        {children}
      </button>
    );
};

export default Button;
