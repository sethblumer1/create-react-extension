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
        console.log(data)
        response({ data, error });
    } else if (action === 'getSession') {
        try {
            const sessionData = await supabase.auth.getSession();
            console.log(sessionData)
            // Process sessionData as needed
            response({ data: sessionData });
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