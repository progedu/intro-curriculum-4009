'use strict';
import $ from 'jquery';
import io from 'socket.io-client';

$(function () {
  const block = $('#block');
  const scalingButton = $('#scaling-button');
  const disconnectButton = $('#disconnect');

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
  const id = $('#id');
  const connection = $('#connection');
  const numberOfCurrentUser = $('#numberOfCurrentUser');
  const chat_area = $('#chat_area');

  const socket = io('http://localhost:8000');

  socket.on('server-status', (data) => {
    loadavg.text(data.loadavg.toString());
  });

  //接続ユーザー数の表示
  socket.on('numberOfCurrentUser', (num) => { //接続ユーザー数
    numberOfCurrentUser.text(num);
  });

  //ソケットIDの表示
  socket.on('socket_id', (socket_id) => { //ソケットID
    id.text('あなたのID:' + socket_id.toString());
  });

  //ソケットが繋がった時の処理
  socket.on('connect', () => {
    connection.text('接続しました！');
    console.log('接続しました');
    disconnectButton.text('切断');//ボタンを切断ボタンに変更
    disconnectButton.click(() => {
      socket.disconnect();
    });
  });

  //ソケットが切断された時の処理
  socket.on('disconnect', () => {
    connection.text('接続が切れました！');
    console.log('切断しました');
    numberOfCurrentUser.text('?');//ユーザー数は"?"に
    id.text('');//ユーザーIDは空欄に
    disconnectButton.text('再接続');//ボタンを再接続ボタンに変更
    disconnectButton.click(() => {
      location.reload();
    });
  });

  //チャットメッセージの受信
  socket.on('chat_broadcast', (msg) => { 
    console.log('message arrived:' + msg);
    chat_area.html('<p>' + msg + '</p>' + chat_area.html());
  });

  //チャットメッセージの送信
  $('#chat_form').submit(function () {
    socket.emit('chat_post', $('#message').val());
    $('#message').val('');
    return false;
  });

});

