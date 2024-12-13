import { ReactNode } from 'react';

interface TextTitleProps {
  children: ReactNode;
}

export default function SemiTitle({ children }: TextTitleProps) {
  return <div className="font-fontBold text-fontNavy text-lg">{children}</div>;
}
