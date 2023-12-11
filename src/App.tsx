import React, { useState, useEffect } from 'react';
import SignInForm from './components/SignIn';

interface AppProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SessionResponse {
  data: any; // Replace 'any' with a more specific type if you know the structure of your session data
  error?: string;
}

const App = ({ open, setOpen }: AppProps) => {
  const toggleOpen = () => setOpen(!open);
  const [session, setSession] = useState(null);

  const getSession = async (): Promise<SessionResponse> => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: 'getSession' }, (response: SessionResponse | undefined) => {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(response || { data: null });
        }
      });
    });
  };

  useEffect(() => {
    getSession()
      .then(response => {
        setSession(response.data); // Assuming response.data contains session info
      })
      .catch(error => {
        console.error('Error in getting session:', error);
      });
  }, [])

  // useEffect(() => {

  // }, [session])


  if (!open) {
    return (
      <button
        style={{ height: "100%", width: "100%", backgroundColor: '#D3D3D3', borderRadius: "8px", borderWidth: "0px", borderRight: "none", padding: "5px", paddingRight: "15px" }}
        onClick={toggleOpen}
      >
        {/* <img
          src='https://i.ibb.co/5cmhvWw/airplane-icon.png'
          alt='logo'
          height={"40px"}
        /> */}
        Threadnote
      </button>
    );
  }

  return (
    <>
      {session ? (<>Signed in</>) : (<><SignInForm open={open} setOpen={setOpen} />
        <button
          type="button"
          onClick={toggleOpen}
          aria-label="Back"
        >
          Back
        </button></>)}
    </>
  );
}

export default App;
