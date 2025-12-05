// useToast.ts
import { useToastContext } from "./toast.context";

export function useToast() {
  const { showToast } = useToastContext();

  return {
    success: (title: string, msg: string, icon?: React.ReactNode) =>
      showToast(title, msg, "success", icon),

    error: (title: string, msg: string, icon?: React.ReactNode) =>
      showToast(title, msg, "error", icon),

    info: (title: string, msg: string, icon?: React.ReactNode) =>
      showToast(title, msg, "info", icon),
  };
}
