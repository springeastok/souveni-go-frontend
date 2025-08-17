'use client';

import { useState, useEffect } from 'react';

export default function PreferenceSelector({ userId, onComplete }) {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. コンポーネントのマウント時にアイテムを取得
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/preferences/selection');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems([...data.suppliers, ...data.products]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // アイテム選択のハンドラ
  const handleSelect = (id) => {
    setSelectedIds(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  // スコア計算をバックエンドに依頼するハンドラ
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/preferences/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          shown_items: items,
          selected_ids: Array.from(selectedIds),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }
      alert('好みの設定が完了しました！');
      onComplete(); // 親コンポーネントに完了を通知
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <p>好み分析用のアイテム情報を集めています...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;

  return (
    <div>
      <h2>あなたの好み近いもの、気になるものを最大3つ選んでください</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            style={{
              padding: '1rem',
              border: selectedIds.has(item.id) ? '2px solid blue' : '2px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {/* <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} /> */}
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '2rem', padding: '1rem 2rem' }}>
        選択を完了する
      </button>
    </div>
  );
}