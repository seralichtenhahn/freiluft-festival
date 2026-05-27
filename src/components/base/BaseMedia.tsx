import type { ReactNode } from "react";

interface BaseMediaProps {
  container?: boolean;
  size?: string;
  aspectRatio?: string;
  children: ReactNode;
}

export default function BaseMedia({
  container = false,
  size = "max-w-none",
  aspectRatio = "",
  children,
}: BaseMediaProps) {
  return (
    <div className={container ? "container mx-auto mb-16" : ""}>
      <div className={`w-full ${size} ${aspectRatio}`}>{children}</div>
    </div>
  );
}
