'use strict';
const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/', (req, res, next) => {
  res.json(
    { loadavg: os.loadavg(), uptime: os.uptime() } // ここに書いて http://localhost:8000/server-status で os.~ がどんなものか確認する
    
  );
});

module.exports = router;