// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// // const response = await openai.listEngines();

// function generatePrompt(locationCity, locationState, themeArray, numCheckpoints) {
//     const themeString = themeArray.join(", ");
//     return `Create a scavenger hunt in ${locationCity}, ${locationState}. This scavenger hunt should enable the user to explore that city. It should include ${numCheckpoints} items. The scavenger hunt should include the following themes: ${themeString}`;
// }

// exports.queryOpenAI = async (locationCity, locationState, themeArray, numCheckpoints) => {
//     if (!configuration.apiKey) {
//         res.status(500).json({
//           error: {
//             message: "OpenAI API key not configured, please follow instructions in README.md",
//           }
//         });
//         return;
//     }


// }