import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Frame from 'react-frame-component'

const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.StrictMode>
      {/* <div style={{ position: "fixed", top: "20%", right: "0px", maxWidth: "100px" }}> */}
      <Frame
        style={{ position: "fixed", top: "15%", right: "-20px", maxWidth: "82.5px", maxHeight: "min-content", border: "none", padding: "10px" }}
        scrolling='no'
        head={[
          <link
            key='0'
            type='text/css'
            rel='stylesheet'
            href={chrome.runtime.getURL('/react/index.css')}
          />,
        ]}
      >
        <App open={open} setOpen={setOpen} />
      </Frame>
      {/* </div> */}
    </React.StrictMode>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

