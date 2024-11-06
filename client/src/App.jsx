import "./App.css";
import TripLists from "./components/TripLists";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className="text-6xl text-primary mb-20 text-center">เที่ยวไหนดี</h1>
        <TripLists />
      </div>
    </div>
  );
}

export default App;
