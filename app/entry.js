'use strict';
import $ from 'jquery';
const loadavg = $('#loadavg');
import io from 'socket.io-client';
const socket = io('http://localhost:8000');

//$(document).ready(function () {

  socket.on('server-status', (data) => {
    data.loadavg.forEach((value, index, array) => {
      array[index] = value.toFixed(5);
      let values = [ [ [0,(array[0])] ],[ [1,(array[1])] ],[ [2,(array[2])] ] ];
      let years = [
          [0, "直近１分<br>" + array[0]],
          [1, "直近５分<br>" + array[1]],
          [2, "直近１５分<br>" + array[2]],
      ];
      Flotr.draw($('#chart')[0],values, {
        title: "ロードアベレージ",
        colors: ['#ff0000','#1E90FF','#0000ff'],
          bars: {
              show: true,
              barWidth: 0.5,
              shadowSize: 0,
              fillOpacity: 1,
              lineWidth: 0,
          },
          yaxis: {
              max:0.4,
              min: 0.001,
              tickDecimals: 5,
          },
          xaxis: {
              ticks: years,
          },
          grid: {
              horizontalLines: false,
              verticalLines: false,
          }
      });
    });//forEachここまで

    //loadavg.text(data.loadavg.join(' : '));

  });
  socket.on('connect', () => {
    console.log('WebSocketによるプッシュ通信接続');
  });
  socket.on('disconnect', () => {
    console.log('このコメントのあとは、エラーがでる！？');
  });
//  });
  



