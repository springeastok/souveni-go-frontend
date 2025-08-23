'use client';
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import ProfileSetupScreen from '../components/ProfileSetupScreen';
import PreferenceSelector from '../components/PreferenceSelector';
import RecommendationScreen from '../components/RecommendationScreen';
import { getOrCreateGuestId } from '../utils/guestId';

const STAGES = {
  WELCOME: 'welcome',
  REGISTER: 'register',
  PROFILE_SETUP: 'profile_setup',
  PREFERENCE_SELECTION: 'preference_selection',
  MAIN_APP: 'main_app',
};

export default function Home() {
  const [stage, setStage] = useState(STAGES.WELCOME);
  const [currentId, setCurrentId] = useState(null);

  const goToWelcome = () => setStage(STAGES.WELCOME);
  
  const handleGuest = () => {
    setCurrentId(getOrCreateGuestId());
    setStage(STAGES.PROFILE_SETUP);
  };
  
  const onRegisterSuccess = (userId) => {
    setCurrentId(userId);
    setStage(STAGES.PROFILE_SETUP); // 新規登録後はプロフィール設定へ
  };
  
  // ★★★ 変更点1: ログイン成功時の挙動を変更 ★★★
  const onLoginSuccess = (userData) => {
    setCurrentId(userData.user_id);
    // 既存ユーザーは好み設定（または再設定）画面へ
    setStage(STAGES.PREFERENCE_SELECTION); 
  };
  
  const onProfileComplete = (finalUserId) => {
    setCurrentId(finalUserId);
    setStage(STAGES.PREFERENCE_SELECTION);
  };

  const onPreferenceComplete = () => {
    setStage(STAGES.MAIN_APP);
  };

  const renderStage = () => {
    switch (stage) {
      case STAGES.REGISTER:
        return <RegisterScreen onRegisterSuccess={onRegisterSuccess} onBack={goToWelcome} />;
      case STAGES.PROFILE_SETUP:
        return <ProfileSetupScreen userId={currentId} onProfileComplete={onProfileComplete} onBack={goToWelcome} />;
      case STAGES.PREFERENCE_SELECTION:
        return <PreferenceSelector userId={currentId} onComplete={onPreferenceComplete} />;
      case STAGES.MAIN_APP:
        return <RecommendationScreen userId={currentId} />;
      case STAGES.WELCOME:
      default:
        return <WelcomeScreen 
                  onLoginSuccess={onLoginSuccess}
                  onRegisterSuccess={onRegisterSuccess}
                  onGuestClick={handleGuest} 
                />;
    }
  };

  return <div>{renderStage()}</div>;
}