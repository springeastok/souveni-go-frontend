'use client';
import { useState } from 'react';

// 親コンポーネント (app/page.jsx) から受け取る関数
export default function LoginScreen({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // エラーメッセージ用

  const handleSubmit = async (event) => {
    event.preventDefault(); // フォームのデフォルト送信をキャンセル
    setError(null); // エラーメッセージをリセット

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    try {
      // FastAPIの/tokenエンドポイントに、フォーム形式でデータを送信
      const response = await fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'ログインに失敗しました。');
      }
      
      // ログイン成功後、親コンポーネントにユーザー情報を渡す
      onLoginSuccess(data);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>&larr; 戻る</button>
      
      <h1 style={{ textAlign: 'center' }}>ログイン</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <button 
          type="submit"
          style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '15px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
        >
          ログインする
        </button>
      </form>
    </div>
  );
}