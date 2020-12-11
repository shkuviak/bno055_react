import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar/NavBar'
import SerialWrapper from './components/SerialWrapper'

function App() {
  return (
    <div className="App">
      <SerialWrapper/>
      <NavBar />
    </div>
  );
}

export default App;
