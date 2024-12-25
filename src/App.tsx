import { jwtDecode } from 'jwt-decode';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import './App.css';
import Layout from './components/template/Layout.tsx';
import LoginPage from './pages/Login/login.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import ChatHistory from './pages/chat/ChatHistory.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import isLoginAtom from './recoil/isLogin';

function AppContent() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  const isTokenExpired = (token: string) => {
    try {
      const decoded = jwtDecode(token); // 토큰 디코딩
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp! < currentTime; // 만료 여부 확인
    } catch (error) {
      console.error('Invalid token', error);
      return true;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || (accessToken && isTokenExpired(accessToken))) {
      setIsLogin(false);
    }
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [isLogin]);

  return (
    <div className="App">
      <RecoilRoot>
        <Layout>
          <Routes>
            <Route path="/" element={<Consultant />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/live-chat" element={<ChatApp accessor="guest" />} />
            <Route
              path="/chat-history/:id"
              element={<ChatHistory accessor="guest" />}
            />
          </Routes>
        </Layout>
      </RecoilRoot>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;
