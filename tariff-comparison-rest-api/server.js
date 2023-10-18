'use strict';
 
const express = require('express');
 
// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
 
// App
const app = express(),
      bodyParser = require("body-parser");

const tariffs = [
        {"name": "Product A", "type":1, "baseCost": 5, "additionalKwhCost":22},
        {"name": "Product B", "type":2, "includedKwh":4000, "baseCost": 800, "additionalKwhCost": 30},
      ];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/tariff-comparison-app/dist/tariff-comparison-app/"));


app.get('/', (req, res) => {
  res.send(process.cwd()+"/tariff-comparison-app/dist/tariff-comparison-app/index.html");
});

app.get('/api/tariffs', (req, res) => {
  res.send(tariffs);
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});