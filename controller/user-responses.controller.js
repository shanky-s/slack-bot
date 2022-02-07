const db = require("../models");
const UserResponse = db.userResponses;
exports.create = (slackResPayload) => {
  const { actions, user, callback_id } = slackResPayload;
  console.log(actions);
  console.log(user);
  const userRes = new UserResponse({
    responseText: actions[0].selected_options[0].value,
    slackUserId: user.name,
    responseType: callback_id,
  });
  return userRes.save(userRes);
};
exports.findAll = (req, res) => {
  return UserResponse.find();
};
