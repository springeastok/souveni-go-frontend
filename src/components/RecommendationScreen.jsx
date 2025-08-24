'use client';
import { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import RecommendationCard from './RecommendationCard';

const MOCK_LOCATIONS = [
  { name: '広島駅', lat: 34.3973, lng: 132.4754 },
  { name: '広電宮島口駅', lat: 34.3097, lng: 132.3025 },
  { name: '原爆ドーム', lat: 34.3956, lng: 132.4536 },
  { name: '広島城', lat: 34.3992, lng: 132.4596 },
  { name: 'マツダスタジアム', lat: 34.3916, lng: 132.4845 },
  { name: '平和記念公園', lat: 34.3955, lng: 132.4533 },
  { name: '宮島', lat: 34.2966, lng: 132.3198 }
];

export default function RecommendationScreen({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      const randomLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
      setCurrentLocation(randomLocation);
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/recommendations?user_id=${userId}&latitude=${randomLocation.lat}&longitude=${randomLocation.lng}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
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

  const handleFavorite = async (item) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, item_id: item.id }),
      });
      if (!response.ok) throw new Error('Save to favorites failed');
      alert('後で見るリストに登録しました');
    } catch (err) {
      console.error(err);
      alert('登録に失敗しました。');
    }
  };

  const handleGoToMap = async (item) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinated`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, item_id: item.id }),
      });
    } catch (err) {
      console.error('Destinatedの保存に失敗しました:', err);
    }
    const url = `https://www.google.com/maps?q=${item.location.lat},${item.location.lng}`;
    window.open(url, '_blank');
  };
  
  const handleDismissItem = (itemId) => {
    setRecommendations(prev => prev.filter(item => item.id !== itemId));
  };
  
  const handlePinClick = (item) => {
    setSelectedPinId(item.id);
    setIsMapFullScreen(false);
  };
  const handleToggleMapView = () => {
    setIsMapFullScreen(prev => !prev);
    if (isMapFullScreen) setSelectedPinId(null);
  };

  const displayedItems = selectedPinId 
    ? recommendations.filter(item => item.id === selectedPinId) 
    : recommendations;

  if (isLoading) return <div className="h-screen flex justify-center items-center"><p>分析中...</p></div>;
  if (error) return <div className="h-screen flex justify-center items-center"><p>エラー: {error}</p></div>;

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 relative">
      <div className={`w-full transition-all duration-300 ${isMapFullScreen ? 'h-full' : 'h-1/2'}`}>
        <MapComponent userLocation={currentLocation} items={recommendations} onPinClick={handlePinClick} onGoToMap={handleGoToMap} />
      </div>

      {!isMapFullScreen && (
        <>
          <div className="h-1/2 p-4 flex flex-col overflow-y-auto">
            <div className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700">現在地 (ダミー): <strong className="font-semibold text-gray-900">{currentLocation?.name}</strong></p>
            </div>
            <div className="flex flex-col gap-4">
              {displayedItems.map(item => (
                <RecommendationCard 
                  key={item.id}
                  item={item}
                  // ★★★ ここで指示（props）を渡す ★★★
                  onFavorite={handleFavorite}
                  onGoToMap={handleGoToMap}
                  onDismiss={handleDismissItem}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <button onClick={handleToggleMapView} className="bg-yellow-400 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg">地図を大きく見る</button>
          </div>
        </>
      )}
      {isMapFullScreen && (
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <button onClick={handleToggleMapView} className="bg-yellow-400 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg">リストを見る</button>
          </div>
      )}
    </div>
  );
}