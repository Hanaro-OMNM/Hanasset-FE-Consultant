import { Route, Routes, useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import './App.css';
import LoginPage from './pages/Login/login.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import isLoginAtom from './recoil/isLogin';

function AppContent() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
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
        <Routes>
          <Route path="/" element={<Consultant />} />
          {/* <Route path="/live-chat" element={<ChatApp accessor="guest" />} /> */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
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
