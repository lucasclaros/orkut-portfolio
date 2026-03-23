interface OrkutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function OrkutButton({
  children,
  className = "",
  ...props
}: OrkutButtonProps) {
  return (
    <button
      className={`bg-orkut-btn-bg border border-orkut-btn-border rounded-orkut px-3 py-1 text-[11px] text-orkut-text cursor-pointer hover:bg-[#d8d8d8] active:bg-[#c8c8c8] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
