const mongoose = require("mongoose");

class HistoricPlaces {
  constructor() {
    this.Schema = mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    });
    this.HModel = mongoose.model("HistoricPlaces", this.Schema);
  }
  async AddHistoricPlace(data) {
    return await new this.HModel(data).save();
  }
  async GetAllHistoricalPlaces() {
    return await this.HModel.find();
  }
  async Del() {
    return await this.HModel.deleteMany({
      $and: [{ longitude: 21.22571 }, { latitude: 45.75372 }],
    });
  }
}

module.exports = HistoricPlaces;
