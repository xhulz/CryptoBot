import { Schema, model } from "mongoose";

import { default as ModelAlert } from "../../../domain/model/alert";

const schema = new Schema(
  {
    currency: {
      ask: { type: Number, required: true },
      bid: { type: Number, required: true },
      currency: { type: String, required: true },
      pair: { type: String, required: true },
    },
    oldPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    variationPercentage: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Alert = model<ModelAlert>("alert", schema);
