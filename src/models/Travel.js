import { Schema, model } from 'mongoose';

const travelSchema = new Schema({
  description: {
    type: String, required: true, minlength: 15, maxlength: 150,
  },
  cidade: {
    type: String, minlength: 3, maxlength: 30,
  },
  dataDeIda: {
    type: Date,
  },
  dataDeVolta: {
    type: Date,
    min: '1987-09-28',
  },
  photo: [{
    type: String,
  }],
  days: [{ type: Schema.Types.ObjectId, ref: 'day', default: [] }],
  owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  privacy: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Travel = model('travel', travelSchema);

export default Travel;
