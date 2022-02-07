const express = require("express");
const router = express.Router();
const userResponses = require("../controller/user-responses.controller");

router.get("/", async function (req, res, next) {
  const moodsResponses = await userResponses.findByType("mood_selection");
  const hobbiesResponses = await userResponses.findByType("hobby_selection");
  res.render("index", {
    title: "User Responses",
    moodsHeader: "How are you doing?",
    hobbiesHeader: "What are your favorite hobbies?",
    moodsResponses,
    hobbiesResponses,
  });
});
router.delete("/", async function (req, res, next) {
  if (req.body.key === "29f7ea08-8a13-4cab-be19-2c25a6389a56") {
    const deleteResponse = await userResponses.deleteAll();
    res.statusCode = 200;
    res.send(deleteResponse);
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.post("/", async function (req, res, next) {
  console.log(req.body);

  if (req.body && req.body.command === "/bot") {
    if (req.body.text === "hello") {
      res.statusCode = 200;
      res.send({
        text: "Welcome. How are you doing?",
        response_type: "in_channel",
        replace_original: "false",
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
    } else {
      res.statusCode = 200;
      res.send({
        response_type: "in_channel",
        replace_original: "false",
        text: "Sorry, slash command, that didn't work. Please try again.",
      });
    }
  } else {
    res.statusCode = 200;
    const { payload } = req.body;
    if (!payload) {
      res.statusCode = 400;
      res.send({
        response_type: "in_channel",
        replace_original: "false",
        text: "Sorry, slash command, that didn't work. Please try again.",
      });
    }
    console.log(payload);

    const slackResPayload = JSON.parse(payload);
    const savedResponse = await userResponses.create(slackResPayload);
    console.log("saved data");
    console.log(savedResponse);

    const { callback_id } = slackResPayload;
    console.log(callback_id);
    if (callback_id === "mood_selection") {
      res.send({
        text: "What are your favorite hobbies?",
        response_type: "in_channel",
        replace_original: "false",
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
    if (callback_id === "hobby_selection") {
      res.send({
        response_type: "in_channel",
        text: "Thank You",
        replace_original: "false",
      });
    }
  }
});

module.exports = router;
