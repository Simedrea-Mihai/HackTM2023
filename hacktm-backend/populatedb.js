const options = {
  provider: "opencage",
  apiKey: "2250d94d0bef4ea2acc8c4cf2ff38ace",
  formatter: null,
};

const NodeGeoCoder = require("node-geocoder");
const evdata = require("./hacktm-backendev.json");
const { EvModel } = require("./controller/eventscontroller");
const { HModel } = require("./controller/historicplacescontroller");
const heritage = require("./heirtage.json");
const { format, parse } = require("date-fns");
function reverseString(str) {
  const arrayStrings = str.split("");
  const reverseArray = arrayStrings.reverse();
  const joinArray = reverseArray.join("");
  return joinArray;
}
const poppulatedb = () => {
  evdata.data.forEach(async (e) => {
    const unformatedate = parse(
      `${e.date.start_date} 2023`,
      "MMMM dd yyyy",
      new Date()
    );
    const date = format(unformatedate, "yyyy-MM-dd");
    let hour = "";
    const strhour = reverseString(e.date.when);
    let index_space = 0;
    let index = 0;
    while (index_space < 2) {
      if (strhour[index] != " ") {
        hour = hour + `${strhour[index]}`;
      } else {
        index_space++;
      }
      index++;
    }
    hour = reverseString(hour);
    const geolocation = await NodeGeoCoder(options).geocode({
      address: `${e.address[0] + " Timisoara"}`,
    });
    try {
      await EvModel.CreateEvent({
        name: e.title,
        description: e.description,
        link: e.link,
        type: "1",
        startdate: date,
        endate: date,
        startime: hour,
        longitude: geolocation[0].longitude,
        latitude: geolocation[0].latitude,
      });
    } catch (error) {
      console.log(error);
    }
  });
};
const populateheritage = () => {
  try {
    heritage.data.forEach(async (e) => {
      const geolocation = await NodeGeoCoder(options).geocode({
        address: `${e.address_name + "Timisoara"}`,
      });
      await HModel.AddHistoricPlace({
        name: e.name,
        description: e.description,
        longitude: geolocation[0].longitude,
        latitude: geolocation[0].latitude,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { poppulatedb, populateheritage };
