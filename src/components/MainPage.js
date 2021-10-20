
import Page from "./Page";
import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
    color: "white",
    backgroundColor: "#282c40"
  }
}));

const MainPage = (props) => {
  const classes = styles();


  return (
    <div className = {classes.root}>
      <Page/>
    </div>
  );

};

export default MainPage;
