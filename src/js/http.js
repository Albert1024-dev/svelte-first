import localData from "../config/data.json";
import { getValueFromJson } from "./config.js";

export async function postRequest(action, url, postData) {
    try {
        if (url === 'NA') {
            console.log('URL for endpoint ' + action + ' is not configured');
            let data = getValueFromJson(localData, action);
            return {
                ok: true,
                status: 200,
                statusText: "OK",
                json: async () => { return data; }
            };
        }
        console.log(
            "Sending post request to: " + url + " with data: " + JSON.stringify(postData)
        )
        return await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
    } catch (error) {
        console.error("Error during the fetch request:", error);
        throw error;
    }
}
