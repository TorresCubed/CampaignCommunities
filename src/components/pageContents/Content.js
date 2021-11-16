import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Editor from "./Editor";
import TextDisplay from "./TextDisplay";
import { updatePageData } from "../../store/currentPage";
import "./content.css"

const styles = makeStyles(() => ({
  container:{
    padding: 5,
    position: "sticky"
  },
}));


const Content = (props) => {
  const classes = styles();
  const { currentPage, editing, updatePageData, headerJumps } = props;
  const { textContent } = currentPage;
  const editorPackage  = {
    data: textContent,
    editorName: "mainContent",
    update: updatePageData
  }


  return (
    <div className={classes.container}>
      <h1>{currentPage.page}</h1>
      {editing ? 
        <div className="container">
            <Editor editorPackage={editorPackage}/>
        </div>
      :
        <div className="container">
          <TextDisplay data={textContent} headerJumps={headerJumps}/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageData: (pageData) => {
      dispatch(updatePageData(pageData));
    } 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);



// st transforms: transforms = {
//   delimiter: () => {
//     return `<br/>`;
//   },

//   header: ({ data }) => {
//     return `<h${data.level}>${data.text}</h${data.level}>`;
//   },

//   paragraph: ({ data }) => {
//     return `<p>${data.text}</p>`;
//   },

//   list: ({ data }) => {
//     const listStyle = data.style === "unordered" ? "ul" : "ol";

//     const recursor = (items: any, listStyle: string) => {
//       const list = items.map((item: any) => {
//         if (!item.content && !item.items) return `<li>${item}</li>`;

//         let list = "";
//         if (item.items) list = recursor(item.items, listStyle);
//         if (item.content) return `<li> ${item.content} </li>` + list;
//       });

//       return `<${listStyle}>${list.join("")}</${listStyle}>`;
//     };

//     return recursor(data.items, listStyle);
//   },

//   image: ({ data }) => {
//     let caption = data.caption ? data.caption : "Image";
//     return `<img src="${
//       data.file && data.file.url ? data.file.url : data.url
//     }" alt="${caption}" />`;
//   },

//   quote: ({ data }) => {
//     return `<blockquote>${data.text}</blockquote> - ${data.caption}`;
//   },

//   code: ({ data }) => {
//     return `<pre><code>${data.code}</code></pre>`;
//   },

//   embed: ({ data }) => {
//     switch (data.service) {
//       case "vimeo":
//         return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
//       case "youtube":
//         return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//       default:
//         throw new Error(
//           "Only Youtube and Vime Embeds are supported right now."
//         );
//     }
//   },
// };

