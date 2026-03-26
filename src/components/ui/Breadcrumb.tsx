import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="text-[10px] text-[#666] mb-[6px]">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-[4px] text-[#999]">›</span>}
          {item.href ? (
            <Link href={item.href} className="text-[#315B9E] hover:underline no-underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#333]">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
