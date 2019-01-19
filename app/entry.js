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

// connectイベントハンドラ(WebSocket通信の接続時の処理)の定義
socket.on('connect', () => {
  // ブラウザコンソールにログを出力する
  console.log('接続しました');
});

// disconnectイベントハンドラ(WebSocket通信の切断時の処理)の定義
socket.on('disconnect', () => {
  // ブラウザコンソールにログを出力する
  console.log('切断しました');
});