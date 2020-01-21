# [授業](https://www.nnn.ed.nico/courses/497/chapters/9499)で学んだマークダウン記法をブッパするのぜ！
## 現在の時刻から1.5秒前のサーバの負荷を調べることができます  
![demo](https://github.com/SasuraiNoHoge/intro-curriculum-4009/blob/master-2019/output.gif)  
#### デモURL:[https://agile-thicket-48043.herokuapp.com/](https://agile-thicket-48043.herokuapp.com/)
### 使用方法
```bash
cd ~/workspace
git clone `${自身のURL}`
cd ~/workspace/intro-curriculum-4009
git checkout master-2019
yarn install
```

### ちょこっとメモ  
herokuにsocket.ioを使ってデプロイする際は，entry.jsにしっかり```heroku create```した自分のURLを貼り付けよう!
```js
//const socket = io('https://agile-thicket-48043.herokuapp.com/' || 'http://localhost:8000');
var my_url = `自分のURL`
const socket = io(`${my_url}` || 'http://localhost:8000');
```