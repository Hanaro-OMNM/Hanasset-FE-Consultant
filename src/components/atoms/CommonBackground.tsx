import { ReactNode } from 'react';

interface CommonBackgroundProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void; // 추가: onClick 속성 허용
}

export default function CommonBackground({
  children,
  className = '',
  onClick,
}: CommonBackgroundProps) {
  return (
    <div
      className={`w-full bg-white rounded-[15px] shadow-md ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
