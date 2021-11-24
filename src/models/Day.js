import { Schema, model } from 'mongoose';

const daySchema = new Schema({
  dia: {
    type: String,
  },
  description: {
    type: String, required: true, minlength: 3, maxlength: 250,
  },
  phtos: [{
    type: String,
  }],
  travel: { type: Schema.Types.ObjectId, ref: 'travel', required: true }, // One To One
}, {
  timestamps: true,
});

const Day = model('day', daySchema);

export default Day;
