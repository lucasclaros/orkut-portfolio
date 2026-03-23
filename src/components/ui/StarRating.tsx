interface StarRatingProps {
  label: string;
  rating: number;
  maxStars?: number;
}

export function StarRating({ label, rating, maxStars = 3 }: StarRatingProps) {
  return (
    <div className="flex items-center justify-between text-[10px] py-[1px]">
      <span className="text-[#666]">{label}</span>
      <div className="flex gap-[1px]">
        {Array.from({ length: maxStars }, (_, i) => (
          <span
            key={i}
            className={`text-[11px] ${
              i < rating ? "text-[#F5A623]" : "text-[#D0D0D0]"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
