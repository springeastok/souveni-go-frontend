// 商品選択から象限好みを計算

export function calculateUserPreference(selectedProducts) {

const preferences = {};

// 商品ごとの象限影響度マッピング

const productQuadrantMap = {

'p1': { 'Heritage Soul': 40, 'Folk Heart': 30, 'Craft Sense': 20 }, // 和菓子

'p2': { 'Fresh Folk': 40, 'Playful Pop': 35, 'Modern Heirloom': 25 }, // キャラクター

'p3': { 'Craft Sense': 45, 'Heritage Soul': 30, 'Masterpiece': 25 }, // 工芸品

'p4': { 'Folk Heart': 40, 'Heritage Soul': 30, 'Local Trend': 20 }, // お茶

'p5': { 'Modern Heirloom': 40, 'Iconic Style': 30, 'Design Master': 25 } // ファッション

};

selectedProducts.forEach(productId => {

const quadrantScores = productQuadrantMap[productId] || {};

Object.keys(quadrantScores).forEach(quadrant => {

if (!preferences[quadrant]) {

preferences[quadrant] = 0;

}

preferences[quadrant] += quadrantScores[quadrant];

});

});

return preferences;

}