'use client';
import { useState } from 'react';

export default function RecommendationCard({ item, onFavorite, onGoToMap, onDismiss }) {
  const [showGoConfirm, setShowGoConfirm] = useState(false);
  const [showDismissConfirm, setShowDismissConfirm] = useState(false);

  // ★★★ 1. クリック位置の取得ロジックを削除し、シンプルにする ★★★
  const handleGoClick = () => {
    setShowGoConfirm(true);
  };

  const confirmGoToMap = () => {
    onGoToMap(item);
    setShowGoConfirm(false);
  };

  const confirmDismiss = () => {
    onDismiss(item.id);
    setShowDismissConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
        <div className="flex mb-3">
          <div className="w-1/3 pr-4">
            <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} className="w-full aspect-square object-cover rounded-lg" />
          </div>
          <div className="w-2/3">
            <h3 className="font-bold text-base text-gray-800">{item.name}</h3>
            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
            <div className="text-sm mt-2">
              <span>マッチ度: <strong className="text-blue-600">{item.match_score}%</strong></span>
              <span className="ml-3">距離: <strong>{item.distance_km} km</strong></span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          {/* ★★★ 2. (e)を渡す必要がなくなる ★★★ */}
          <button onClick={handleGoClick} className="flex-1 bg-blue-500 text-white text-sm font-semibold py-2 rounded-full hover:bg-blue-600">
            見に行きたい！
          </button>
          <button onClick={() => onFavorite(item)} className="flex-1 bg-yellow-300 text-yellow-800 text-sm font-semibold py-2 rounded-full hover:bg-yellow-400">
            後で見たい
          </button>
          <button onClick={() => setShowDismissConfirm(true)} className="flex-1 bg-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-full hover:bg-gray-300">
            行かない
          </button>
        </div>
      </div>

      {/* 「見に行きたい！」の確認ダイアログ */}
      {showGoConfirm && (
        // ★★★ 3. flexboxで中央配置する方法に変更 ★★★
        <div className="fixed inset-0 bg-[#FDF8E8]/75 backdrop-blur-sm z-50 flex justify-center items-center" onClick={() => setShowGoConfirm(false)}>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-semibold mb-4">マップアプリを開きますか？</p>
            <div className="flex gap-4">
              <button onClick={confirmGoToMap} className="px-6 py-2 bg-blue-500 text-white rounded-lg">はい</button>
              <button onClick={() => setShowGoConfirm(false)} className="px-6 py-2 bg-gray-200 rounded-lg">いいえ</button>
            </div>
          </div>
        </div>
      )}

      {/* 「行かない」の確認ダイアログ */}
      {showDismissConfirm && (
        <div className="fixed inset-0 bg-[#FDF8E8]/75 backdrop-blur-sm flex justify-center items-center z-50" onClick={() => setShowDismissConfirm(false)}>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-semibold mb-4">こちらをリストから削除しますか？</p>
            <div className="flex gap-4">
              <button onClick={confirmDismiss} className="px-6 py-2 bg-red-500 text-white rounded-lg">はい、削除します</button>
              <button onClick={() => setShowDismissConfirm(false)} className="px-6 py-2 bg-gray-200 rounded-lg">いいえ</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}