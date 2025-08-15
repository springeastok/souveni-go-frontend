// 16象限お土産好みマトリクス定義
export const QUADRANTS = {
  // Traditional × Emotional
  HERITAGE_SOUL: {
    id: 'heritage_soul',
    name: 'Heritage Soul',
    nameJa: '日本の魂',
    cultural: 'Traditional',
    motivation: 'Emotional',
    description: '伝統工芸品、歴史的価値のある商品'
  },
  FOLK_HEART: {
    id: 'folk_heart',
    name: 'Folk Heart',
    nameJa: '伝統的民芸品',
    cultural: 'Traditional',
    motivation: 'Emotional',
    description: '地域の伝統的な手工芸品'
  },
  SIGNATURE_MOOD: {
    id: 'signature_mood',
    name: 'Signature Mood',
    nameJa: '感性の充足',
    cultural: 'Traditional',
    motivation: 'Emotional',
    description: '特別な雰囲気を演出する商品'
  },
  LOCAL_TREND: {
    id: 'local_trend',
    name: 'Local Trend',
    nameJa: '地元感×トレンド',
    cultural: 'Traditional',
    motivation: 'Emotional',
    description: '地域色豊かなトレンド商品'
  },

  // Modern × Emotional
  MODERN_HEIRLOOM: {
    id: 'modern_heirloom',
    name: 'Modern Heirloom',
    nameJa: '伝統美×モダン',
    cultural: 'Modern',
    motivation: 'Emotional',
    description: '現代的にアレンジされた伝統商品'
  },
  FRESH_FOLK: {
    id: 'fresh_folk',
    name: 'Fresh Folk',
    nameJa: 'モダン民芸',
    cultural: 'Modern',
    motivation: 'Emotional',
    description: '新しい感性の民芸品'
  },
  ICONIC_STYLE: {
    id: 'iconic_style',
    name: 'Iconic Style',
    nameJa: 'アイコニック',
    cultural: 'Modern',
    motivation: 'Emotional',
    description: 'スタイリッシュなデザイン商品'
  },
  PLAYFUL_POP: {
    id: 'playful_pop',
    name: 'Playful Pop',
    nameJa: '楽しき楽しさ',
    cultural: 'Modern',
    motivation: 'Emotional',
    description: 'ポップで楽しい商品'
  },

  // Traditional × Rational
  MASTERPIECE: {
    id: 'masterpiece',
    name: 'Masterpiece',
    nameJa: '匠の逸品',
    cultural: 'Traditional',
    motivation: 'Rational',
    description: '職人技が光る高品質商品'
  },
  CRAFT_SENSE: {
    id: 'craft_sense',
    name: 'Craft Sense',
    nameJa: '実用的工芸品',
    cultural: 'Traditional',
    motivation: 'Rational',
    description: '実用性の高い工芸品'
  },
  DESIGN_MASTER: {
    id: 'design_master',
    name: 'Design Master',
    nameJa: '設計の匠',
    cultural: 'Traditional',
    motivation: 'Rational',
    description: '機能美を追求した商品'
  },
  SMART_LOCAL: {
    id: 'smart_local',
    name: 'Smart Local',
    nameJa: '地元の実用品',
    cultural: 'Traditional',
    motivation: 'Rational',
    description: '地域の知恵が詰まった実用品'
  },

  // Modern × Rational
  INNOVATIVE_CLASSIC: {
    id: 'innovative_classic',
    name: 'Innovative Classic',
    nameJa: '革新×伝統の技',
    cultural: 'Modern',
    motivation: 'Rational',
    description: '革新的技術と伝統の融合'
  },
  SMART_CRAFT: {
    id: 'smart_craft',
    name: 'Smart Craft',
    nameJa: '工芸×実用モダン',
    cultural: 'Modern',
    motivation: 'Rational',
    description: 'スマートな現代工芸品'
  },
  GLOBAL_TREND: {
    id: 'global_trend',
    name: 'Global Trend',
    nameJa: '世界的トレンド',
    cultural: 'Modern',
    motivation: 'Rational',
    description: 'グローバルなトレンド商品'
  },
  SMART_PICK: {
    id: 'smart_pick',
    name: 'Smart Pick',
    nameJa: '賢い買い物',
    cultural: 'Modern',
    motivation: 'Rational',
    description: 'コスパの良い賢い選択'
  }
};

// 象限IDの配列（マッピング用）
export const QUADRANT_IDS = Object.keys(QUADRANTS);

// 象限名の日本語マッピング
export const QUADRANT_NAMES_JA = Object.fromEntries(
  Object.entries(QUADRANTS).map(([key, value]) => [key, value.nameJa])
);