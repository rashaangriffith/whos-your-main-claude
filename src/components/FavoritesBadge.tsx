interface Props {
  count: number;
  color?: string;
}

export default function FavoritesBadge({ count, color }: Props) {
  if (count === 0) return null;
  return (
    <span
      className="ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full text-white leading-none"
      style={{ backgroundColor: color ?? '#888' }}
    >
      {count}
    </span>
  );
}
