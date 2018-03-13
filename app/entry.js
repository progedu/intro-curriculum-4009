'use strict';
const $ = require('jquery');
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
const connectStatus = $('#connect-status');

const socket = require('socket.io-client')('http://localhost:8000');
socket.on('server-status', (data) => {
  loadavg.text(data.loadavg.toString());
});

socket.on('connect', () => {
  connectStatus.text('接続しました');
});

socket.on('disconnect', () => {
  connectStatus.text('切断しました');
});