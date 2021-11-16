import { makeStyles } from "@material-ui/core/styles"
import { useCallback, useEffect, useRef, useState } from "react";
import QuickNav from "../pageContents/QuickNav";
import PertInfo from "../pageContents/PertInfo";
import Content from "../pageContents/Content";
import { fetchPageContent, backUpPage } from "../../store/utils/ThunkCreator";
import { connect } from "react-redux";

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
  pertInfo: {
    zIndex: 10000
  },
}));

const PageContent = (props) => {
  const classes = styles();
  const { fetchPageContent } = props;
  const { currentPage } = props;
  const [editing, toggleEditing] = useState(false);
  const headerJumps = useRef({});

  const handleClick = useCallback((event) => {
    event.preventDefault();
    if(editing) {
      const reqBody = {
        campaign: 1,
        page: currentPage.page,
        textContent: currentPage.textContent,
        pertInfo: currentPage.pertInfo
      }
      backUpPage(reqBody)
    }
    toggleEditing(!editing);
  }, [currentPage, editing])



  useEffect(() => { 
    fetchPageContent();
  }, [fetchPageContent]); 
    

  return (
    <div className={classes.container}>
      <button onClick={handleClick}>{editing? "Save Page" : "Edit Page"}</button>
      <PertInfo editing={editing} className={classes.pertInfo}/>
      {(currentPage.jumps.length > 0) && 
        <QuickNav headerJumps={headerJumps} editing={editing}/>
      }
      <Content headerJumps={headerJumps} editing={editing} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPageContent: () => {
      dispatch(fetchPageContent());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContent);

