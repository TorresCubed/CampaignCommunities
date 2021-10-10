import EditorJS from "@editorjs/editorjs";
import Undo from "editorjs-undo";
import DragDrop from "editorjs-drag-drop";
import React, { useEffect, useRef } from "react";
import { EDITOR_JS_TOOLS } from "./Tools";



const Editor = (props) => {
  const editorInstance = useRef();
  const {editorPackage} = props;

  
  useEffect(() => { 
    if(!editorInstance.current) {
      const editor = new EditorJS({
          holder: editorPackage.editorName,
          autofocus: true,
          data: editorPackage.data,
          onReady: () => {
            editorInstance.current = editor;
            const undo = new Undo({ editor });
            new DragDrop(editor)
            undo.initialize(editorPackage.data);
          },
          placeholder: "Design your tale!",
          tools: EDITOR_JS_TOOLS,
          onChange: () => {
            handleChange(editor)
          }
      });
    }
    
    const handleChange = async (editor) => {
      const content = await editor.save();
      editorPackage.update(content);
    }

    return () => {
      editorInstance.current.destroy();
      editorInstance.current=null;
    }
  }, [editorPackage]);  
  
  return (
    <React.Fragment>
      <div id={editorPackage.editorName}/>
    </React.Fragment>
  );
};



export default Editor;
