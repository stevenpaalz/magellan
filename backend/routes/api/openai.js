// import { Configuration, OpenAIApi } from "openai";
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const { openAIKey} = require('../../config/keys');

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

function generatePrompt(city, state, themeArray, numCheckpoints) {
    const themeString = themeArray.join(", ");
    return `Create a scavenger hunt in ${city}, ${state}. This scavenger hunt should enable the user to explore that city. It should include ${numCheckpoints} items. The scavenger hunt should include the following themes: ${themeString}`;
}

router.get("/", async (req, res, next) => {
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
                {"role": "system", "content": "You are a helpful assistant that creates scavenger hunts. Return responses as a numbered list of items in the scavenger hunt."},
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