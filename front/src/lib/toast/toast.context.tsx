// toast.context.tsx
import { createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "info";

// toast.context.tsx
export type Toast = {
	id: string;
	title: string;
	message: string;
	type: "success" | "error" | "info";
	icon?: React.ReactNode;
};


type ToastContextType = {
	toasts: Toast[];
	showToast: (title: string, message: string, type?: ToastType, icon?: React.ReactNode) => void;
	removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	function showToast(
		title: string,
		message: string,
		type: ToastType = "info",
		icon?: React.ReactNode
	) {
		const id = crypto.randomUUID();

		setToasts((prev) => [
			...prev,
			{ id, title, message, type, icon }
		]);

		setTimeout(() => removeToast(id), 5000);
	}

	function removeToast(id: string) {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}

	return (
		<ToastContext.Provider value={{ toasts, showToast, removeToast }}>
			{children}
		</ToastContext.Provider>
	);
}

export function useToastContext() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast doit être utilisé dans ToastProvider");
	return ctx;
}
