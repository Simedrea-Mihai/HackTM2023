const hrouter = require("express").Router();
const HistoricPlaces = require("../models/historicplaces");
const HModel = new HistoricPlaces();
const harvesine = require("haversine");
const calculatedistance = require("../distanceCalculator");
hrouter.post("/addhistoric", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };
    await HModel.AddHistoricPlace(data);
    res.status(200).send({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ err: error });
  }
});
hrouter.post("/proximitybuildings", async (req, res) => {
  try {
    const data = await HModel.GetAllHistoricalPlaces();
    let min1 = 210;
    let min2 = 210;
    let min3 = 210;
    let index1 = 0;
    let index2 = 0;
    let index3 = 0;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    data.forEach((e, index) => {
      const distance = harvesine(
        { latitude: e.latitude, longitude: e.longitude },
        {
          latitude: latitude,
          longitude: longitude,
        },
        { unit: "meter" }
      );
      console.log(distance);
      if (distance < min1) {
        min1 = distance;
        index1 = index + 1;
      } else {
        if (distance < min2) {
          min2 = distance;
          index2 = index + 1;
        } else if (distance < min3) {
          min3 = distance;
          index3 = index3 + 1;
        }
      }
    });
    let resdata = [];
    if (index1 != 0) {
      resdata.push(data[index1 - 1]);
    }
    if (index2 != 0) {
      resdata.push(data[index2 - 1]);
    }
    if (index3 != 0) {
      resdata.push(data[index3 - 1]);
    }
    res.status(200).send(resdata);
    console.log(resdata);
  } catch (error) {
    console.log(error);
    res.status(400).send({ err: "error" });
  }
});

module.exports = hrouter;
