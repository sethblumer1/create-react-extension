import { supabase } from "./src/utils/supabaseClient";

type Message = {
    action: 'fetch' | 'getSession' | 'signout',
    value: null
} | {
    action: 'signup' | 'signin',
    value: {
        email: string,
        password: string,
    }
}

type ResponseCallback = (data: any) => void

async function handleMessage({ action, value }: Message, response: ResponseCallback) {
    if (action === 'signup') {
        const result = await supabase.auth.signUp(value)
        response({ message: 'Successfully signed up!', data: result });
    } else if (action === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword(value);
        if (data) {
            // Store session data
            chrome.storage.local.set({ 'sessionData': data });
        }
        response({ data, error });
    } else if (action === 'getSession') {
        try {
            // const sessionData = await supabase.auth.getSession();
            // response({ data: sessionData });
            chrome.storage.local.get('sessionData', (result) => {
                if (result.sessionData) {
                    response({ data: result.sessionData });
                } else {
                    response({ error: 'No session data found' });
                }
            });
        } catch (error) {
            // Handle any errors
            response({ error: error.message });
        }
    } else if (action === 'signout') {
        const { error } = await supabase.auth.signOut()
        response({ data: null, error });
    } else {
        response({ data: null, error: 'Unknown action' });
    }
}

// @ts-ignore
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    handleMessage(msg, response);
    return true;
})

// // decompress array buffer, turn to string, then parse as json
// function arrayBufferToJson(arrayBuffer) {
//     const jsonString = Pako.inflate(new Uint8Array(arrayBuffer), { to: 'string' });
//     try {
//         const json = JSON.parse(jsonString);
//         return json;
//     } catch (error) {
//         console.error("Parsing error:", error);
//         return null;
//     }
// }

// // To turn array buffer into json, because details.requestBody returns array buffer
// function arrayBufferToJson(arrayBuffer) {
//     // Step 1: Convert ArrayBuffer to String
//     const decoder = new TextDecoder("utf-8");
//     const jsonString = decoder.decode(arrayBuffer);
//     console.log("JSON String:", jsonString);

//     // A lot of the times the JSON is compressed? so we need to decompress it

//     // Step 2: Parse the String as JSON
//     try {
//         const json = JSON.parse(jsonString);
//         return json;
//     } catch (error) {
//         console.error("Parsing error:", error);
//         return null; // or handle the error as you see fit
//     }
// }


// // Network request logging
// chrome.webRequest.onBeforeRequest.addListener(
//     (details) => {
//         // console.log(details)
//         // if (details.requestBody && details.requestBody.raw && details.requestBody.raw.length > 0) {
//         //     const arrayBuffer = details.requestBody.raw[0].bytes;
//         //     if (arrayBuffer) {
//         //         const json = arrayBufferToJson(arrayBuffer);
//         //         console.log("Request JSON:", json);
//         //     }
//         // }

//         if (details.url.includes("https://www.linkedin.com/voyager/api/voyagerFeedDashSaveStates")) {
//             const reqBody = details.requestBody;
//             if (reqBody && reqBody.raw && reqBody.raw.length > 0) {
//                 const reqBodyArrayBuffer = reqBody.raw[0].bytes;
//                 // console.log(details.)
//                 // const reqBodyJson = arrayBufferToJson(reqBodyArrayBuffer);

//                 // if (reqBodyArrayBuffer) {
//                 //     const reqBodyJson = arrayBufferToJson(reqBodyArrayBuffer);
//                 //     console.log("Request JSON:", reqBodyJson);
//                 // }
//             }


//             // if (reqBody && reqBody.raw && reqBody.raw.length > 0) {
//             //     const arrayBuffer = reqBody.raw[0].bytes;
//             //     if (arrayBuffer) {
//             //         const json = arrayBufferToJson(arrayBuffer);
//             //         console.log("Request JSON:", json);
//             //     }
//             // }
//         }
//     },
//     { urls: ["<all_urls>"] },
//     ["requestBody", "requestHeaders"]
// );