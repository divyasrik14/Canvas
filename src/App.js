import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import Graph from './components/NewGraph';
import TrialGraph from './components/TrialGraph';

function App() {
  return (
    <div className="App">
      <Table />
      {/* <Graph /> */}
      <TrialGraph />
    </div>
  );
}

export default App;
