const mongoose = require("mongoose");
const db = require("./index");

const { Schema } = mongoose;

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "__t" }
);

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  channels: [channelSchema],
});

// Defining discriminators for channel
const channelsPath = categorySchema.path("channels");

channelsPath.discriminator("TextChannel", new Schema({ lastMessage: String }));

channelsPath.discriminator("VoiceChannel", new Schema({ server: String }));

const guildSchema = new Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: (userId) => db.User.exists({ _id: userId }),
      message: "There is no user with ID {VALUE}.",
    },
  },
  createdAt: { type: Date, default: Date.now },
  categories: [categorySchema],
});

guildSchema.pre("remove", async function (next) {
  await db.GuildMember.deleteMany({ guild: this._id });
  next();
});

const Guild = mongoose.model("Guild", guildSchema);

exports.Guild = Guild;
