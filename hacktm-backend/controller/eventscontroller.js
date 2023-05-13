const evrouter = require("express").Router();
const EventsModel = require("../models/events");
const EvModel = new EventsModel();
evrouter.post("/addevent", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      type: req.body.type,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      startdate: req.body.startdate,
      endate: req.body.endate,
      startime: req.body.startime,
    };
    await EvModel.CreateEvent(data);
    res.status(200).send({ msg: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ err: "error" });
  }
});
evrouter.get("/eventype", async (req, res) => {
  try {
    const data = await EvModel.GetEventByType(req.body.type, req.body.date);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error" });
  }
});
evrouter.post("/eventbydate", async (req, res) => {
  try {
    const data = await EvModel.GetEventByDate(req.body.date);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ err: "err" });
  }
});
evrouter.get("/allevents", async (req, res) => {
  try {
    const data = await EvModel.GetAllEvents();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ err: "error" });
  }
});
module.exports = { evrouter, EvModel };
