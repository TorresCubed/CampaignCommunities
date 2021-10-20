import EditorJS from "@editorjs/editorjs";
import Undo from "editorjs-undo";
import DragDrop from "editorjs-drag-drop";
import React, { useEffect, useRef } from "react";
import { EDITOR_JS_TOOLS } from "./Tools";



const Editor = (props) => {
  const editorInstance = useRef();
  const { editorPackage } = props;
  const { editorName, data, update } = editorPackage;

  const handleChange = async (editor) => {
    const content = await editor.save();
    update(content);
  }

  useEffect(() => { 
    if(!editorInstance.current) {
      const editor = new EditorJS({
          holder: editorName,
          autofocus: true,
          data: data,
          onReady: () => {
            editorInstance.current = editor;
            const undo = new Undo({ editor });
            new DragDrop(editor)
            undo.initialize(data);
          },
          placeholder: "Design your tale!",
          tools: EDITOR_JS_TOOLS,
          onChange: () => {
            handleChange(editor)
          }
      });
    }

    return () => {
      editorInstance.current.destroy();
      editorInstance.current=null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <React.Fragment>
      <div id={editorName}/>
    </React.Fragment>
  );
};



export default Editor;
