interface OrkutCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export function OrkutCard({
  title,
  children,
  className = "",
  headerAction,
}: OrkutCardProps) {
  return (
    <div
      className={`bg-white border border-[#C3D1E0] rounded-[5px] overflow-hidden ${className}`}
    >
      {title && (
        <div className="bg-[#D1E1F5] px-[8px] py-[4px] flex items-center justify-between border-b border-[#B9CDE5]">
          <h3 className="font-bold text-[11px] text-[#333]">{title}</h3>
          {headerAction}
        </div>
      )}
      <div className="p-[8px]">{children}</div>
    </div>
  );
}
