// 商品マスターデータ（好み分析用）
export const mockProducts = [
 {
    id: 'p001',
    name: '宮島工芸製作所 丸柄丸杓子',
    category: '木工・実用品',
    maker: '宮島工芸製作所',
    storeIds: ['s1'],
    description: '広島産ヤマザクラ材の定番しゃもじ。無塗装・研磨仕上げ。',
    quadrant: 'craft-sense',
    cultural: 'Traditional',
    motivation: 'Rational',
    tags: ['木工', 'しゃもじ', '伝統', '実用品']
 },
 {  
     id: 'p016',
    name: '御砂焼 酒器セット（徳利・盃）',
    category: '陶芸・酒器',
    maker: '対厳堂',
    storeIds: ['s4'],
    description: '厳島神社ゆかりの御砂焼による酒器。',
    quadrant: 'masterpiece',
    cultural: 'Traditional',
    motivation: 'Rational',
    tags: ['陶芸', '御砂焼', '酒器', '伝統']
  },
  {
     id: 'p006',
    name: '看板杓子（セミオーダー名入れ）',
    category: '木工・縁起物',
    maker: '杓子の家',
    storeIds: ['s2'],
    description: '店頭/オンラインで名入れ対応の大型飾り杓子。',
    quadrant: 'craft-sense',
    cultural: 'Traditional',
    motivation: 'Rational',
    tags: ['木工', '縁起物', '名入れ', '実用品']   
  },
  {
    id: 'p008',
    name: '杓子ストラップ（名入れサービス）',
    category: '木工・小物',
    maker: '杓子の家',
    storeIds: ['s2'],
    description: '木製ストラップ。',
    quadrant: 'folk-heart',
    cultural: 'Traditional',
    motivation: 'Emotional',
    tags: ['木工', 'ストラップ', '小物', '名入れ']
    
  },
  {
   id: 'p045',
    name: '広島城 オリジナル手拭い',
    category: 'テキスタイル',
    maker: '広島城',
    storeIds: ['s9'],
    description: '城モチーフの和柄手拭い。',
    quadrant: 'folk-heart',
    cultural: 'Traditional',
    motivation: 'Emotional',
    tags: ['手拭い', '和柄', '歴史']
    
  },
  {
   id: 'p046',
    name: '熊野筆 化粧ブラシ',
    category: 'ビューティーツール',
    maker: '竹田ブラシ製作所',
    storeIds: ['s11'],
    description: '県内老舗ブランドのメイクブラシ。',
    quadrant: 'smart-local',
    cultural: 'Trend',
    motivation: 'Rational',
    tags: ['熊野筆', '化粧ブラシ', '実用品']
  }
];

// カテゴリー別商品取得用のヘルパー関数
export const getProductsByCategory = (category) => {
  return mockProducts.filter(product => product.category === category);
};

// 象限別商品取得用のヘルパー関数
export const getProductsByQuadrant = (quadrant) => {
  return mockProducts.filter(product => product.quadrant === quadrant);
};