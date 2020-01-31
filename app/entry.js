'use strict';
import $ from 'jquery';
const block = $('#block');
const scalingButton = $('#scaling-button');
var Chart = require('chart.js');
//var PIXIMIN=require('../public/javascripts/pixi.min.js');
import * as PIXI from 'pixi.js';
//const PIXIMIN = require('../node_modules/pixi.js/dist/pixi.min.js')

var ctx = $('#myChart');
var dos = $('#dos');
let n = 1;
let times = [0, 0, 0, 0, 0, 0, 0, 0];
var userNum = 1;
let ellipses =[];
let vertex = [0,0];

var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['now', '0.25秒前', '0.5秒前', '0.75秒前', '1秒前', '1.25秒前', '1.5秒前'],
    datasets: [
      {
        label: '1分毎',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255,0,0,1)",
        backgroundColor: "rgba(0,0,0,0)"
      },
      {
        label: '5分毎',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(0,0,255,1)",
        backgroundColor: "rgba(0,0,0,0)"
      },
      {
        label: '15分毎',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(0,255,0,1)",
        backgroundColor: "rgba(0,0,0,0)"
      }
    ],
  },
  options: {
    title: {
      display: true,
      text: 'ロードアベレージ'
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMax: 0,
          suggestedMin: 100,
          stepSize: 10,
          callback: function(value, index, values){
            return  value +  '%'
          }
        }
      }]
    },
  }
});

function createelipse(x,y,user){
  let ellipse = new PIXI.Graphics()
  .beginFill(0xff0000)
  .drawEllipse(0,0,30,20)
  .endFill();

  ellipse.pivot.x = 15;
  ellipse.pivot.y = 10;
  ellipse.x = x;
  ellipse.y = y;
  ellipse.rotation = Math.PI / 6;
  app.stage.addChild(ellipse);
  if(ellipses.length < user)
    ellipses.push(ellipse);
  console.log(ellipses);
}

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
const numOfPeople = $('#numOfPeople');

import io from 'socket.io-client';

//const socket = io('https://agile-thicket-48043.herokuapp.com/' || 'http://localhost:8000');
const socket = io('http://localhost:8000');

//bin/wwwで設定した関数を使う
//クライアントからサーバの状況を教えて貰う
//サーバはintervalで時間ごとに値を更新してるのでこちらで呼び出す必要はない
socket.on('server-status', (data) => {

  //console.log(data.datasets[0].loadavg);
  //データの保存が必要
  
  //先にチャートの値を右にずらす
  for(let j = 0; j < myLineChart.data.datasets.length;j++)
  {
    times = myLineChart.data.datasets[j].data;

    for(let i = times.length-1; i > 0; i--)
    {
      myLineChart.data.datasets[j].data[i] = times[i-1];
      times[i] = times[i-1];
    }

    times[0] = data.loadavg[j] * 100;
    myLineChart.data.datasets[j].data[0] = times[0];
  }
  myLineChart.update();
  
  loadavg.text(data.loadavg.join(' : '));
});


socket.on('connect', (data) => {
  console.log('接続しました');
  console.log(data);
  ellipse.x = Math.random() * app.screen.width;
  ellipse.y = Math.random() * app.screen.height;

});
socket.on('disconnect', () => { 
  console.log('切断しました');
  
});


// Pixiアプリケーション生成
let app = new PIXI.Application({
  backgroundColor: 0x1099bb,  // 背景色 16進 0xRRGGBB
});

document.body.appendChild(app.view);

let ellipse = new PIXI.Graphics()
.beginFill(0xff0000)
.drawEllipse(0,0,30,20)
.endFill();

// 基準点を設定(px) 図形(PIXI.Graphicsにはpivotはないので注意)
ellipse.pivot.x = 15
ellipse.pivot.y = 10
ellipse.x = Math.random() * app.screen.width;
ellipse.y = Math.random() * app.screen.height;
ellipse.rotation = Math.PI / 6;
app.stage.addChild(ellipse);

// 中央ののインタラクション(イベント)を有効化
ellipse.interactive = true;

// にマウスが重なった時、表示をポインターにする
ellipse.buttonMode = true;

// 中央のスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する

ellipse.on('pointerdown',  onButaPointerDown);    // の上でマウスがクリック(orタップ)されたとき

function onButaPointerDown() {
  ellipse.on('pointermove',moveEllipse);
}

function moveEllipse(e){
  let position = e.data.getLocalPosition(app.stage);

      // 位置変更
      ellipse.x = position.x;
      ellipse.y = position.y;
      vertex = [position.x,position.y];
}

socket.on('member-of-people', (data) =>{
  console.log('人'+data);
  ellipse.scale.x = parseInt(data);
  ellipse.scale.y = parseInt(data);

  numOfPeople.text(data);
});

socket.on(`start data`, (plyaerId) => {
  const userId = plyaerId;
});