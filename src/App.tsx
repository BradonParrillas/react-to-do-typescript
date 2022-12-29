import "./styles/App.scss";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div className="App">
      <h1 className="title">To Do With React & TypeScript</h1>
      <div className="main-container">
        <ToDo />
      </div>
    </div>
  );
}

export default App;
