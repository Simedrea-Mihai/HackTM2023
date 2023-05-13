const mongoose = require("mongoose");

class HistoricPlaces {
  constructor() {
    this.Schema = mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    });
    this.HModel = mongoose.Model("HistoricPlaces", this.Schema);
  }
  async AddHistoricPlace(data) {
    return await new this.HModel(data).save();
  }
}

module.exports = HistoricPlaces;
