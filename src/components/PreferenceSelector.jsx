'use client';
import { useState, useEffect } from 'react';

function shuffleArray(array) {
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

  // ★★★ 変更点1: useEffectからデータ取得ロジックを外に出して、再利用可能にする ★★★
  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences/selection`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      const combinedItems = [...data.suppliers, ...data.products];
      setItems(shuffleArray(combinedItems));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 画面の初回読み込み時に一度だけアイテムを取得する
  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleSelect = (id) => {
    setSelectedIds(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        if (newSelection.size < 3) {
          newSelection.add(id);
        }
      }
      return newSelection;
    });
  };

  // ★★★ 変更点2: 新しい「入れ替え」ボタン用の関数を作成 ★★★
  const handleReshuffle = () => {
    // 現在の選択をリセット
    setSelectedIds(new Set());
    // アイテムを再取得
    fetchItems();
  };

  const handleSubmit = async () => {
    console.log('handleSubmit関数が呼び出されました！'); 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/preferences`, {
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
      console.error('送信中にエラーが発生しました:', err);
      setError(err.message);
    }
  };

  if (isLoading) return <div className="text-center p-8">好み分析用のアイテム情報を集めています...</div>;
  if (error) return <div className="text-center p-8 text-red-500">エラーが発生しました: {error}</div>;

  const selectionCount = selectedIds.size;

  return (
    <div className="min-h-screen bg-[#FDF8E8] p-4 flex flex-col">
      <div className="w-full">
        <img src="/souvenigo_logo.png" alt="SouveniGo Logo" className="h-8" />
      </div>

      <div className="text-center py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          あなたの好みに近いもの、気になるものを1〜3つ選んでください
        </h2>
      </div>

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 align-content-start">
        {items.map(item => {
          const isSelected = selectedIds.has(item.id);
          const isSelectionMaxed = selectionCount === 3;
          const isDisabled = isSelectionMaxed && !isSelected;

          return (
            <div
              key={item.id}
              onClick={() => !isDisabled && handleSelect(item.id)}
              className={`bg-white rounded-lg shadow p-3 flex flex-col items-center justify-start text-center border-2 transition-all duration-200 aspect-[5/6] ${isSelected ? 'border-blue-500 shadow-md' : 'border-transparent'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
            >
              <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} className="w-full aspect-square object-cover rounded-md mb-3" />
              <div className="w-full">
                <p className="font-bold text-blue-800 text-base leading-tight w-full truncate">{item.name}</p>
                <p className="text-sm text-gray-500 mt-1 w-full truncate">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-4">
        <button
          onClick={handleSubmit}
          disabled={selectionCount === 0}
          className="w-full bg-[#FBC943] text-gray-800 text-lg font-bold py-3 rounded-lg shadow-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectionCount === 0 ? '1つ以上選択してください' : `${selectionCount}個 選択中`}
        </button>

        {/* ★★★ 変更点3: 「選択肢を入れ替える」ボタンを追加 ★★★ */}
        <button
          onClick={handleReshuffle}
          className="w-full mt-3 bg-white text-gray-700 text-base font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          選択肢を入れ替える
        </button>
      </div>
    </div>
  );
}