import React from "react";



const TextDisplay = (props) => {
  const { data } = props;

  
  return (
    <div>
      {data?.blocks && data.blocks.map((block) => {
        const key = block.id;
        let Tag = "";
        switch (block.type) {
          case "paragraph":
            Tag = "p";
            break;
          case "header":
            Tag = "h"+block.data.level;
            break;
          case "delimiter":
            Tag = "br";
            break;
          default:
            Tag = "div";
            break;
        }
        return(<Tag key={`${key}`}>{block.data.text}</Tag>)
      })}

    </div>
  );
};


export default TextDisplay;
