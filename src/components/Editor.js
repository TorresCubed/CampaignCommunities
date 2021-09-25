import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updatePageData } from "../store";



const EDITOR_HOLDER_ID = "editorjs";

const Editor = (props) => {
  const editorInstance = useRef();
  const {currentPage, updatePageData} = props;

  
  useEffect(() => { 
    if(!editorInstance.current) {
      console.log(currentPage.content)
      const editor = new EditorJS({
          holder: "editorjs",
          autofocus: true,
          data: currentPage.content,
          onReady: () => {
            editorInstance.current = editor;
          },
          placeholder: "Design your tale!",
          tools: {
            header: Header,
          },
          onChange: () => {
            handleChange(editor)
          }
      });
    }
    
    const handleChange = async (editor) => {
      const content = await editor.save();
      updatePageData(content);
    }

    return () => {
      editorInstance.current.destroy();
      editorInstance.current=null;
    }
  }, [currentPage.content, updatePageData]);



  
  
  return (
    <React.Fragment>
      <div className="editor" id={EDITOR_HOLDER_ID}/>
    </React.Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageData: (pageData) => {
      dispatch(updatePageData(pageData));
    } 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
