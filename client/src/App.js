import './App.css';
import React, {useState} from 'react';

function App() {
  const [state,setState] = useState('')
  const onClick = (e) => {
    setState('Clicked')
    console.log(e)
  }


  return (
    <div className="App">
    <button onClick={onClick}>Click me!</button>
    <div>{state}</div>
    </div>
  );
}

export default App;
