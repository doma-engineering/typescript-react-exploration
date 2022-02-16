import React from 'react';
import logo from './logo.svg';
import './App.css';
import atomInt from './atom_int';
import { useRecoilState } from 'recoil';
import AtomInt from './AtomInt';

function App() {
  const [_counter, setCounter] = useRecoilState(atomInt("demo-counter"));
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
          Learn React v{React.version}
        </a>
        <span>
          or just <button onClick={
            () => setCounter((c) => c + 1)
          }>boop</button> a counter.
        </span>
        <AtomInt uid="demo-counter" />
      </header>
    </div>
  );
}

export default App;
