'use client';
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    console.log('Selected mode:', mode);
    alert(`選択されたモード: ${mode}`);
  };

  return (
    <div>
      <WelcomeScreen onModeSelect={handleModeSelect} />
      
      {/* デバッグ情報表示 */}
      {selectedMode && (
        <div className="fixed top-4 right-4 bg-black text-white p-2 rounded">
          選択中: {selectedMode}
        </div>
      )}
    </div>
  );
}