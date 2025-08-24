'use client';
import { useState } from 'react';

// ★★★ onRegisterSuccessを受け取るように変更 ★★★
export default function WelcomeScreen({ onLoginSuccess, onRegisterSuccess, onGuestClick }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {   
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        // ★★★ 変更点2: 失敗時に具体的なエラーメッセージを表示 ★★★
        throw new Error(data.detail || 'メールアドレスまたはパスワードが違います');
      }
      onLoginSuccess(data); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    // ... (中身は変更なし)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || '新規登録に失敗しました。');
      }
      onRegisterSuccess(data.user_id); // 成功したら司令塔に報告
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (activeTab === 'login') {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  const isButtonDisabled = email === '' || password === '';

  // ... (return以下のJSXは変更なし) ...
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4" style={{ backgroundColor: '#FDF8E8' }}>
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <img src="/souvenigo_icon.png" alt="SouveniGo Icon" className="w-36 h-36 mx-auto mb-4 rounded-3xl shadow-lg" />
          <img src="/souvenigo_logo.png" alt="SouveniGo Logo" className="h-28 mx-auto" />
          <p className="text-gray-600 mt-4">あなたにぴったりのお土産を見つけよう</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <form onSubmit={handleFormSubmit}>
            <div className="flex mb-6">
              <button type="button" onClick={() => setActiveTab('login')} className={`w-1/2 pb-2 font-semibold text-center ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}>
                ログイン
              </button>
              <button type="button" onClick={() => setActiveTab('register')} className={`w-1/2 pb-2 font-semibold text-center ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}>
                新規登録
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </div>
              <div>
                <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button type="submit" disabled={isButtonDisabled} className="w-full font-bold py-3 px-4 rounded-lg text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600">
              {activeTab === 'login' ? 'ログイン' : '登録する'}
            </button>
          </form>
        </div>
        <div className="text-center mb-4 text-gray-500">または</div>
        <button onClick={onGuestClick} className="w-full bg-[#FBC943] text-gray-800 font-bold py-3 rounded-lg shadow hover:bg-yellow-500 transition-colors">
          ゲストログイン
        </button>
      </div>
    </div>
  );
}