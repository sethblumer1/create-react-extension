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

const App = ({ open, setOpen }: AppProps) => {
  const toggleOpen = () => {
    // getSession();
    setOpen(!open);
  };

  const [session, setSession] = useState(null);

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
  useEffect(() => { }, [session]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the current window
      if (event.source !== window) return;

      const messageData = event.data as ExtensionData;
      if (messageData.type === "FROM_EXTENSION") {
        console.log("Data received from extension:", messageData.data);
        // Update state with the received data
        setReceivedData(messageData.data);
      }
    };

    window.addEventListener("message", handleMessage);

    // Clean up
    return () => {
      window.removeEventListener("message", handleMessage);
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
          src='https://i.ibb.co/5cmhvWw/airplane-icon.png'
          alt='logo'
          height={"40px"}
        />
        {/* Threadnote */}
      </button>
    );
  }

  return (
    <>
      {session ? (
        <>
          {receivedData && <Main jobTitle={receivedData.title} companyName={receivedData.company} companyUrl={receivedData.companyUrl} />}
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
