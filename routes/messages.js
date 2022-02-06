const express = require("express");
const router = express.Router();
const userResponses = require("../controller/user-responses.controller");

router.get("/", async function (req, res, next) {
  const data = await userResponses.findAll(req, res);
  res.render("index", {
    title: "User Responses",
    header: "User Responses",
    messages: data,
  });
});
router.post("/", function (req, res, next) {
  console.log(req.body);

  console.log(req.body.payload);
  userResponses.create(req.body.payload);
  res.statusCode = 200;
  res.send({
    text: "Welcome. How are you doing?",
    response_type: "in_channel",
    attachments: [
      {
        fallback: "If you could read this message, you'd be choosing something fun to do right now.",
        color: "#3AA3E3",
        attachment_type: "default",
        callback_id: "mood_selection",
        actions: [
          {
            name: "moods_list",
            type: "select",
            options: [
              {
                text: "Doing Well",
                value: "doing_well",
              },
              {
                text: "Neutral",
                value: "neutral",
              },
              {
                text: "Feeling Lucky",
                value: "feeling_lucky",
              },
            ],
          },
        ],
      },
    ],
  });
});

module.exports = router;
