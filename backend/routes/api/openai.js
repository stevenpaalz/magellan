const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const { openAIKey } = require('../../config/keys');

const configuration = new Configuration({
    apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(city, state, themeArray, numCheckpoints) {
    const themeString = themeArray.join(", ");
    return `Create a scavenger hunt in ${city}, ${state}. Return your response as ${numCheckpoints} list items. This scavenger hunt should enable the user to explore that city. The scavenger hunt should include the following themes: ${themeString}. Do not label each returned item by theme.`;
}

router.post("/", async (req, res, next) => {
    if (!configuration.apiKey) {
        const err = new Error("AI Error");
        err.statusCode = 500;
        const errors = {};
        errors.openai = "OpenAI API key not configured"
        err.errors = errors;
        return next(err);
    }

    if (!req.body.city) {
        const err = new Error("AI Error");
        err.statusCode = 400;
        const errors = {};
        errors.openai = "Please enter a valid city"
        err.errors = errors;
        return next(err);
    }

    try {
        const prompt = generatePrompt(req.body.city, req.body.state, req.body.themeArray, req.body.numCheckpoints);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful assistant that creates scavenger hunts. Only include the numbered list items in your response. All items should generally meet the provided themes, each prompt should not be labeled with a theme."},
                {"role": "user", "content": prompt},
            ],
            temperature: 0.5,
        });
        return res.json(completion.data);
    } catch(err) {
        next(err);
    }
});

module.exports = router;