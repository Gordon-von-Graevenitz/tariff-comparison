'use strict';
 
const express = require('express');
 
// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
 
// App
const app = express();
const tariffs = [
    {"name": "Product A", "type":1, "baseCost": 5, "additionalKwhCost":22},
    {"name": "Product B", "type":2, "includedKwh":4000, "baseCost": 800, "additionalKwhCost": 30},
];

app.get('/tariffs', (req, res) => {
  res.send(tariffs);
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});