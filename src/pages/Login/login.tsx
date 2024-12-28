import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import hanaCheerUp from '../../assets/img/login/hanaCheerUp.gif';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import isLoginAtom from '../../recoil/isLogin';

export default function ConsultantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginAtom);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginSuccess = await PlatformAPI.login({
      consultantLoginId: email,
      password: password,
    });
    if (loginSuccess) {
      alert('로그인 성공하셨습니다.');
      const decodedPayload = jwtDecode(loginSuccess);
      console.log(decodedPayload.sub);
      if (decodedPayload.sub) {
        if (!isLogin) {
          setIsLogin(true);
          navigate('/');
        }
      }
    } else {
      alert('로그인 실패하였습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex grid-rows-2">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="flex flex-row">
              <div className="text-hanaColor2 text-2xl text-center font-fontBold">
                Hana
              </div>
              <div className="ml-2 text-hanaNavy text-2xl text-center font-fontBold">
                Asset
              </div>
            </div>
            <img
              alt="상담사 로그인 로고"
              src={hanaCheerUp}
              className="mt-4 w-32 h-32"
            />
          </div>

          <h2 className="text-center text-xl text-gray-700 mb-4">
            오늘 하루도 상담사님의
            <div className="font-semibold"> 보람찬 하루를 응원합니다! </div>
          </h2>

          {/* 로그인 폼 */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={handleLogin}
              disabled={!email || !password}
              className="w-full py-2 bg-hanaGreen60 text-white rounded-md hover:bg-hanaColor2"
            >
              로그인
            </button>
          </form>

          {/* 회원가입 및 소셜 로그인 */}
          <div className="text-center mt-4">
            <div className="text-sm text-gray-500">
              아직 MapHana에 가입하지 않으셨나요?{' '}
              <div className=" text-hanaColor2 font-semibold hover:underline mt-2">
                관리자에게 문의하세요 TEL : 010-2087-7881
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
