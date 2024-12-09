const mongoose = require("mongoose")
const Schema = mongoose.Schema

var RegionsSchema = new mongoose.Schema(
 {
  provider: { type: mongoose.Schema.Types.Mixed, ref: "Provider" },
  name: {
   type: String,
  },
  key: {
   type: String,
  },
  active: {
   type: Number,
  },
  heycare: {
   type: Number,
  },
  order: {
   type: Number,
  },
  modes: {
   type: Schema.Types.Mixed,
  },
  allowZNS: {
   type: Schema.Types.Mixed,
  },
  radius: {
   type: Number,
  },
  isFranchise: {
   type: Number,
  },
  showPromote: {
   type: Schema.Types.Mixed,
  },
  blockOtherRegionShipper: {
   type: Schema.Types.Mixed,
  },
  location: {
   type: Schema.Types.Mixed,
  },
  boundaries: {
   type: Schema.Types.Mixed,
  },
  config: {
   type: Schema.Types.Mixed,
  },
  regionParent: {
   type: Number,
  },
  keyDistrict: {
   type: Number,
  },
  createdAt: {
   type: Number,
   default: Date.now,
  },
  updatedAt: {
   type: Number,
   default: Date.now,
  },
 },
 { id: false, versionKey: "v" },
)
module.exports = mongoConnections("sub-master").model("Regions", RegionsSchema)
