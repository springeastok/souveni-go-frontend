'use client';
import { useState } from 'react';

export default function RegisterScreen({ onRegisterSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('メールアドレスとパスワードを入力してください');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || '登録に失敗しました');
      
      onRegisterSuccess(data.user_id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto' }}>
      <button onClick={onBack}>&larr; 戻る</button>
      <h1>アカウント登録</h1>
      <div style={{ marginBottom: '15px' }}>
        <label>メールアドレス</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" style={{ width: '100%', padding: '10px' }}/>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>パスワード</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" style={{ width: '100%', padding: '10px' }}/>
      </div>
      <button onClick={handleSubmit} style={{ width: '100%', padding: '15px' }}>同意して登録する</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}