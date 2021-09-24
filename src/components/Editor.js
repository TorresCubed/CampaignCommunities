import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import React, { useEffect, useRef } from "react";



const EDITOR_HOLDER_ID = "editorjs";

const Editor = (props) => {
  const editorInstance = useRef();
  const {data, saveData} = props;
  
  useEffect(() => {
    if(!editorInstance.current) {
      initateEditor();
    }
    return () => {
      editorInstance.current.destroy();
      editorInstance.current=null;
    }
  }, []);


  const handleChange = async (editor) => {
    console.log("changing")
    let content = await editor.save();
    saveData(content)
  }

  const initateEditor = () => {
    const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: data,
        onReady: () => {
          editorInstance.current = editor;
        },
        placeholder: "Design your tale!",
        tools: {
          header: Header,
        },
        onChange: () => {
          handleChange(editor);
        }
    });
  };
  
  
  return (
    <React.Fragment>
      <div className="editor" id={EDITOR_HOLDER_ID}/>
    </React.Fragment>
  );
};


export default Editor;
