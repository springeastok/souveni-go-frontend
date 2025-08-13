# 16象限お土産好みマトリクス

本ドキュメントでは、SouveniGo における「16象限」分類の定義とデータ間関係を明示する。

---

## 3. 16象限の一覧表

### 3.1 4×4 グリッド（概念配置）
メイン縦軸：Cultural Depth（伝統性）↔ Trendiness（流行性）  
メイン横軸：Emotional（情緒性）↔ Rational（合理性）  
サブ縦軸(Price Tier)：Premium ↔ Value
サブ横軸：Authenticity（本物感）↔ Novelty（目新しさ）

### 3.2 機械判読用リスト（ID / スラッグ / 基本属性）
実装時に扱いやすいよう、各象限に固定 ID・スラッグ・軸向きを付与

| id | slug              | en_title          | jp_title               | vertical_main | horizontal_main| horizontal_sub| price_tier |
|----|-------------------|-------------------|------------------------|----------------|--------------|--------------|------------|
| 01 | heritage-soul     | Heritage Soul     | 日本の魂               | cultural 　　　　 | emotional   | authenticity | premium    |
| 02 | modern-heirloom   | Modern Heirloom   | 伝統美×モダン          | cultural 　　　　　 | emotional   | novelty      | premium    |
| 03 | folk-heart        | Folk Heart        | 伝統的民芸品           | cultural 　　　　　 | emotional   | authenticity | value      |
| 04 | fresh-folk        | Fresh Folk        | モダン民芸             | cultural 　　　　 | emotional    | novelty      | value      |
| 05 | masterpiece       | Masterpiece       | 匠の逸品               | cultural  　　　　| rational    | authenticity | premium    |
| 06 | innovative-classic| Innovative Classic| 革新×伝統の技          | cultural  　　　　　| rational    | novelty      | premium    |
| 07 | craft-sense       | Craft Sense       | 実用的工芸品           | cultural 　　　　　 | rational    | authenticity | value      |
| 08 | smart-craft       | Smart Craft       | 工芸×実用モダン        | cultural 　　　　　 | rational    | novelty      | value      |
| 09 | signature-mood    | Signature Mood    | 感性の充足             | trend    　　　　　 | emotional   | authenticity | premium    |
| 10 | iconic-style      | Iconic Style      | アイコニック           | trend  　　　　　   | emotional   | novelty      | premium    |
| 11 | local-trend       | Local Trend       | 地元感×トレンド        | trend   　　　　　  | emotional   | authenticity | value      |
| 12 | playful-pop       | Playful Pop       | 映える楽しさ           | trend   　　　　　  | emotional   | novelty      | value      |
| 13 | design-master     | Design Master     | 設計の匠               | trend    　　　　　 | rational    | authenticity | premium    |
| 14 | global-trend      | Global Trend      | 世界的トレンド         | trend   　　　　　  | rational    | novelty      | premium    |
| 15 | smart-local       | Smart Local       | 地元の実用品           | trend   　　　　　  | rational    | authenticity | value      |
| 16 | smart-pick        | Smart Pick        | 賢い買い物             | trend  　　　　　   | rational    | novelty      | value      |
