import defaultConfig from "../config/default.json";

function configPath() {
    return process.env.CONFIG_URL || '';
}

export async function getConfig() {
    if (!configPath()) {
        return defaultConfig;
    }
    try {
        const response = await fetch(configPath());
        const config = await response.json();
        return { ...defaultConfig, ...config };
    } catch (error) {
        console.log("Unable to fetch config url configured as: " + configPath());
        return defaultConfig;
    }
}

export function getJsonPage(json, id) {
    let pageJson = json.page.find(page => page.id === id)
    if (pageJson === undefined) {
        return defaultConfig.page.find(page => page.id === id)
    }
    return pageJson;
}

export function getValue(json, value) {
    let key = getValueFromJson(json, value);
    if (key === "NA") {
        return getValueFromJson(defaultConfig, value);
    }
    return key;
}

export function getValueFromJson(json, key) {
    const keys = key.split('.');  // Split the key by '.' to handle nested keys
    let result = json;

    for (let i = 0; i < keys.length; i++) {
        if (result && result.hasOwnProperty(keys[i])) {
            result = result[keys[i]];  // Move to the next level in the object
        } else {
            return "NA"
        }
    }
    return result;
}
