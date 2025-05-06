import "./App.css";
import { ViewContextProvier } from "./contexts";
import { Home } from "./pages/Home";

function App() {
  return (
    <ViewContextProvier>
      <Home />
    </ViewContextProvier>
  );
}

export default App;
