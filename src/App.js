import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import { Provider } from "react-redux";
import store from "./store";

// Amplify.configure({
//   API: {
//     endpoints: [
//       {
//         name: "campaignPageRetrieval-API",
//         endpoint: "https://ul99984gf3.execute-api.us-west-1.amazonaws.com/prodDynamo"
//       },
//     ]
//   }
// });


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
