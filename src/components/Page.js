import { makeStyles } from "@material-ui/core/styles"
import { useCallback, useEffect, useState } from "react";
import QuickNav from "./QuickNav";
import PertInfo from "./PertInfo";
import Content from "./Content";
import { fetchPageContent, backUpPage } from "../store/utils/ThunkCreator";
import { connect } from "react-redux";

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
  pertInfo: {
    zIndex: 10000
  },
}));

const Page = (props) => {
  const classes = styles();
  const { fetchPageContent } = props;
  const { currentPage } = props;
  const [editing, toggleEditing] = useState(false);

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
      <QuickNav/>
      <Content editing={editing} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Page);

