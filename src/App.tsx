import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/template/Layout.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import ChatHistory from './pages/chat/ChatHistory.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import { CookieUtils } from './utils/CookieUtils.ts';

function App() {
  const isLogin = CookieUtils.getCookieValue('connect.sid');
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      CookieUtils.setCookie('connect.sid', 'temporary-session-id', 1);
      setIsLoginModalOpen(false);
    } else if (
      !isLogin &&
      !['/', '/home', '/real-estate-list'].includes(location.pathname)
    ) {
      setIsLoginModalOpen(true);
      navigate('/');
    }
  }, [isLogin, location.pathname, navigate]);

  return (
    <div className="App">
      <RecoilRoot>
        <Layout>
          <Routes>
            <Route path="/" element={<Consultant />} />
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

export default App;
