import { Schema, model } from 'mongoose';

const daySchema = new Schema({
  dia: {
    type: String,
  },
  description: {
    type: String, required: true, minlength: 3, maxlength: 250,
  },
  photos: [{
    type: String,
  }],
  privacy: { type: Boolean, default: true },
  travel: { type: Schema.Types.ObjectId, ref: 'travel', required: true },
}, {
  timestamps: true,
});

const Day = model('day', daySchema);

export default Day;
