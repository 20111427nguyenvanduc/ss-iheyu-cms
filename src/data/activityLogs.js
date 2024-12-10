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

ActivityLog.statics.createLog = function (body, user, cb = () => {}) {
 const { action, reason, phone, member, data } = body
 this.create(
  {
   author: _.get(user, "fullName") || `${_.get(user, "name.first")} ${_.get(user, "name.last")}`,
   action,
   phone,
   reason,
   userId: _.get(user, "_id"),
   data,
   member,
   region: _.get(user, "region"),
  },
  cb,
 )
}

module.exports = mongoConnections("master").model("ActivityLog", ActivityLog)
