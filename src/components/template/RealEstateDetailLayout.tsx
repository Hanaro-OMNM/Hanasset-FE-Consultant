interface FormLayoutProps {
  children: React.ReactNode;
}

export default function RealEstateDetailLayout({ children }: FormLayoutProps) {
  return (
    <div className="top-0 absolute">
      <div className="w-[420px] bg-gray-50/90 absolute backdrop-blur-[10px] left-[420px] overflow-y-auto h-screen scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
