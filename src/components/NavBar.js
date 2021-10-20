import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react";
import { connect } from "react-redux";
import { fetchPageContent } from "../store/utils/ThunkCreator";
import "./NavBar.css";

const styles = makeStyles(() => ({
  background: {
    backgroundColor: "#282c34",
    minHeight: "45px",
    display: "flex",
    alignItems: "center",
  }, 
  searchContainer: {
    position: "relative",
    display: "inline-block",
    paddingRight: "10px",
  },
  searchBar: {
  border: "1px solid transparent",
  backgroundColor: "#f1f1f1",
  padding: "2px",
  fontSize: 16,
  },
  searchItems: {
    backgroundColor: "#d4d4d4",
    color: "black",
    fontSize: 16,
    position: "absolute",
    border: "1px solid black",
    zIndex: 99999,
    top: "100%",
    left: 0,
    right: 10,
  },
  navTitle: {
    textAlign: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
    flexGrow: 1
  }
}));

const NavBar = (props) => {
  const classes = styles();
  const { userAccess, fetchPageContent } = props;
  const { campaigns, currentCampaign } = userAccess;
  const { campaignName } = campaigns[currentCampaign];
  const { pages } = campaigns[currentCampaign];

  const [searching, setSearching] = useState(false);
  const [pageSearch, setPageSearch] = useState("");

  const handleChange = (event) => {
    if(event.target.value === "") {
      setPageSearch("");
      setSearching(false);
      return;
    }
    setSearching(true);
    setPageSearch(event.target.value)
  }

  const selectPage = (event) => {
    setSearching(false);
    setPageSearch(event.target.id);
  }

  const handleSubmit= (event) => {
    event.preventDefault()
    fetchPageContent(currentCampaign, pageSearch)
  }

  return (
    <div className={classes.background}>
      <div className={classes.navTitle}>
        {campaignName}
      </div>
      <div className={classes.searchContainer}>
        <form onSubmit={handleSubmit}>
        <input 
          value={pageSearch}
          placeholder="Search" 
          className={classes.searchBar} 
          onChange={handleChange} 
          type="text"/>
          {searching && 
            <div className={classes.searchItems}>
              {pages
              .filter((page) => page.toLowerCase().includes(pageSearch.toLowerCase()))
              .map((page) => {
                return <div 
                onClick={selectPage}
                className="items"
                key={page}
                id={page}>{page}</div>
              })}
            </div>
          }
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPageContent: (campaignID, pageName) => {
      dispatch(fetchPageContent(campaignID, pageName));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userAccess: state.userAccess
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
