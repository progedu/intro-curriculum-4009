'use strict';

// jQueryモジュール呼び出し
// 慣例的に$という変数に代入して使用する
// jQuery API Document : http://api.jquery.com/
const $ = require('jquery');

// jQueryを利用している
// ↓block = document.getElementById('block');と同じ
const block = $('#block');
// ↓block = document.getElementById('scaling-button');と同じ
const scalingButton = $('#scaling-button');
// 同上
const movingButton = $('#moving-button');
// scalingButtonをクリックすると引数の無名関数が発火する
scalingButton.click(() => {
  // blockをアニメーションさせる
  // 第二引数はミリ秒
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});
movingButton.click(() => {
  // N予備校のコードでは'marginLeft:'としていたが
  // クォーテーションなしで動いた
  // CSSと同じmargin-leftとしていないのは
  // ハイフンを文字列と解釈できないからのようだ
  // ちなみに'margin-left'と指定しても動かなかった
  // ○ marginLeft: '500px'
  // ○ 'marginLeft': '500px'
  // × margin-left: '500px'
  // × 'margin-left': '500px'
  block.animate({ marginLeft: '500px' }, 500);
  block.animate({ marginLeft: '20px' }, 1000);
})
// loadavg = document.getElementById('loadavg');と同じ
const loadavg = $('#loadavg');

// socketを作成する（クライアントサイド）
// 第二引数は接続先URL
const socket = require('socket.io-client')('http://localhost:8000');
// サーバーとの接続が確立され、
// サーバーからイベントとデータが発信されて
// 'server-status'イベントが発生すると
// loadavg.textを書き換える
socket.on('server-status', (data) => {
  loadavg.text(data.loadavg.toString());
});
// サーバーとの接続が確立されると'connect'イベントが
// 切断されると'disconnect'が発生する
// Chromeのデベロッパーツールなどにログが出力される
socket.on('connect', () => { console.log('接続しました') });
socket.on('disconnect', () => { console.log('切断しました') });

// 第一引数の無名関数を1秒間隔で実行する
// setInterval(
//   () => {
//     // /server-statusに何もデータを渡さずにアクセスする
//     $.get('/server-status', {},
//       // serverルーターでJSON形式のデータ
//       // （こんなの→{"loadavg":[0.02490234375,0.017578125,0]}）
//       // が渡されるので、そのデータをID:loadavgのテキストとして表示させる
//       (data) => {
//         loadavg.text(data.loadavg.toString());
//       }
//     );
//   },
//   // 実効間隔ミリ秒
//   1000
// );