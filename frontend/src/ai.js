import jwtFetch from "./store/jwt";

export const callAI = async (city, state, themeArray, numCheckpoints, temperature) => {
    const body = {"city": city, "state": state, "themeArray": themeArray, "numCheckpoints": numCheckpoints, "temperature": temperature};
    const res = await jwtFetch('/api/openai', {
        method: "POST",
        body: JSON.stringify(body)
    });
    return res.json()
}
