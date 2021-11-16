import MainPage from './components/MainPage';
import { makeStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./store";
import Amplify from 'aws-amplify'
import awsconfig from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);


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
            <MainPage/>
        </Provider>
    </div>
  );
}

export default withAuthenticator(App, {
  includeGreetings: true,
});
