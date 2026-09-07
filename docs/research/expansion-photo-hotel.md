# スマホの写真・撮影／宿泊の部屋選び

確認日：2026年9月7日。新規30問、画像9問。各分野15問を初級6・中級6・上級3に分けた。

## 対象と出典

### スマホの写真・撮影（digital / familiar-photo）

セルフタイマー、連写、パノラマ、セルフィー、ポートレート、ナイトモードを日常の撮影目的と結び付ける。中級6問はフラッシュの記号、ピントの位置、水平の目安、回転、左右反転、スクエアの図。上級はタイムラプスとスローモーションの用途、時間比、写真を正方形に切り取る寸法を扱う。

- [Apple：カメラの撮影設定](https://support.apple.com/ja-jp/guide/iphone/iph3dc593597/26/ios/26)：タイマー、ピント、フラッシュ、グリッドと水平器、比率の一次資料。
- [Apple：バーストモード](https://support.apple.com/ja-jp/guide/iphone/ipha42c55cd0/26/ios/26)
- [Apple：パノラマ写真](https://support.apple.com/ja-jp/guide/iphone/iph7e06402b4/26/ios/26)
- [Apple：セルフィー](https://support.apple.com/ja-jp/guide/iphone/iph1b88429a6/26/ios/26)
- [Apple：ポートレート写真](https://support.apple.com/ja-jp/guide/iphone/iphd7d3a91a2/26/ios/26)
- [Apple：ナイトモード](https://support.apple.com/ja-jp/guide/iphone/iph1a3c5b4c3/ios)
- [Apple：写真の回転・反転・切り取り](https://support.apple.com/ja-jp/guide/iphone/iph0f3ebb1dd/ios)
- [Google：動画・タイムラプス・スローモーション](https://support.google.com/pixelcamera/answer/7064897?hl=ja)

個別機種の操作手順や対応モデルの暗記は問わない。対応機能があるカメラを前提に、一般的な用途を選ぶ。ピントの設問に「タップするとピントが合う」という説明を先に置かず、花だけがぼける状況から操作を選ぶ形にした。既存の「トリミング」の定義問題との重複を避け、追加の切り取り問題は4,000×3,000から最大正方形を求める独自の条件問題にした。

### 宿泊の部屋選び（public / familiar-hotel）

ツインとダブル、エキストラベッド、和洋室、シングルユース、ハリウッドツイン、コネクティング、添い寝、定員と寝具の違いを扱う。画像はベッド配置、和洋室の寝具追加、ベッド幅の比較。

- [JTB：部屋タイプについて](https://faq.jtb.co.jp/faqs/f4795/)：基本の部屋区分と、詳細を各プランで確認する必要性。
- [リッチモンドホテル姫路：客室](https://richmondhotel.jp/himeji/rooms/)：追加ベッドと常設ベッドの構成・サイズが異なる実例。
- [リッチモンドホテル仙台：客室](https://richmondhotel.jp/sendai/rooms/?lang=jp)：シングルユースの一次資料。検索結果の公式本文で確認（Webのページ展開は一度エラー）。
- [リッチモンドホテル浜松：ハリウッドツイン](https://richmondhotel.jp/hamamatsu/welove/)
- [リッチモンドホテルプレミア浅草：コネクティングルーム](https://richmondhotel.jp/asakusa-international/blog/8582/)
- [東横INN：添い寝などのFAQ](https://www.toyoko-inn.com/support/faq/guide?lcl_id=ja)

宿によって異なる寝具数・幅・追加可否・添い寝条件は、架空の客室条件として問題または図に明記した。特定ホテルのサイズや料金を一般化しない。ツインとダブルの誤答は、食事や年齢など無関係なものから、ベッド台数の組合せへ変更した。

## 図と正解の照合

SVGはすべて480×280、独自作図。メーカーの画面・ロゴ・写真を転載せず、図の形と記号、条件の読み取りに必要な情報を描いた。外部リソースへの参照なし。

- photo-01：斜線付きの稲妻。フラッシュオフ。
- photo-02：Aが手前の花、Bが奥の建物。タップ対象はA。
- photo-03：水平線が格子の横線に対して傾斜。必要なのは端末の角度調整。
- photo-04：屋根が右向き。左90度回転で上向きになる。
- photo-05：木・家の左右が入れ替わり、上下は維持。左右反転。
- photo-06：同じ幅の4枠で、Bのみ1対1。
- hotel-01：独立した常設ベッド2台はB。Dのソファは寝具利用不可。
- hotel-02：ベッド2台、畳は布団2組まで、定員4名。4人の寝具には追加2組。
- hotel-03：3台すべて幅100cm以上はC。Aは追加分90cm、Bは2台、Dは2台。

人数・計算の正解は、6秒÷(1/5)=30秒、最大正方形は短辺3,000、5人にはツイン2台＋トリプル3台、和洋室4人にはベッド2台＋布団2組。添い寝問題では大人が使うベッド2台に幼児を一人ずつ割り当てる。

## 検査

- 新規ID30件の一意性、各分野の6/6/3、4択の重複なし、出典・解説、画像9件を確認。
- PlaywrightのChromiumで390px幅の問題カードへ全9図を実描画。横はみ出しなし、SVG内の文字境界も確認。
- `artifacts/photo-hotel-mobile-1.png`〜`3.png`を目視確認。部屋図の4列配置は文字が小さくなるため2×2へ修正。
- `npx tsc --noEmit`成功。

検査用スクリプトと画像は追跡しないartifactsへ保存。標準診断・履歴・全体テストの統合確認は親担当で実施する。
