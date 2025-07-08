import styles from "@/styles/components/_modal.module.scss";

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

const Modal = ({ children, open }: { children: ReactNode; open: boolean }) => {
  const ref = useOutsideClick(close) as React.RefObject<HTMLDialogElement>;

  if (!open) return null;
  return createPortal(
    <div className={styles.overlay}>
      <dialog className={styles.modal} ref={ref} open>
        {children}
      </dialog>
    </div>,
    document.body
  );
};

export default Modal;
