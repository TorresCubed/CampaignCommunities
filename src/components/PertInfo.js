import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";

const styles = makeStyles(() => ({
  background: {
  height: "fitContent",
  width: "200px",
  margin: "30px",
  padding: "10px",
  backgroundColor: "darkgray",
  float: "right",
  },
  pageInfo: {
    marginLeft: "25px",
    margin: "10px"
  }
}));

const PertInfo = (props) => {
  const classes = styles();
  const info = props.currentPage.info;
  const imgExists = props?.currentPage.image;


  return (
    <div className={classes.background}>
      <div>
        {imgExists && <div/>}
      </div>
      {
        Object.entries(info).map(([key, val]) => 
          <div className={classes.pageInfo} key={key}>{key + ": " + val} </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(PertInfo);
