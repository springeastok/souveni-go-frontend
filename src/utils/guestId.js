export function getOrCreateGuestId() {
  const GUEST_ID_KEY = 'guestId';
  
  // 1. ローカルストレージから既存のIDを取得
  let guestId = localStorage.getItem(GUEST_ID_KEY);

  // 2. IDが存在しない場合は、新しく作成
  if (!guestId) {
    // 'G' + 現在時刻のミリ秒 + ランダムな文字列でユニークなIDを生成
    guestId = 'G' + Date.now() + Math.random().toString(36).substring(2, 8);
    
    // 3. 新しいIDをローカルストレージに保存
    localStorage.setItem(GUEST_ID_KEY, guestId);
    console.log('New Guest ID created:', guestId);
  } else {
    console.log('Returning Guest ID found:', guestId);
  }

  return guestId;
}