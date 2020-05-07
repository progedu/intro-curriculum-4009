// WebSocket の接続時と切断時に、クライアントの Chrome のデベロッパーツールの Console に 「接続しました」と「切断しました」という文字列をそれぞれ表示
'use strict';
import $ from 'jquery';
const block = $('#block');
const scalingButton = $('#scaling-button');

scalingButton.click(() => {
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

const movingButton = $('#moving-button');

movingButton.click(() => {
  block.animate({ 'marginLeft': '500px' }, 500);
  block.animate({ 'marginLeft': '20px' }, 1000);
});

const loadavg = $('#loadavg');

import io from 'socket.io-client';
const socket = io('http://localhost:8000');
socket.on('server-status', (data) => {
  loadavg.text(data.loadavg.toString());
});

// Socket オブジェクトに対して、 connect の文字列で定義されるイベントを 監視することで、接続イベントが監視できます。
// また、 disconnect の文字列で定義されるイベントを監視することで、 切断のイベントを監視することができます。
socket.on('connect', () => { console.log('接続しました'); });
socket.on('disconnect', () => { console.log('切断しました'); });
