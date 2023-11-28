import React from 'react';
import './App.css';

interface AppProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const App = ({ open, setOpen }: AppProps) => {
  const toggleOpen = () => setOpen(!open);

  if (!open) {
    return (
      <button
        style={{ height: "100%", width: "100%", backgroundColor: '#D3D3D3', borderRadius: "8px", borderWidth: "0px", borderRight: "none", padding: "5px", paddingRight: "15px" }}
        onClick={toggleOpen}
      >
        <img
          src='https://i.ibb.co/5cmhvWw/airplane-icon.png'
          alt='logo'
          height={"40px"}
        />
      </button>
    );
  }

  return (
    <div>
      <button onClick={toggleOpen}>Close</button>
    </div>
  );
}

export default App;
