import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { atom, RecoilRoot } from 'recoil';
import { RelativeStax, TopStax } from './Stax';
import { atomBbox } from './atom_bbox';

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <RecoilRoot>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//   </RecoilRoot>
// )

const root = document.getElementById('root');
const stax = document.getElementById('stax');

// Can routing get any more stupid than this?
const relement = root ? root! : stax!;
const Routed = () => {
  if (root) {
    return <App />;
  } else {
    const staxAtom = atomBbox('stax-demo');
    return (
      <TopStax store={staxAtom}>
        <RelativeStax clicked={{}} store={staxAtom} />
      </TopStax>
    );
  }
}

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <Routed />
    </React.StrictMode>
  </RecoilRoot>,
  relement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
