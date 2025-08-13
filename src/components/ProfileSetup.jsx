import { useState } from 'react';
import { mockProducts } from '@/data/mock-products';

function ProfileSetup() {
  // 状態管理用のuseState
  const [age, setAge] = useState(''); // 年齢層
  const [gender, setGender] = useState(''); // 性別
  const [selectedProducts, setSelectedProducts] = useState([]); // 選択した商品のID配列

  // 商品選択処理
  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      // 既に選択されている場合は削除
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      // 選択されていない場合は追加
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // フォーム送信処理
  const handleSubmit = () => {
    // バリデーション（入力チェック）
    if (!age) {
      alert('年齢層を選択してください');
      return;
    }
    
    if (!gender) {
      alert('性別を選択してください');
      return;
    }
    
    if (selectedProducts.length < 3) {
      alert('商品を3個以上選択してください');
      return;
    }

    // 全て正常の場合
    const profileData = {
      age: age,
      gender: gender,
      selectedProducts: selectedProducts
    };
    
    console.log('プロファイル設定完了:', profileData);
    alert('プロファイル設定が完了しました！');
    
    // ここで次の画面に遷移する処理を行います
    // 実際のアプリでは props で渡された関数を呼び出します
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>プロファイル設定</h1>
      <p>あなたの基本情報を教えてください</p>
      
      {/* 年齢層選択 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>年齢層</h3>
        <div>
          {['18-25', '26-35', '36-45', '46-55', '56+'].map((ageGroup) => (
            <label key={ageGroup} style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="radio"
                name="age"
                value={ageGroup}
                checked={age === ageGroup}
                onChange={(e) => setAge(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              {ageGroup}歳
            </label>
          ))}
        </div>
      </div>
      
      {/* 性別選択 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>性別</h3>
        <div>
          {[
            { value: 'male', label: '男性' },
            { value: 'female', label: '女性' }, 
            { value: 'other', label: 'その他' },
            { value: 'prefer-not-to-say', label: '回答しない' }
          ].map((genderOption) => (
            <label key={genderOption.value} style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="radio"
                name="gender"
                value={genderOption.value}
                checked={gender === genderOption.value}
                onChange={(e) => setGender(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              {genderOption.label}
            </label>
          ))}
        </div>
      </div>
      
      {/* 商品選択 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>好みの商品を選択してください（3-5個選択推奨）</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          marginTop: '15px'
        }}>
          {mockProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: selectedProducts.includes(product.id) ? '3px solid #007bff' : '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                cursor: 'pointer',
                backgroundColor: selectedProducts.includes(product.id) ? '#f0f8ff' : 'white'
              }}
              onClick={() => handleProductSelect(product.id)}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{product.name}</h4>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                {product.description}
              </p>
              <div style={{ fontSize: '12px', color: '#888' }}>
                カテゴリ: {product.category}
              </div>
              {selectedProducts.includes(product.id) && (
                <div style={{ 
                  marginTop: '10px', 
                  color: '#007bff', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  ✓ 選択済み
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '16px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        次へ進む ({selectedProducts.length}/3+ 商品選択済み)
      </button>
      
      {/* デバッグ用表示 */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h4>現在の選択状況:</h4>
        <p>年齢: {age}</p>
        <p>性別: {gender}</p>
        <p>選択商品数: {selectedProducts.length}</p>
        <p>選択商品ID: {selectedProducts.join(', ')}</p>
      </div>
    </div>
  );
}

export default ProfileSetup;