import MainPage from './components/MainPage';
import { makeStyles } from "@material-ui/core/styles";
import NavBar from './components/NavBar';
import { Provider } from "react-redux";
import store from "./store";

const styles = makeStyles(() => ({
  app:{
    display: "flex",
    flexFlow: "column",
    minHeight: "100vh",
    height: "100%"
  },
}));


function App() {
  const classes = styles();


  return (
    <div className={classes.app}>
    <Provider store={store}>
      <NavBar/>
      <MainPage/>
    </Provider>
    </div>
  );
}

export default App;
