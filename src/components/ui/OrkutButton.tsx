import { forwardRef } from "react";

interface OrkutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OrkutButton = forwardRef<HTMLButtonElement, OrkutButtonProps>(
  function OrkutButton({ children, className = "", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={`bg-orkut-btn-bg border border-orkut-btn-border rounded-orkut px-3 py-1 text-[11px] text-orkut-text cursor-pointer hover:bg-[#d8d8d8] active:bg-[#c8c8c8] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
