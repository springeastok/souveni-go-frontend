'use client';
import React, { useState } from 'react';

// --- 画面コンポーネントのインポート（後で作成） ---
import WelcomeScreen from '../components/WelcomeScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import PreferenceSelector from '../components/PreferenceSelector';
import { getOrCreateGuestId } from '../utils/guestId'; // ゲストID取得関数

// 画面の状態を管理するための定数
const STAGES = {
  WELCOME: 'welcome',
  LOGIN: 'login',
  REGISTER: 'register',
  PREFERENCE_SELECTION: 'preference_selection',
};

export default function Home() {
  const [stage, setStage] = useState(STAGES.WELCOME);
  const [currentUserId, setCurrentUserId] = useState(null); // ログイン/登録後のユーザーID

  // --- ナビゲーション関数 ---
  const goToLogin = () => setStage(STAGES.LOGIN);
  const goToRegister = () => setStage(STAGES.REGISTER);
  const goToWelcome = () => setStage(STAGES.WELCOME);
  
  const handleGuest = () => {
    const guestId = getOrCreateGuestId();
    setCurrentUserId(guestId); // ゲストIDをセット
    setStage(STAGES.PREFERENCE_SELECTION);
  };
  
  // --- 登録完了後の処理 ---
  const onRegisterComplete = (userId) => {
    setCurrentUserId(userId);
    setStage(STAGES.PREFERENCE_SELECTION);
  };
  
  // --- ログイン完了後の処理 ---
  const onLoginComplete = (userData) => {
    alert(`ようこそ、 ${userData.email} さん！`);
    // メインコンテンツページなどに遷移
    // router.push('/dashboard');
  };
  
  // --- 好み選択完了後の処理 ---
  const onPreferenceComplete = () => {
    alert("好み設定が完了しました！");
    // メインコンテンツページなどに遷移
    // router.push('/dashboard');
  };

  return (
    <div>
      {stage === STAGES.WELCOME && (
        <WelcomeScreen
          onLoginClick={goToLogin}
          onRegisterClick={goToRegister}
          onGuestClick={handleGuest}
        />
      )}

      {stage === STAGES.LOGIN && (
        <LoginScreen onLoginSuccess={onLoginComplete} onBack={goToWelcome} />
      )}
      
      {stage === STAGES.REGISTER && (
        <RegisterScreen onRegisterSuccess={onRegisterComplete} onBack={goToWelcome} />
      )}

      {stage === STAGES.PREFERENCE_SELECTION && (
        <PreferenceSelector
          userId={currentUserId}
          onComplete={onPreferenceComplete}
        />
      )}
    </div>
  );
}