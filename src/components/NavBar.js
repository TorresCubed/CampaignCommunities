import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";

const styles = makeStyles(() => ({
  background: {
    backgroundColor: "#282c34",
    minHeight: "5vh",
    textAlign: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
    display: "flex",
    alignItems: "center",
  }, 
  searchBar: {
    minHeight: "25px",
    backgroundColor: "lightGray",
    float: "right",
    marginRight: "20px"
  },
  navTitle: {
    flexGrow: 1
  }
}));

const NavBar = (props) => {
  const classes = styles();
  const campaign = props.currentPage.campaign;

  return (
    <div className={classes.background}>
      <div className={classes.navTitle}>
        {campaign}
      </div>
      <input className={classes.searchBar} type="text"/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(NavBar);
