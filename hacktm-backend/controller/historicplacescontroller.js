const hrouter = require("express").Router();
const HistoricPlaces = require("../models/historicplaces");
const HModel = new HistoricPlaces();

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
