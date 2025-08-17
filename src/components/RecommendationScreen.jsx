'use client';
import { useState, useEffect } from 'react';

const MOCK_LOCATIONS = [
  { name: '広島駅', lat: 34.3973, lng: 132.4754 },
  { name: '広電宮島口駅', lat: 34.3097, lng: 132.3025 },
  { name: '原爆ドーム', lat: 34.3956, lng: 132.4536 },
  { name: '広島城', lat: 34.3992, lng: 132.4596 },
  { name: 'マツダスタジアム', lat: 34.3916, lng: 132.4845 },
];

export default function RecommendationScreen({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogItem, setDialogItem] = useState(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setError("ユーザーIDが指定されていません。");
      return;
    }
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      const randomLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
      setCurrentLocationName(randomLocation.name);
      try {
        const url = `http://127.0.0.1:8000/recommendations?user_id=${userId}&latitude=${randomLocation.lat}&longitude=${randomLocation.lng}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.detail || 'Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, [userId]);

  const handleFavorite = async (item) => { try { await fetch('http://127.0.0.1:8000/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, item_id: item.id }), }); alert(`${item.name} を「後で見る」に保存しました。`); } catch (err) { alert('保存に失敗しました。'); } finally { setDialogItem(null); } };
  const handleGoToMap = async (item) => { try { await fetch('http://127.0.0.1:8000/destinated', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, item_id: item.id }), }); } catch (err) { console.error('保存に失敗しました:', err); } const url = `https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`; window.open(url, '_blank'); setDialogItem(null); };
  
  if (isLoading) return <p>あなたへのおすすめを分析中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <p style={{ margin: 0 }}>現在地 (ダミー): <strong>{currentLocationName}</strong></p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#555' }}>
          周辺10km以内で、あなたの好みに合う場所（マッチ度40%以上）を表示しています。
        </p>
      </div>

      {/* ### スタイル調整 ### */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {recommendations.length > 0 ? (
          recommendations.map(item => (
            <div 
              key={item.id} 
              onClick={() => setDialogItem(item)} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1rem', 
                border: '2px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              {/* 画像エリア */}
              <div style={{ width: '50%', paddingRight: '1rem' }}>
                <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '4px' }} />
              </div>

              {/* テキストエリア */}
              <div style={{ width: '50%', textAlign: 'left' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{item.name}</p>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 0.5rem 0' }}>{item.description}</p>
                <div style={{ fontSize: '0.9rem', color: '#333' }}>
                  <span>マッチ度: <strong style={{ color: '#007bff' }}>{item.match_score}%</strong></span>
                  <span style={{ marginLeft: '1rem' }}>距離: <strong>{item.distance_km} km</strong></span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
            <p>条件に合うおすすめが見つかりませんでした。</p>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>好みを再設定するか、別の場所でお試しください。</p>
          </div>
        )}
      </div>

      {dialogItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <h2>「{dialogItem.name}」</h2>
            <p>見に行きたいですか？</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={() => handleGoToMap(dialogItem)} style={{ padding: '0.5rem 1rem' }}>行きたい！</button>
              <button onClick={() => handleFavorite(dialogItem)} style={{ padding: '0.5rem 1rem' }}>後で見たい</button>
              <button onClick={() => setDialogItem(null)} style={{ padding: '0.5rem 1rem' }}>行かない</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
