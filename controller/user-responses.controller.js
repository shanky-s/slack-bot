const db = require("../models");
const UserResponse = db.userResponses;
exports.create = (slackResPayloadJSON) => {
  console.log(slackResPayloadJSON);
  const slackResPayload = JSON.parse(slackResPayloadJSON);
  if (!slackResPayload) {
    //res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { actions, user } = slackResPayload;
  console.log(actions);
  console.log(user);
  const userRes = new UserResponse({
    responseText: actions[0].selected_options[0].value,
    slackUserId: user.name,
  });
  userRes
    .save(userRes)
    .then((data) => {
      console.log("saved data");
      console.log(data);
    })
    .catch((err) => {
      console.error(err.message || "Some error occurred while creating the UserResponse.");
    });
};
exports.findAll = (req, res) => {
  UserResponse.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving UserResponse.",
      });
    });
};
