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
  const { jumps } = props;

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
    jumps: state.currentPage.jumps
  }
}

export default connect(mapStateToProps)(QuickNav);
