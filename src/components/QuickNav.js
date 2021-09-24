import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";

const styles = makeStyles(() => ({
  background: {
  margin: "30px",
  float: "left",
  left: 30,
  backgroundColor: "brown",
  height: "fitContent",
  width: "200px",
  },
  navLinks: {
    marginLeft: "25px",
    color: "white",
    margin: "10px"
  }
}));

const QuickNav = (props) => {
  const classes = styles();
  const jumps = props.currentPage.jumps || [];

  return (
    <div className={classes.background}>
      {
        jumps.map((jump) => {
          return <div key={jump} className={classes.navLinks}>{jump} </div>
        })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(QuickNav);
