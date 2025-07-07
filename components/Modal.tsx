// components/Modal.tsx
import styles from "@/styles/components/_modal.module.scss";
import {
  useState,
  useContext,
  createContext,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

// ---- Context Setup ----
type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal components must be used inside <Modal>");
  return context;
};

// ---- Modal Component ----
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

// ---- Modal.Open ----
type ButtonLikeElement = ReactElement<{ onClick?: MouseEventHandler }>;

function Open({
  children,
  opens,
}: {
  children: ButtonLikeElement;
  opens: string;
}) {
  const { open } = useModalContext();

  const originalOnClick = children.props.onClick;

  return cloneElement(children, {
    onClick: (e) => {
      originalOnClick?.(e);
      open(opens);
    },
  });
}

// ---- Modal.Window ----
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
