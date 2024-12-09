const UserSchema = new mongoose.Schema(
    {
     email: {
      type: String,
      default: null,
     },
     username: {
      type: String,
     },
     password: {
      type: String,
      default: "$2a$08$kyWnU8E7t7VBqfp2yZSyd.9U52B.qD7GG.stLSpKGHYtqbOTyITpu", //1234@abcd
     },
     name: {
      first: { type: String, default: null },
      last: { type: String, default: null },
     },
     fullName: {
      type: String,
     },
     phone: {
      type: String,
      default: null,
     },
     code: {
      type: String,
     },
     createdAt: { type: Number, default: Date.now },
     updatedAt: { type: Number, default: Date.now },
     active: {
      type: Number,
      default: 0,
     },
     region: {
      type: String,
     },
     workingRegion: {
      type: mongoose.Schema.Types.Mixed,
     },
     roles: {
      type: mongoose.Schema.Types.Object,
     },
    },
    { id: false, versionKey: "v" },
   )
   
   module.exports = mongoConnections("sub-master").model("UserHeyCare", UserSchema)
   