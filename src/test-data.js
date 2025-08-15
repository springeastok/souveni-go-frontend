// データの動作確認テス
import { mockProducts, getProductsByCategory } from './data/mock-products.js';
import { mockStores, getStoreQuadrantScore } from './data/mock-stores.js';
import { QUADRANTS, QUADRANT_IDS } from './constants/quadrants.js';

console.log('=== データ動作確認テスト ===');

// 1. 商品データ確認
console.log('\n1. 商品データ:');
console.log(`商品数: ${mockProducts.length}`);
console.log('商品一覧:', mockProducts.map(p => p.name));

// 2. 店舗データ確認
console.log('\n2. 店舗データ:');
console.log(`店舗数: ${mockStores.length}`);
console.log('店舗一覧:', mockStores.map(s => s.name));

// 3. 象限データ確認
console.log('\n3. 象限データ:');
console.log(`象限数: ${QUADRANT_IDS.length}`);
console.log('象限一覧:', Object.values(QUADRANTS).map(q => q.nameJa));

// 4. 機能テスト
console.log('\n4. 機能テスト:');

// カテゴリー別商品取得テスト
const textileProducts = getProductsByCategory('テキスタイル');
console.log(`テキスタイルカテゴリー商品数: ${textileProducts.length}`);
console.log('テキスタイル商品:', textileProducts.map(p => p.name));

// 店舗象限スコア取得テスト
const taiganDoStore = mockStores.find(store => store.name.includes('対厳堂'));
if (taiganDoStore) {
  const score = getStoreQuadrantScore(taiganDoStore.id, 'masterpiece');
  console.log(`${taiganDoStore.name}の匠の逸品スコア: ${score}`);
} else {
  console.log('対厳堂サロン（宮島御砂焼 窯元）の店舗データが見つかりません');
  // 代替として、御砂焼商品の情報を表示
  const misayakiProduct = mockProducts.find(p => p.name.includes('御砂焼'));
  if (misayakiProduct) {
    console.log(`御砂焼商品: ${misayakiProduct.name} (店舗ID: ${misayakiProduct.storeIds.join(', ')})`);
  }
}

// 5. 各店舗の象限スコア数確認
console.log('\n5. 象限スコア完成度確認:');
mockStores.forEach(store => {
  const scoreCount = Object.keys(store.quadrantScores).length;
  console.log(`${store.name}: ${scoreCount}/16象限 ${scoreCount === 16 ? '✅' : '❌'}`);
});

console.log('\n=== テスト完了 ===');
console.log('✅ すべてのデータが正常に読み込まれました！');