import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react";
import { connect } from "react-redux";
import { Auth } from 'aws-amplify'
import { fetchPageContent } from "../../store/utils/ThunkCreator";
import { setCampaign } from "../../store/userAccess"
import { clearPage } from "../../store/currentPage"
import "./NavBar.css";

const styles = makeStyles(() => ({
  background: {
    backgroundColor: "black",
    minHeight: "45px",
    display: "flex",
  }, 
  searchContainer: {
    position: "relative",
  },
  campaignButtonContainer: {
    color: "white",
    cursor: "pointer",
    width: "70px",
    textAlign: "center"
  },
  homePageButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    textAlign: "center"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3px",
    paddingRight: "10px",
    paddingLeft: "10px",
    backgroundColor: "grey",
    border: "1px solid black"
  },
  searchBar: {
    border: "1px solid transparent",
    outline: "none",
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
    left: -1,
    right: -1,
  },
  campaignSelector:{
    width: "100%",
    height: "100%",
    color: "black",
    fontSize: "calc(8px + 2vmin)",
    backgroundColor: "white",
    border: "none",
    outline: "none",
    margin: 0,
    padding: 0,
    textAlign: "center",
  },
  campaignNames: {
    color: "black",
    fontSize: 16,
    position: "absolute",
    border: "1px solid black",
    zIndex: 99999,
    top: "98%",
    left: -2,
    right: -2,
  },
  navTitle: {
    position: "relative",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(8px + 2vmin)",
    color: "white",
    flexGrow: 1
  },
  
}));

const NavBar = (props) => {
  const classes = styles();
  const { userAccess, fetchPageContent, setCampaign, clearPage } = props;
  const { campaigns, currentCampaign } = userAccess;
  const { campaignName, pages } = 
    (currentCampaign!==null) ?
    campaigns[currentCampaign] : {campaignName:"Your Story Begins Here!", pages:[]};

  const [searching, setSearching] = useState(false);
  const [selectingCampaign, setSelectingCampaign] = useState(false);
  const [pageSearch, setPageSearch] = useState("");
  const [campaignSearch, setCampaignSearch] = useState("");

  const clearSearch = (event) => {
    event.preventDefault();
    setTimeout(setSearching, 100, false);
    setTimeout(setPageSearch, 100, "");
  }

  const clearCampaignSearch = (event) => {
    event.preventDefault();
    setTimeout(setSelectingCampaign, 100, false);
    setTimeout(setCampaignSearch, 100, "");
  }
  
  const handlePageText = (event) => {
    if(event.target.value === "") {
      setPageSearch("");
      setSearching(false);
      return;
    }
    setSearching(true);
    setPageSearch(event.target.value)
  }

  const handleCampaignText = (event) => {
    if(event.target.value === "") {
      setCampaignSearch("");
      setSelectingCampaign(false);
      return;
    }
    setSelectingCampaign(true);
    setCampaignSearch(event.target.value)
  }

  const showCampaignSearch = () => {
    if(userAccess?.campaigns){
      setSelectingCampaign(!selectingCampaign);
    }
  }

  const setHome = (event) => {
    setCampaign(null);
    clearPage(null);
  }

  const selectCampaign = (event) => {
    setCampaign(event.target.id)
    clearPage(event.target.id)
    setSelectingCampaign(!selectingCampaign);
  }

  const selectPage = (event) => {
    setSearching(false);
    setPageSearch("");
    fetchPageContent(currentCampaign, event.target.id)
  }

  const handleCampaignSubmit = (event) => {
    event.preventDefault();
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    await Auth.currentUserInfo();
    fetchPageContent(currentCampaign, pageSearch)
    setPageSearch("");
    setSearching(false);
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div 
        className={classes.homePageButton} 
        onClick={setHome}>
          <div>
            Home
          </div>
        </div>
      </div>
      <div className={classes.navTitle}>
          {selectingCampaign ? 
            <form onSubmit={handleCampaignSubmit} className={classes.campaignSelector}>
              <input 
              value={campaignSearch}
              onBlur={clearCampaignSearch}
              onChange={handleCampaignText} 
              type="text"
              autoFocus={true}
              className={classes.campaignSelector}
              placeholder={campaignName}/>
              <div className={classes.campaignNames}>
                {Object.entries(campaigns)
                .filter(([key, campaign]) => campaign.campaignName.toLowerCase().includes(campaignSearch.toLowerCase()))
                .map(([key, campaign]) => {
                    return <div 
                    onClick={selectCampaign}
                    className="items"
                    key={key}
                    id={key}>{campaign.campaignName}</div>
                  })
                }
                </div>
            </form>
            : campaignName
          }
      </div>
      <div className={classes.container}>
        <div 
        className={classes.campaignButtonContainer} 
        onClick={showCampaignSearch}>
          <div>
            Select Campaign
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          <form onSubmit={handlePageSubmit}>
          <input 
            value={pageSearch}
            placeholder="Page Search" 
            className={classes.searchBar} 
            onBlur={clearSearch}
            onChange={handlePageText} 
            type="text"/>
            {searching && 
              <div className={classes.searchItems}>
                {pages
                .filter((page) => page.toLowerCase().includes(pageSearch.toLowerCase()))
                .map((page,index) => {
                  return <div 
                  onClick={selectPage}
                  className="items"
                  key={index}
                  id={page}>{page}</div>
                })}
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPageContent: (campaignID, pageName) => {
      dispatch(fetchPageContent(campaignID, pageName));
    },
    setCampaign: (campaignID) => {
      dispatch(setCampaign(campaignID));
    },
    clearPage: (campaignId) => {
      dispatch(clearPage(campaignId));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userAccess: state.userAccess,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
