import { Schema, model } from "mongoose";

import { default as ModelTicker } from "../../../domain/model/ticker";

const schema = new Schema(
  {
    currencies: [
      {
        ask: { type: Number, required: true },
        bid: { type: Number, required: true },
        currency: { type: String, required: true },
        pair: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Ticker = model<ModelTicker>("ticker", schema);
