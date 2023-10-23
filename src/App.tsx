import './App.css';
import DateRangePicker from './components/DateRangePicker';

function App() {

  const onDateChanged = (date:Date) => {
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <DateRangePicker onDateChanged={onDateChanged}/>
      </header>
    </div>
  );
}

export default App;
