import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Frame from 'react-frame-component';

const Main = () => {
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   console.log('Component mounted or open state changed');
  // }, [open]);

  return (
    <React.StrictMode>
      <Frame
        style={{
          position: 'fixed',
          top: '15%',
          right: open ? '0px' : '-20px',
          maxWidth: open ? '100%' : '82.5px',
          minHeight: open ? '400px' : 'max-content',
          border: 'none',
          padding: '10px',
          zIndex: 999,
        }}
        scrolling="no"
        head={[
          <link
            key="0"
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL('/react/index.css')}
          />,
        ]}
      >
        <App open={open} setOpen={setOpen} />
      </Frame>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
