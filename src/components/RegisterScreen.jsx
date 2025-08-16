         'use client';
import { useState } from 'react';

// 親コンポーネント (app/page.jsx) から受け取る関数
export default function RegisterScreen({ onRegisterSuccess, onBack }) {
  // 状態管理用のuseState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(''); // 年齢層
  const [gender, setGender] = useState(''); // 性別
  const [error, setError] = useState(null); // エラーメッセージ用

  // フォーム送信処理
  const handleSubmit = async () => {
    // バリデーション（入力チェック）
    if (!email || !password || !age || !gender) {
      alert('すべての項目を入力してください');
      return;
    }

    try {
      // 1. バックエンドにユーザー登録情報を送信
      const response = await fetch('http://127.0.0.1:8000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          age_group: age,
          gender: gender,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        // バックエンドからエラーが返された場合
        throw new Error(data.detail || '登録に失敗しました');
      }
      
      // 2. 登録成功後、新しく発行されたユーザーIDを親に渡す
      alert('アカウント登録が完了しました！\n続いて、好みのアイテムを選択してください。');
      onRegisterSuccess(data.user_id);

    } catch (err) {
      setError(err.message);
      alert(`エラー: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>&larr; 戻る</button>

      <h1>アカウント登録</h1>
      <p>あなたの基本情報を教えてください</p>
      
      {/* メールアドレスとパスワード入力 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>ログイン情報</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      {/* 年齢層選択 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>年齢層</h3>
        <div>
          {['18-25', '26-35', '36-45', '46-55', '56+'].map((ageGroup) => (
            <label key={ageGroup} style={{ display: 'block', margin: '5px 0' }}>
              <input type="radio" name="age" value={ageGroup} checked={age === ageGroup} onChange={(e) => setAge(e.target.value)} style={{ marginRight: '10px' }}/>
              {ageGroup}歳
            </label>
          ))}
        </div>
      </div>
      
      {/* 性別選択 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>性別</h3>
        <div>
          {[{ value: 'male', label: '男性' }, { value: 'female', label: '女性' }, { value: 'other', label: 'その他' }, { value: 'prefer-not-to-say', label: '回答しない' }].map((genderOption) => (
            <label key={genderOption.value} style={{ display: 'block', margin: '5px 0' }}>
              <input type="radio" name="gender" value={genderOption.value} checked={gender === genderOption.value} onChange={(e) => setGender(e.target.value)} style={{ marginRight: '10px' }}/>
              {genderOption.label}
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '15px 30px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
      >
        登録して次へ進む
      </button>
      
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}