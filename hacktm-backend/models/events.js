const { mongo, default: mongoose } = require("mongoose");

class Events {
  constructor() {
    this.Schema = mongoose.Schema(
      {
        name: { type: String, required: true },
        description: { type: String },
        link: { type: String, required: true },
        type: { type: String, required: true },
        longitude: { type: String, required: true },
        latitude: { type: String, required: true },
        startdate: Date,
        endate: Date,
        startime: { type: String, required: true },
      },
      { timestamps: false }
    );
    this.Schema.index({ name: 1, date: 1 }, { unique: true });
    this.EventsModel = mongoose.model("Events", this.Schema);
  }

  async CreateEvent(data) {
    return await new this.EventsModel(data).save();
  }
  async GetEventByType(evtype, date) {
    return await this.EventsModel.find({
      type: evtype,
      $or: [{ startdate: date }, { endate: { $gte: date } }],
    });
  }
  async GetEventByDate(date) {
    return await this.EventsModel.find({
      $or: [{ startdate: date }, { endate: { $gte: date } }],
    });
  }
  async GetEventByStartAndEnd(start, end) {
    return await this.EventsModel.find({
      $and: [{ startdate: { $gte: start } }, { endate: { $lte: end } }],
    });
  }
  async GetAllEvents() {
    return await this.EventsModel.find();
  }
}

module.exports = Events;
