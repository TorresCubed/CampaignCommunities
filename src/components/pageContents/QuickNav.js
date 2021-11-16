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
    position: "relative",
    display: "block",
    zIndex: 9,
    cursor: "pointer",
    marginLeft: "25px",
    color: "white",
    margin: "10px"
  }
}));

const QuickNav = (props) => {
  const classes = styles();
  const { jumps, headerJumps, editing } = props;

  const handleClick = (event) => {
    if(editing){
      alert("Jumps are disabled during 'Editing Mode'")
      return;
    }
    const jumper = event.target.id;
    headerJumps.current[jumper].scrollIntoView({behavior: "smooth"});
  }

  return (
    <div className={classes.background}>
      {
        jumps.map((jump) => {
          return <li 
            onClick={handleClick}
            key={`${jump.id}`}
            id={jump.id}
            className={classes.navLinks}>
              {jump.text} 
          </li>
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
