'use client';
import React, { useState } from 'react';

// --- 各画面のコンポーネントをインポート ---
import WelcomeScreen from '../components/WelcomeScreen';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import ProfileSetupScreen from '../components/ProfileSetupScreen';
import PreferenceSelector from '../components/PreferenceSelector';
import RecommendationScreen from '../components/RecommendationScreen'; // ★★★ RecommendationScreenをインポート ★★★
import { getOrCreateGuestId } from '../utils/guestId';

// 画面の状態を管理するための定数
const STAGES = {
  WELCOME: 'welcome',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE_SETUP: 'profile_setup',
  PREFERENCE_SELECTION: 'preference_selection',
  MAIN_APP: 'main_app', // メインの推薦画面
};

export default function Home() {
  const [stage, setStage] = useState(STAGES.WELCOME);
  const [currentId, setCurrentId] = useState(null); // ユーザーID or ゲストID

  // --- ナビゲーション関数 ---
  const goToWelcome = () => setStage(STAGES.WELCOME);
  const handleGuest = () => {
    setCurrentId(getOrCreateGuestId());
    setStage(STAGES.PROFILE_SETUP);
  };
  
  // --- イベントハンドラ ---
  const onRegisterSuccess = (userId) => {
    setCurrentId(userId);
    setStage(STAGES.PROFILE_SETUP);
  };
  
  const onProfileComplete = (finalUserId) => {
    setCurrentId(finalUserId);
    setStage(STAGES.PREFERENCE_SELECTION);
  };

  const onLoginSuccess = (userData) => {
    alert(`ようこそ、 ${userData.email} さん！`);
    setCurrentId(userData.user_id);
    setStage(STAGES.MAIN_APP); // ログイン成功後、メイン画面へ
  };
  
  const onPreferenceComplete = () => {
    alert("初期設定が完了しました！");
    setStage(STAGES.MAIN_APP); // 好み設定完了後、メイン画面へ
  };

  // --- 表示するコンポーネントを切り替える ---
  const renderStage = () => {
    switch (stage) {
      case STAGES.LOGIN:
        return <LoginScreen onLoginSuccess={onLoginSuccess} onBack={goToWelcome} />;
      case STAGES.REGISTER:
        return <RegisterScreen onRegisterSuccess={onRegisterSuccess} onBack={goToWelcome} />;
      case STAGES.PROFILE_SETUP:
        return <ProfileSetupScreen userId={currentId} onProfileComplete={onProfileComplete} onBack={goToWelcome} />;
      case STAGES.PREFERENCE_SELECTION:
        return <PreferenceSelector userId={currentId} onComplete={onPreferenceComplete} />;
      
      // ★★★ ここの表示をRecommendationScreenに変更 ★★★
      case STAGES.MAIN_APP:
        return <RecommendationScreen userId={currentId} />;
      
      case STAGES.WELCOME:
      default:
        return <WelcomeScreen 
                  onLoginClick={() => setStage(STAGES.LOGIN)} 
                  onRegisterClick={() => setStage(STAGES.REGISTER)} 
                  onGuestClick={handleGuest} 
                />;
    }
  };

  return <div>{renderStage()}</div>;
}