export function HogMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 8c-3 0-5 1.5-6.5 3.5C22 10 18 10.5 16 13c1 1.5 2.5 2.5 4 3-3 2-5 5.5-5 9.5 0 9 8 15 17 15s17-6 17-15c0-4-2-7.5-5-9.5 1.5-.5 3-1.5 4-3-2-2.5-6-3-9.5-1.5C37 9.5 35 8 32 8Z" fill="#fff"/>
      <circle cx="26" cy="26" r="2.4" fill="#0A2440"/>
      <circle cx="38" cy="26" r="2.4" fill="#0A2440"/>
      <ellipse cx="32" cy="34" rx="6.5" ry="5" fill="#E32128"/>
      <circle cx="29.5" cy="34" r="1.3" fill="#0A2440"/>
      <circle cx="34.5" cy="34" r="1.3" fill="#0A2440"/>
    </svg>
  );
}
