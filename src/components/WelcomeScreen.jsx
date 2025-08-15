import React from 'react';

export default function WelcomeScreen({ onModeSelect }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* タイトルとロゴエリア */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            SouveniGo
          </h1>
          <p className="text-gray-600 mb-6">
            あなたにぴったりのお土産を見つけよう
          </p>
        </div>

        {/* 選択ボタンエリア */}
        <div className="space-y-4">
          <button
            onClick={() => onModeSelect('guest')}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            ゲスト利用
          </button>
          
          <button
            onClick={() => onModeSelect('account')}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
          >
            アカウント登録
          </button>
        </div>
      </div>
    </div>
  );
}