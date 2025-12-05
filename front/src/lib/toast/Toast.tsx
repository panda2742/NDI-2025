// Toast.tsx
import { Toast } from "./toast.context";
import { useToastContext } from "./toast.context";

export function ToastItem({ toast, index }: { toast: Toast; index: number }) {
	const { removeToast } = useToastContext();

	return (
		<div className="ubuntu-toast" style={{ zIndex: index }}>
			{toast.icon && (
				<div className="ubuntu-toast-icon">{toast.icon}</div>
			)}

			<div className="ubuntu-toast-content">
				<div className="ubuntu-toast-title">{toast.title}</div>
				<div className="ubuntu-toast-message">{toast.message}</div>
			</div>

			<button
				className="ubuntu-toast-close"
				onClick={() => removeToast(toast.id)}
				aria-label="Fermer la notification"
			>
				✕
			</button>
		</div>
	);
}
