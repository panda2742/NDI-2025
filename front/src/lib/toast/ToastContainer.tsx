// ToastContainer.tsx
import { useToastContext } from "./toast.context";
import { ToastItem } from "./Toast";
import "./toast.scss";

export function ToastContainer() {
  const { toasts } = useToastContext();

  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <ToastItem key={toast.id} toast={toast} index={index} />
      ))}
    </div>
  );
}
