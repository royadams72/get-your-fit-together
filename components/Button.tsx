import { ReactNode } from "react";
import Link from "next/link";

import styles from "@/styles/components/_button.module.scss";
import { Url } from "next/dist/shared/lib/router/router";

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  href?: Url | undefined;
  type?: any;
  inverted?: boolean;
  aux?: boolean;
  external?: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
}

const Button = ({
  children,
  disabled,
  href,
  type = "button",
  inverted,
  aux,
  external,
  className,
  style,
  onClick,
}: ButtonProps) => {
  const buttonStyles = `${styles.button}${
    inverted ? " " + styles.buttonInverted : ""
  }${aux ? " " + styles.buttonAux : ""}${className ? " " + className : ""}`;

  const props = {
    className: buttonStyles,
    href: href as Url,
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
    onClick,
    disabled,
    type,
    style,
  };

  if (href) {
    return (
      <Link role="button" {...props}>
        {children}
      </Link>
    );
  } else {
    return <button {...props}>{children}</button>;
  }
};

export default Button;
