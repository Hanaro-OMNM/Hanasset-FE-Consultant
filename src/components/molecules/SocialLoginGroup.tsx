import { useGoogleLogin } from '@react-oauth/google';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { CookieUtils } from '../../utils/CookieUtils.ts';

interface LoginProps {
  onLoginSuccess: () => void;
}

function SocialLoginGroup({ onLoginSuccess }: LoginProps) {
  const handleGoogleLogin = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (response) => {
      if (response.access_token) {
        // 임시 쿠키 설정 (예: 1일 동안 유효)
        CookieUtils.setCookie('connect.sid', 'temporary-session-id', 1);
        onLoginSuccess();
      }
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: 'implicit',
  });

  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&scope=user`;
  };

  return (
    <div className="flex justify-center space-x-8">
      <FcGoogle
        onClick={() => handleGoogleLogin()}
        className="w-6 h-6 cursor-pointer"
      />
      <FaGithub
        onClick={handleGithubLogin}
        className="w-6 h-6 cursor-pointer"
      />
    </div>
  );
}

export default SocialLoginGroup;
