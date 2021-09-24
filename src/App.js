import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import { Provider } from "react-redux";
import store from "./store";


function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <NavBar/>
      <MainPage/>
    </Provider>
    </div>
  );
}

export default App;
