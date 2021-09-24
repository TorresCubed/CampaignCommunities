import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useCallback, useState } from "react";
import Editor from "./Editor";

const styles = makeStyles(() => ({
  container:{
    padding: 10
  },
  content: {
    color: "white",
  },
  break: {
    border: "1px solid maroon"
  },
  editor: {
    backgroundColor: "white",
  }
}));


const defaultData = () => {
  return {
    "time": new Date().getTime,
    "blocks": [
      {
        "type": "paragraph",
        "data": {
          "text": "This is the start of my Editor",
          "level":1
        }
      },
    ]
  }
}

const Content = (props) => {
  const classes = styles();
  const title = props.currentPage.title;
  const [editing, toggleEditing] = useState(false);
  const [editorData, setEditorData] = useState(defaultData);

  const handleChange = useCallback((newData) => {
    setEditorData(newData);
    console.log("changed data")
  }, []);

  const toggleEdit = (event) => {
    event.preventDefault();
    toggleEditing(!editing);
  }


  return (
    <div className={classes.container}>
      <button onClick={toggleEdit}>Edit Page</button>
      {editing && 
      <div>
          <Editor data={editorData} saveData={handleChange}/>
      </div>
      }
      {!editing &&
        <div>
            <h1> {title} </h1>
            <hr className={classes.break}/>
            <p className={classes.content}>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. WhThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            </p>
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

export default connect(mapStateToProps)(Content);
