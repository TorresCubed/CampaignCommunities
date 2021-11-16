import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
  pertInfo: {
    zIndex: 10000
  },
}));

const CampaignLanding = (props) => {
  const classes = styles();
  
  return (
    <div className={classes.container}>
      <div>
        <form>
          <label htmlFor="pageTitle">Page Title</label>
          <br/>
          <input type="text" id="pageTitle" > 
          </input>
          <br/>
          <input type="submit">
          </input>
        </form>
      </div>
    </div>
  );
};


export default CampaignLanding;

