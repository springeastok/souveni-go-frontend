'use client';
import { useState } from 'react';

export default function ProfileSetupScreen({ userId, onProfileComplete, onBack }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const isGuest = typeof userId === 'string' && userId.startsWith('G');
    const payload = {
      user_id: isGuest ? null : userId,
      guest_id: isGuest ? userId : null,
      age: age,
      gender: gender,
    };

  // デバッグログを追加
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    console.log('Full URL:', `${process.env.NEXT_PUBLIC_API_URL}/users/profile`);
    console.log('Payload:', payload);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'プロファイル設定に失敗しました');
      
      onProfileComplete(data.user_id);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const isButtonDisabled = !age || !gender;

  return (
    <div className="min-h-screen bg-[#FDF8E8] p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        {/* 左上のロゴと戻るボタン */}
        <div className="flex justify-between items-center mb-6">
          <img src="/souvenigo_logo.png" alt="SouveniGo Logo" className="h-8" />
          <button onClick={onBack} className="text-sm text-blue-500 font-semibold">
            &larr; 戻る
          </button>
        </div>

        {/* メインコンテンツのカード */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">あなたのことを教えてください</h1>
            <p className="text-gray-600 mt-2">あなたに合ったお土産を提案するために利用します。</p>
          </div>
          
          <div className="space-y-8">
            {/* 年齢層選択 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">年齢層</h3>
              <div className="grid grid-cols-2 gap-3">
                {['〜18','18-25', '26-35', '36-45', '46-55', '+56'].map((ageGroup) => (
                  <label key={ageGroup} className="cursor-pointer">
                    <input type="radio" name="age" value={ageGroup} checked={age === ageGroup} onChange={(e) => setAge(e.target.value)} className="sr-only peer"/>
                    <div className="w-full p-3 text-center bg-white border border-gray-300 rounded-lg transition-all peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500 hover:border-blue-400">
                      {ageGroup}歳
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 性別選択 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">性別</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ value: 'male', label: '男性' }, { value: 'female', label: '女性' }, { value: 'other', label: 'その他' }, { value: 'prefer-not-to-say', label: '回答しない' }].map((opt) => (
                  <label key={opt.value} className="cursor-pointer">
                    <input type="radio" name="gender" value={opt.value} checked={gender === opt.value} onChange={(e) => setGender(e.target.value)} className="sr-only peer"/>
                    <div className="w-full p-3 text-center bg-white border border-gray-300 rounded-lg transition-all peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500 hover:border-blue-400">
                      {opt.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-6">{error}</p>}

          <button 
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className="w-full mt-8 bg-[#FBC943] text-gray-800 font-bold py-3 rounded-lg shadow-sm transition-colors hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            次へ進む
          </button>
        </div>
      </div>
    </div>
  );
}
