// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const EventSchema = new Schema(
//   {
//     end: { type: Date, required: true },
//     start: { type: Date, required: true },
//     title: { type: String, required: true },
//     details: { type: String, required: true },
//     location: {
//       address: { type: String, required: true },
//       latLng: {
//         lat: { type: Number, required: true },
//         lng: { type: Number, required: true },
//       },
//     },
//   },
//   {
//     timestamps: true,
//   },
// );



// module.exports = Event;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    end: { type: Date, required: true },
    start: { type: Date, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      latLng: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('events', EventSchema);