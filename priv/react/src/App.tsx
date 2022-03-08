//import './App.css';
import Table from './components/CondidateTable/Table';
import { data as mockedData} from './components/CondidateTable/data';
import { useState } from 'react';

const App = () => {
  const [index, setIndex] = useState(3);
  
  const onClick = () => 
  {
    if(index < mockedData.length){
      setIndex(index+1)
      console.log('added new Con, with index: ', index);
    } else {
      console.log('all Con exist!!');
    }
  }
  
  return (
    <div className='App'>
      <button onClick={onClick}>
        Add new Condidate!
      </button>
      <Table 
        data={mockedData.slice(0, index)}
      />
    </div>
  );
}

export default App;