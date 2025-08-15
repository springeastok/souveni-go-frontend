// 店舗マスターデータ
export const mockStores = [
  {"id": "s1",
    "name": "宮島工芸製作所",
    "nameEn": "Miyajima Crafts Works",
    "description": "宮島細工の老舗。杓子や木工品の製造販売。",
    "address": "広島県廿日市市宮島町魚之棚町617",
    "hours": "要確認（季節変動あり）",
    "phone": "0829-44-0330",
    "latitude": 34.2988227,
    "longitude": 132.3233263,
    "image": "https://images.unsplash.com/photo-1577742137119-7e4860b77626?w=400&h=300&fit=crop",
    "tags": ["木工", "宮島細工", "贈答品"],
    "isActive": true,
    "quadrantScores": {
      "heritage_soul": 80,
      "modern_heirloom": 20,
      "folk_heart": 50,
      "fresh_folk": 10,
      "masterpiece": 95,
      "innovative_classic": 30,
      "craft_sense": 70,
      "smart_craft": 20,
      "signature_mood": 10,
      "iconic_style": 5,
      "local_trend": 15,
      "playful_pop": 5,
      "design_master": 10,
      "global_trend": 5,
      "smart_local": 15,
      "smart_pick": 5
    }
  },
  {
    "id": "s4",
    "name": "対厳堂サロン（宮島御砂焼 窯元）",
    "nameEn": "Taigendo Salon (Miyajima Onasayaki Kiln)",
    "description": "厳島神社の御砂を用いる「宮島御砂焼」の窯元直営サロン。",
    "address": "広島県廿日市市宮島口1-3-39",
    "hours": "10:30-17:30（水休・変動あり）",
    "phone": "0829-56-0027",
    "latitude": 34.310879,
    "longitude": 132.3023,
    "image": "https://images.unsplash.com/photo-1627916560026-66f81e64092b?w=400&h=300&fit=crop",
    "tags": ["陶磁器", "宮島御砂焼", "贈答品"],
    "isActive": true,
    "quadrantScores": {
      "heritage_soul": 85,
      "modern_heirloom": 30,
      "folk_heart": 40,
      "fresh_folk": 15,
      "masterpiece": 90,
      "innovative_classic": 40,
      "craft_sense": 60,
      "smart_craft": 25,
      "signature_mood": 15,
      "iconic_style": 10,
      "local_trend": 10,
      "playful_pop": 5,
      "design_master": 15,
      "global_trend": 10,
      "smart_local": 10,
      "smart_pick": 5
    }
  },
  
  {    
    "id": "s5",
    "name": "SAKURAO DISTILLERY VISITOR CENTER",
    "nameEn": "SAKURAO DISTILLERY VISITOR CENTER",
    "description": "桜尾の蒸溜所ビジターセンター。限定ウイスキー／ジン等を販売。",
    "address": "広島県廿日市市桜尾1-12-1",
    "hours": "10:00-17:00（第2日曜休）",
    "phone": "0829-32-9122",
    "latitude": 34.354424,
    "longitude": 132.340187,
    "image": "https://images.unsplash.com/photo-1544321151-6d73ac67406a?w=400&h=300&fit=crop",
    "tags": ["酒類", "ウイスキー", "ジン", "贈答品"],
    "isActive": true,
    "quadrantScores": {
      "heritage_soul": 10,
      "modern_heirloom": 5,
      "folk_heart": 5,
      "fresh_folk": 5,
      "masterpiece": 20,
      "innovative_classic": 35,
      "craft_sense": 10,
      "smart_craft": 15,
      "signature_mood": 40,
      "iconic_style": 45,
      "local_trend": 30,
      "playful_pop": 25,
      "design_master": 45,
      "global_trend": 95,
      "smart_local": 20,
      "smart_pick": 30
    }
  }
];

// ヘルパー関数：店舗の象限スコア取得
export const getStoreQuadrantScore = (storeId, quadrantId) => {
  const store = mockStores.find(s => s.id === storeId);
  return store?.quadrantScores[quadrantId] || 0;
};

// ヘルパー関数：アクティブな店舗のみ取得
export const getActiveStores = () => {
  return mockStores.filter(store => store.isActive);
};

// ヘルパー関数：象限スコアでソートされた店舗取得
export const getStoresByQuadrantScore = (quadrantId, limit = 10) => {
  return mockStores
    .filter(store => store.isActive)
    .sort((a, b) => (b.quadrantScores[quadrantId] || 0) - (a.quadrantScores[quadrantId] || 0))
    .slice(0, limit);
};