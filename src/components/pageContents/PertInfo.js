import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";
import { updateInfoData } from "../../store/currentPage";
import Editor from "./Editor";
import TextDisplay from "./TextDisplay";

const styles = makeStyles(() => ({
  background: {
    width: "200px",
    minHeight: "30px",
    margin: "30px",
    padding: "10px",
    backgroundColor: "darkgray",
    right: "20px",
    top: "60px",
    float: "right",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
    fontSize: "18px"
  }
}));

const PertInfo = (props) => {
  const classes = styles();
  const { editing, currentPage, updateInfoData } = props;
  const { pertInfo } = currentPage;
  const editorPackage = {
    data: pertInfo,
    editorName: "pertInfoContent",
    update: updateInfoData
  }
  
  return (
    <div className={classes.background}>
      <div className={classes.title}>
        {currentPage.page}
      </div>
      {editing ? 
        <div >
          <Editor editorPackage={editorPackage}/>
        </div>
      :
        <div >
          <TextDisplay data={pertInfo}/>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateInfoData: (infoData) => {
      dispatch(updateInfoData(infoData));
    } 
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(PertInfo);
