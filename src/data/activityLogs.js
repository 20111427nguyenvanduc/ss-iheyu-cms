var ActivityLog = new mongoose.Schema({
 provider: { type: mongoose.Schema.Types.Mixed, ref: "Provider" },
 author: { type: String },
 phone: { type: mongoose.Schema.Types.Mixed },
 action: { type: String },
 reason: { type: String },
 createdAt: {
  type: Number,
  default: Date.now,
 },
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 data: { type: mongoose.Schema.Types.Mixed },
 member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
 region: { type: String },
})

// module.exports = mongoose.model('ActivityLog', ActivityLog);
module.exports = mongoConnections("master").model("ActivityLog", ActivityLog)
