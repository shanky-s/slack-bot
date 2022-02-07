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

  res.statusCode = 200;
  if (req.body && req.body.command === "/bot") {
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
  }

  const { payload } = req.body;
  console.log(payload);
  if (payload) {
    userResponses.create(payload);
  } else {
    res.statusCode = 400;
    res.send();
  }
  const { callback_id } = payload;
  if (callback_id === "mood_selection") {
    res.send({
      text: "What are your favorite hobbies?",
      response_type: "in_channel",
      attachments: [
        {
          fallback: "If you could read this message, you'd be choosing something fun to do right now.",
          color: "#4E5b31",
          attachment_type: "default",
          callback_id: "hobby_selection",
          actions: [
            {
              name: "hobby_list",
              type: "select",
              options: [
                {
                  text: "Football",
                  value: "football",
                },
                {
                  text: "Music",
                  value: "music",
                },
                {
                  text: "Sleep",
                  value: "sleep",
                },
                {
                  text: "Movies",
                  value: "movies",
                },
                {
                  text: "Basketball",
                  value: "basketball",
                },
              ],
            },
          ],
        },
      ],
    });
  }
});

module.exports = router;
