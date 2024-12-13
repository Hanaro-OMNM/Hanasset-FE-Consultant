import { Button as HeadlessButton } from '@headlessui/react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  version?: 'ver1' | 'ver2'; //버튼 버전 선택 1: bg-hanagreen 2: border만 hanagreen
}

export default function Button({
  type = 'submit',
  onClick,
  disabled = false,
  text,
  version = 'ver1',
}: ButtonProps) {
  return (
    <div
      className={`w-full px-4 py-2 rounded-xl flex justify-center items-center gap-2 transition 
      ${
        version === 'ver1'
          ? disabled
            ? 'bg-hanaBlack40 cursor-not-allowed'
            : 'bg-hanaGreen40 hover:bg-hanaColor2 focus:bg-hanaColor2'
          : disabled
            ? 'bg-white shadow border-2 border-hanaBlack40 cursor-not-allowed'
            : 'bg-white shadow border-2 border-hanaGreen'
      }
      `}
    >
      <HeadlessButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full h-full text-md
          ${version === 'ver1' ? 'text-white' : disabled ? 'text-hanaBlack40' : 'text-hanaGreen'}
        `}
      >
        {text}
      </HeadlessButton>
    </div>
  );
}
