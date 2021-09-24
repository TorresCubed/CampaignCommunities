import { makeStyles } from "@material-ui/core/styles"
import QuickNav from "./QuickNav";
import PertInfo from "./PertInfo";
import Content from "./Content";

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
}));

const Page = (props) => {
  const classes = styles();

  return (
    <div className={classes.pageContainer}>
      <PertInfo/>
      <QuickNav/>
      <Content/>
      </div>
  );
};


export default  Page;
