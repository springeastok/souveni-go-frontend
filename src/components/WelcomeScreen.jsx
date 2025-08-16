import React from 'react';

export default function WelcomeScreen({ onLoginClick, onRegisterClick, onGuestClick }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            SouveniGo
          </h1>
          <p className="text-gray-600 mb-6">
            あなたにぴったりのお土産を見つけよう
          </p>
        </div>

        <div className="space-y-4">
          {/* ボタンのonClickが、それぞれ正しい関数を呼び出しているか確認 */}
          <button
            onClick={onRegisterClick} 
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
          >
            アカウント登録
          </button>
          
          <button
            onClick={onLoginClick}
            className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
          >
            ログイン
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">または</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={onGuestClick}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            ゲストとしてはじめる
          </button>
        </div>
      </div>
    </div>
  );
}