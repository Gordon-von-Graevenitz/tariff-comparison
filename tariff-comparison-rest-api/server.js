'use strict';
 
const express = require('express');

 
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
 
const app = express(),
      bodyParser = require("body-parser");

const tariffs = [
        {"name": "Product A", "type":1, "baseCost": 5, "additionalKwhCost":22},
        {"name": "Product B", "type":2, "includedKwh":4000, "baseCost": 800, "additionalKwhCost": 30},
      ];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd()+"/tariff-comparison-app/dist/tariff-comparison-app/"));


app.get('/', (req, res) => {
  res.send(process.cwd()+"/tariff-comparison-app/dist/tariff-comparison-app/index.html");
});

app.get('/api/tariffs', (req, res) => {
  res.send(tariffs);
});

app.get('/api/tariffs/:consumption', (req, res) => {
  try {
    const userConsumption = parseFloat(req.params.consumption);
    const calculatedTariffs = []
  
    tariffs.forEach(element => {
        switch (element.type) {
          case 1:
            calculatedTariffs.push({"name": element.name, "annualCost": calculateType1Tariff(userConsumption, element)})
            break;
          case 2:
            calculatedTariffs.push({"name": element.name, "annualCost": calculateType2Tariff(userConsumption, element)})
            break;
          default:
            break;
        }
    });
    res.status(200).json(calculatedTariffs)
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }
  
});

app.post('/api/tariffs/addproduct', (req, res) => {
  const tariffItem = req.body.tariff;
  try {
    tariffs.push(tariffItem);
    res.status(200).json(tariffs)
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

// base cost in EURO and additionalCost in Cents
function calculateType1Tariff(consumption, element) {
  const totalBaseCost = element.baseCost * 12;
  const totalConsumptionCost = (element.additionalKwhCost * consumption)/100; // convert from cents to EURO
  return totalBaseCost + totalConsumptionCost;
}

// base cost in EURO and additionalCost in Cents
function calculateType2Tariff(consumption, element) {
  if (consumption < element.includedKwh)
    return element.baseCost
  const totalBaseCost = element.baseCost;
  const totalConsumptionCost = (element.additionalKwhCost * (consumption - element.includedKwh))/100; // convert from cents to EURO
  return totalBaseCost + totalConsumptionCost;
}

