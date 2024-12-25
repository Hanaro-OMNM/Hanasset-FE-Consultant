import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin] = useRecoilState(isLoginAtom);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [isLogin, location.pathname, navigate]);

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
