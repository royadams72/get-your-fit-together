import styles from "@/styles/components/_modal.module.scss";

import {
  useState,
  useContext,
  cloneElement,
  createContext,
  ReactNode,
  ReactElement,
  MouseEventHandler,
} from "react";
import { createPortal } from "react-dom";
import Button from "../components/Button";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

// ------------------
// Context Setup
// ------------------

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal components must be used within <Modal>");
  return context;
};

// ------------------
// Modal Wrapper
// ------------------

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// ------------------
// Modal.Open Component
// ------------------

type ButtonLikeElement = ReactElement<{ onClick?: MouseEventHandler }>;

function Open({
  children,
  opens,
}: {
  children: ButtonLikeElement;
  opens: string;
}) {
  const { open } = useModalContext();

  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

// ------------------
// Modal.Window Component
// ------------------

function Window({
  children,
  name,
}: {
  children: (props: { onCloseModal: () => void }) => ReactNode;
  name: string;
}) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick(close) as React.RefObject<HTMLDialogElement>;

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <dialog className={styles.modal} ref={ref} open>
        {children({ onCloseModal: close })}
      </dialog>
    </div>,
    document.body
  );
}

// Attach subcomponents
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
