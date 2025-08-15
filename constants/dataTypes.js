// ユーザーデータのサンプル構造
export const userTemplate = {
  id: '',
  age: '', // '18-25' | '26-35' | '36-45' | '46-55' | '56+'
  gender: '', // 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
  mode: '', // 'guest' | 'account'
  createdAt: null
};

// 商品データのサンプル構造
export const productTemplate = {
  id: '',
  name: '',
  category: '', // 'traditional' | 'modern' | 'craft' | 'beverage' | 'fashion' | 'snacks'
  quadrant: '', // 16象限のうちどれか
  description: ''
};

// 店舗データのサンプル構造
export const storeTemplate = {
  id: '',
  name: '',
  description: '',
  address: '',
  hours: '',
  quadrantScores: {}, // 各象限のスコア0-100
  location: {
    lat: 0,
    lng: 0
  }
};
