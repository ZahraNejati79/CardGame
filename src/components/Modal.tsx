import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

function Modal({ children, open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      ></div>

      <div className="relative z-10 w-xl max-w-full bg-white rounded-xl shadow-2xl p-6 transform transition-all duration-300 scale-100">
        {children}
      </div>
    </div>
  );
}

export default Modal;
