# SouveniGo データ構造設計書

## 📊 16象限お土産好み分類システム

### 象限マトリクス概要
- **大横軸**: Emotional（情緒性） ←→ Rational（合理性）
- **大縦軸**: Cultural Depth（伝統性）←→ Trendiness（流行性）
- **小横軸**: Authenticity（本物感） ←→ Novelty（目新しさ）
- **小縦軸**: Premium←→ Value


### 16象限の一覧表＆説明

#### Cultural Depth× Emotional
- **Heritage Soul**: 日本の魂
- **Modern Heirloom**: 伝統美×モダン
- **Folk Heart**: 伝統的民芸品
- **Fresh Folk**: モダン民芸

#### Cultural Depth × Rational  
- **Masterpiece**: 匠の逸品
- **Innovative Classic**: 革新×伝統の技
- **Craft Sense**: 実用的工芸品
- **Smart Craft**: 工芸×実用モダン

#### Trendiness × Emotional
- **Signature Mood**:感性の充足
- **Iconic Style**: アイコニック
- **Local　Trend**: 地元感×トレンド
- **Playful Pop**: 映える楽しさ

#### Trendiness × Rational
- **Design Master**: 設計の匠
- **Global Trend**: 世界的トレンド
- **Smart Local**: 地元の実用品
- **Smart Pick**: 賢い買い物

## 💻 データ構造とその関係性

### 主要データエンティティ

#### 1. User（ユーザー）
```javascript
const userTemplate = {
  id: string,           // ユーザー識別子
  age: string,          // '18-25', '26-35', '36-45', '46-55', '56+'
  gender: string,       // 'male', 'female', 'non-binary', 'prefer-not-to-say'
  mode: string,         // 'guest', 'account'
  createdAt: Date       // 作成日時
};
```

### 2. Product（プロダクト）
const productTemplate = {
  id: string,           // 商品識別子（例: 'p1', 'p2'）
  name: string,         // 商品名（例: '和菓子セット'）
  category: string,     // 'traditional', 'modern', 'craft', 'beverage', 'fashion', 'snacks'
  quadrant: string,     // 16象限のうちどれか（例: 'Heritage Soul'）
  description: string   // 商品説明文
};

### 3. Store（店舗）
const storeTemplate = {
  id: string,                    // 店舗識別子（例: 's1', 's2'）
  name: string,                  // 店舗名（例: '京都伝統工芸館'）
  description: string,           // 店舗説明文
  address: string,               // 住所
  hours: string,                 // 営業時間（例: '9:00-18:00'）
  quadrantScores: {              // 各象限への適合度スコア（0-100）
    'Heritage Soul': number,
    'Folk Heart': number,
    'Craft Sense': number,
    'Masterpiece': number,
    // ... 16象限すべて
  },
  location: {                    // 位置情報
    lat: number,                 // 緯度
    lng: number                  // 経度
  }
};


### データ関係性の説明

**ユーザー → 商品選択 → 象限好み**
User選択 → [Product1, Product2, Product3] → 象限好み計算
例: 
- ユーザーが「和菓子セット」「お茶セット」を選択
- 和菓子セット: Heritage Soul +40点、Folk Heart +30点
- お茶セット: Folk Heart +40点、Heritage Soul +30点
- 結果: Folk Heart 70点、Heritage Soul 70点 の好み


**象限好み → 店舗マッチング → 推薦**
ユーザー象限好み × 店舗象限スコア = マッチング度
例:
- ユーザー: Folk Heart 70点好み
- 店舗A: Folk Heart 95点スコア  
- 店舗B: Folk Heart 30点スコア
- 結果: 店舗A の方が高マッチング（70 × 95 > 70 × 30）


**マッチング計算**
// 基本的な計算ロジック
```javascript
function calculateStoreMatch(userPreferences, storeQuadrantScores) {
  let totalScore = 0;
  let totalWeight = 0;
  
  Object.keys(userPreferences).forEach(quadrant => {
    const userScore = userPreferences[quadrant];      // ユーザーの好み度
    const storeScore = storeQuadrantScores[quadrant]; // 店舗の象限スコア
    
    totalScore += userScore * storeScore;
    totalWeight += userScore;
  });
  
  return totalWeight > 0 ? (totalScore / totalWeight) : 0;
}
```

## データフロー ##
1. User Registration (Profile Setup)
   ↓
2. Product Selection (Preference Analysis)  
   ↓
3. Quadrant Preference Calculation (Matching Logic)
   ↓
4. Store Matching Score Calculation (Matching Logic)
   ↓
5. Sorted Store List Display (Store List)



## ⚠️ 実装上の重要な注意点

### JavaScriptでの型安全性確保
```javascript
// 商品選択時の検証例
function validateProductSelection(selectedProductIds) {
  // 選択された商品IDが有効かチェック
  const validIds = mockProducts.map(p => p.id);
  return selectedProductIds.every(id => validIds.includes(id));
}

// 象限スコア計算時の検証例  
function validateQuadrantScores(scores) {
  const requiredQuadrants = [
    'Heritage Soul', 'Folk Heart', 'Craft Sense', 'Masterpiece',
    'Modern Heirloom', 'Fresh Folk', 'Signature Mood', 'Iconic Style',
    'Innovative Classic', 'Smart Craft', 'Design Master', 'Global Trend',
    'Local Trend', 'Playful Pop', 'Smart Local', 'Smart Pick'
  ];
  
  return requiredQuadrants.every(quadrant => 
    scores.hasOwnProperty(quadrant) && 
    typeof scores[quadrant] === 'number' &&
    scores[quadrant] >= 0 && 
    scores[quadrant] <= 100
  );
}