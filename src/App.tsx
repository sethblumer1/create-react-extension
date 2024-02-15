import React, { useState, useEffect } from 'react';
import SignInForm from './components/SignIn';
import Main from './components/Main';

interface AppProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SessionResponse {
  data: any;
  error?: string;
}

interface ExtensionData {
  type: string;
  data: any;
}

interface UserMetadata {
  name: string;
}

interface IdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

interface Identity {
  created_at: string;
  email: string;
  id: string;
  identity_data: IdentityData;
  identity_id: string;
  last_sign_in_at: string;
  provider: string;
  updated_at: string;
  user_id: string;
}

interface User {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Identity[];
  last_sign_in_at: string;
  phone: string;
  recovery_sent_at: string;
  role: string;
  updated_at: string;
  user_metadata: UserMetadata;
}

export interface Session {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}

const App = ({ open, setOpen }: AppProps) => {
  const toggleOpen = () => {
    // getSession();
    setOpen(!open);
  };

  const [session, setSession] = useState<Session | null>(null);

  const [receivedData, setReceivedData] = useState<any>(null);

  const getSession = async () => {
    try {
      const response = await new Promise<SessionResponse>((resolve, reject) => {
        chrome.runtime.sendMessage({ action: 'getSession' }, (response) => {
          const err = chrome.runtime.lastError;
          if (err) {
            reject(new Error(err.message));
          } else if (
            response &&
            typeof response === 'object' &&
            'data' in response
          ) {
            // Type assertion to SessionResponse
            resolve(response as SessionResponse);
          } else {
            reject(new Error('Invalid response type'));
          }
        });
      });

      // console.log(response.data.session);
      setSession(response.data.session);
    } catch (error) {
      console.error('Error in getting session:', error);
    }
  };

  const signOut = async () => {
    chrome.runtime.sendMessage({ action: 'signout' });
    // After signing out, refresh the session state
    // const response = await getSession();
    // setSession(response.data);
    // setSession(null);
    getSession();
  };

  // Get session on load
  useEffect(() => {
    getSession();
  }, []);

  // Rerender once session changes
  useEffect(() => {}, [session]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the current window
      if (event.source !== window) return;

      const messageData = event.data as ExtensionData;
      if (messageData.type === 'FROM_EXTENSION') {
        console.log('Data received from extension:', messageData.data);
        // Update state with the received data
        setReceivedData(messageData.data);
      }
    };

    window.addEventListener('message', handleMessage);

    // Clean up
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!open) {
    return (
      <button
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#D3D3D3',
          borderRadius: '8px',
          borderWidth: '0px',
          borderRight: 'none',
          padding: '5px',
          paddingRight: '15px',
        }}
        onClick={toggleOpen}
      >
        <img
          src="https://i.ibb.co/5cmhvWw/airplane-icon.png"
          alt="logo"
          height={'40px'}
        />
        {/* Threadnote */}
      </button>
    );
  }

  return (
    <>
      {session ? (
        <>
          {receivedData && (
            <Main
              jobTitle={receivedData.title}
              companyName={receivedData.company}
              companyUrl={receivedData.companyUrl}
              userId={session.user.id}
              accessToken={session.access_token}
            />
          )}
          <button
            type="button"
            onClick={() => {
              signOut();
              toggleOpen();
            }}
            aria-label="Back"
          >
            Back
          </button>
        </>
      ) : (
        <>
          <SignInForm open={open} setOpen={setOpen} setSession={setSession} />
          <button type="button" onClick={toggleOpen} aria-label="Back">
            Back
          </button>
        </>
      )}
    </>
  );
};

export default App;
