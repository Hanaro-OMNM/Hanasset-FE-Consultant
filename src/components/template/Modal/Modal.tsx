import { useState } from 'react';
import LoginPage from './Login.tsx';
import SignUpPage from './SignUp.tsx';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export default function Modal({ onLoginSuccess, onClose }: LoginPageProps) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <div className="bg-white w-[320px] h-[520px] rounded-lg shadow-lg animate-fadeInRight">
      {isLoginPage ? (
        <LoginPage
          onLoginSuccess={onLoginSuccess}
          onClose={onClose}
          onSignUpPage={() => setIsLoginPage(false)}
        />
      ) : (
        <SignUpPage
          onSignUpSuccess={() => setIsLoginPage(true)}
          onClose={onClose}
          onSignUpPage={() => setIsLoginPage(true)}
        />
      )}
    </div>
  );
}
