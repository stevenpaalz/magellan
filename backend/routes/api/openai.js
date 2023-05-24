import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

function generatePrompt(city, state, themeArray, numCheckpoints) {
    const themeString = themeArray.join(", ");
    return `Create a scavenger hunt in ${city}, ${state}. This scavenger hunt should enable the user to explore that city. It should include ${numCheckpoints} items. The scavenger hunt should include the following themes: ${themeString}`;
}

router.get("/", async (res, req) => {
    if (!configuration.apiKey) {
        res.status(500).json({
          error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
          }
        });
        return;
    }

    if (!req.body.city) {
        res.status(400).json({
            error: {
                message: "Please enter a valid city",
            }
        });
        return;
    }

    try {
        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(req.body.city, req.body.state, req.body.themeArray, req.body.numCheckpoints),
            temperature: 0.5
        })
    } catch(err) {
        next(err);
    }
});

module.exports = router;