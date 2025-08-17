'use client';
import { useState } from 'react';

export default function ProfileSetupScreen({ userId, onProfileComplete, onBack }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    // ボタンが有効な場合のみ実行されるので、ここでのチェックは不要
    
    const isGuest = typeof userId === 'string' && userId.startsWith('G');
    const payload = {
      user_id: isGuest ? null : userId,
      guest_id: isGuest ? userId : null,
      age: age,
      gender: gender,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/users/profile', {
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
  
  // ★★★ 1. ボタンを無効化するための条件を定義 ★★★
  const isButtonDisabled = !age || !gender;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
        &larr; 戻る
      </button>

      <h1>あなたのことを教えてください</h1>
      <p>よりあなたに合ったお土産を提案するために利用します。</p>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>年齢層</h3>
        {['18-25', '26-35', '36-45', '46-55', '56+'].map((ageGroup) => (
          <label key={ageGroup} style={{ display: 'block', margin: '5px 0' }}>
            <input type="radio" name="age" value={ageGroup} checked={age === ageGroup} onChange={(e) => setAge(e.target.value)} style={{ marginRight: '10px' }}/>
            {ageGroup}歳
          </label>
        ))}
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>性別</h3>
        {[{ value: 'male', label: '男性' }, { value: 'female', label: '女性' }, { value: 'other', label: 'その他' }, { value: 'prefer-not-to-say', label: '回答しない' }].map((opt) => (
          <label key={opt.value} style={{ display: 'block', margin: '5px 0' }}>
            <input type="radio" name="gender" value={opt.value} checked={gender === opt.value} onChange={(e) => setGender(e.target.value)} style={{ marginRight: '10px' }}/>
            {opt.label}
          </label>
        ))}
      </div>

      {/* ★★★ 2. ボタンにdisabled属性と動的なstyleを追加 ★★★ */}
      <button 
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        style={{ 
          backgroundColor: isButtonDisabled ? '#ccc' : '#28a745', 
          color: 'white', 
          border: 'none', 
          padding: '15px 30px', 
          fontSize: '16px', 
          borderRadius: '5px', 
          cursor: isButtonDisabled ? 'not-allowed' : 'pointer', 
          width: '100%',
          transition: 'background-color 0.3s'
        }}
      >
        次へ進む
      </button>
      
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}