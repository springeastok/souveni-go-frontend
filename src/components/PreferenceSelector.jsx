'use client';
import { useState, useEffect } from 'react';

// ★★★ 1. 配列をシャッフルするためのヘルパー関数を追加 ★★★
function shuffleArray(array) {
  // Fisher-Yates (Knuth) Shuffle アルゴリズム
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function PreferenceSelector({ userId, onComplete }) {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/preferences/selection');
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      
      // ★★★ 2. 取得したデータを結合し、シャッフルしてからstateに保存 ★★★
      const combinedItems = [...data.suppliers, ...data.products];
      const shuffledItems = shuffleArray(combinedItems);
      setItems(shuffledItems);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);
  const handleReshuffle = () => { setSelectedIds(new Set()); fetchItems(); };
  const handleSelect = (id) => { setSelectedIds(prev => { const newSelection = new Set(prev); if (newSelection.has(id)) { newSelection.delete(id); } else { if (newSelection.size >= 3) return prev; newSelection.add(id); } return newSelection; }); };
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          shown_items: items,
          selected_ids: Array.from(selectedIds),
        }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to save preferences');
      }
      alert('好みの設定が完了しました！');
      onComplete();
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <p>好み分析用のアイテム情報を集めています...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;

  const selectionCount = selectedIds.size;
  const isButtonEnabled = selectionCount >= 1 && selectionCount <= 3;
  const isSelectionMaxed = selectionCount === 3;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>あなたの好みに近いもの、気になるものを1〜3つ選んでください</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
        {items.map(item => {
          const isSelected = selectedIds.has(item.id);
          const isDisabled = isSelectionMaxed && !isSelected;

          return (
            // 横長の選択肢ボックス
            <div
              key={item.id}
              onClick={() => !isDisabled && handleSelect(item.id)}
              style={{
                display: 'flex', // 画像とテキストを横並びにする
                alignItems: 'center', // 垂直方向中央揃え
                padding: '1rem',
                border: isSelected ? '2px solid #007bff' : '2px solid #ccc',
                borderRadius: '6px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                transition: 'all 0.2s',
                backgroundColor: isSelected ? '#f0f8ff' : 'white',
              }}
            >
              {/* ★★★ 2. 画像エリア (左50%) ★★★ */}
              <div style={{ width: '50%', paddingRight: '1rem' }}>
                <img 
                  src={item.image_url || 'https://via.placeholder.com/150'} // 画像がない場合の代替画像
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1 / 1', // 画像を正方形に保つ
                    objectFit: 'cover', // 画像をコンテナに合わせてトリミング
                    borderRadius: '4px',
                  }}
                />
              </div>

              {/* ★★★ 3. テキストエリア (右50%) ★★★ */}
              <div style={{ width: '50%', textAlign: 'left' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{item.name}</p>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* ボタン部分は変更なし */}
      <button onClick={handleSubmit} disabled={!isButtonEnabled} style={{ marginTop: '2rem', padding: '1rem 2rem', width: '100%', border: 'none', borderRadius: '8px', fontSize: '1.1rem', color: 'white', backgroundColor: isButtonEnabled ? '#007bff' : '#ccc', cursor: isButtonEnabled ? 'pointer' : 'not-allowed' }}>
        {selectionCount === 0 ? '1つ以上選択してください' : `選択を完了する (${selectionCount}個)`}
      </button>
      <button onClick={handleReshuffle} style={{ marginTop: '1rem', padding: '0.75rem 2rem', width: '100%', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', color: '#333', backgroundColor: '#f0f0f0', cursor: 'pointer' }}>
        選択肢を変更する
      </button>
    </div>
  );
}