import React from "react";



const TextDisplay = (props) => {
  const { data, headerJumps } = props;

  
  return (
    <div>
      {data?.blocks && data.blocks.map((block) => {
        const key = block.id;
        let Tag = "";
        switch (block.type) {
          case "paragraph":
            return(<p key={`${key}`}>{block.data.text}</p>)
          case "header":
            Tag = "h"+block.data.level;
            const jumpRef = (element) => (headerJumps.current[key] = element)
            return(<Tag ref={jumpRef} key={`${key}`}>{block.data.text}</Tag>)
          case "lineBreak":
            return (<hr key={`${key}`}></hr>)
          // case "list":
          //   if(data.items.style === "ordered"){

          //   }
          //   return (<div></div>)
          // case "checklist":
          //   return (<div></div>)
          // case "table":
          //   return (<div></div>)
          // case "quote":
          //   return (<div></div>)
          default:
            return(<div key={`${key}`}>{block.data.text}</div>)
        }
      })}

    </div>
  );
};


export default TextDisplay;
