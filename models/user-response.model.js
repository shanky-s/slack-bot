module.exports = (mongoose) => {
  const UserResponse = mongoose.model(
    "user_responses",
    mongoose.Schema(
      {
        responseText: String,
        slackUserId: String,
        responseType: String,
      },
      { timestamps: true }
    )
  );
  return UserResponse;
};
