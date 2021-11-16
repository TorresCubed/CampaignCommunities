import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react";
import { connect } from "react-redux";
import { createCampaign } from "../../store/utils/ThunkCreator";
import { v4 as uuidv4 } from "uuid";
import { Auth } from 'aws-amplify'

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
  popup:{
    position: "absolute",
    top: "50%",
    transform: "translate(-50%,-50%)",
    left: "50%",
    width: "200px",
    color: "black",
    textAlign:"center",
    backgroundColor: "white",
    border: "1px solid black",
    padding: "10px",
    borderRadius: "5px"
  },
  popupResponse: {
    margin: "5px",
    marginTop: "15px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  pertInfo: {
    zIndex: 10000
  },
}));

const HomePage = (props) => {
  const classes = styles();
  const { createCampaign, userAccess } = props;
  const [showSubmit, setShowSubmit] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [userName, setUserName] = useState("");


  const handleUserNameUpdate = (e) => {
    setUserName(e.target.value);
  }

  const handleCampaignNameUpdate = (e) => {
    setCampaignName(e.target.value);
  }

  const handlePopup = (e) => {
    e.preventDefault();
    setShowSubmit(true);
  }

  const popupYes = async (e) => {
    e.preventDefault();
    setShowSubmit(false);
    const campaignId = uuidv4();
    const userDetails = await Auth.currentUserInfo();
    const userId = userDetails.attributes.sub;
    const campaignData = {
      campaignName: campaignName,
      campaignId: campaignId,
      groupNotes: {
      },
      members: {
        [userId]: {
        name: userName,
        userType: "player",
        }
      }
    }
    createCampaign(userId,campaignData, userAccess);
  }


  return (
    <div className={classes.container}>
      <div>
        <form>
          <label htmlFor="campaignTitle">Create your campaign</label>
          <br/>
          <input onChange={handleCampaignNameUpdate} value={campaignName} type="text" id="campaignTitle"/>
          <br/>
          <label htmlFor="campaignUserName">What would you like to be called?</label>
          <br/>
          <input onChange={handleUserNameUpdate} value={userName} type="text" id="campaignTitle"/>
          <br/>
          <label htmlFor="creatorStatus">Your Role</label>
          <br/>
          <select name="role" id="creatorStatus">
            <option value="player">Player</option>
            <option value="dungeon Master">Dungeon Master</option>
          </select>
          <br/>
          <button onClick={handlePopup}> Create</button>
            {showSubmit &&
              <div className={classes.popup}>
                {`Are you sure you wish to create ${campaignName}, as ${userName}`}
                <br/> 
                <button onClick={popupYes} className={classes.popupResponse}>Yes</button>
                <button onClick={(e) => setShowSubmit(false)} className={classes.popupResponse}>No</button>
              </div>
            }
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCampaign: (campaignName, userName) => {
      dispatch(createCampaign(campaignName, userName));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userAccess: state.userAccess,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
