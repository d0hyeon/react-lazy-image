import React from 'react';
import logo from './logo.svg';
import LazyImage from './components/LazyImage';
import styled from '@emotion/styled';
import './App.css';

const EXTERNAL_IMAGE_URL = 'https://post-phinf.pstatic.net/MjAxOTA3MTlfMTM0/MDAxNTYzNDk4NTE3NzU0.tvL2z9sOxFX7eBehHXVL_OUwEoXTOYk1PuNKdPIs8nYg.YTgEwPPWGviJW7WYXw_pI1Mm7_Hfl7zicZsyuVSvqtIg.JPEG/wm_ohmygirl_65155115_1022559894752809_7485844363776707140_n.jpg?type=w1200';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FullDiv/>
      <FullDiv/>
      <LazyImage src={EXTERNAL_IMAGE_URL} />
      <FullDiv/>
    </div>
  );
}

const FullDiv = styled.div`
  width: 100vw;
  height: 100vh;
`

export default App;
