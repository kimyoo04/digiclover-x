// modules
import {useNavigate, useParams} from "react-router-dom";
// Preview components
import DocuViewTiptap from "./DocuViewTiptap";
// styles
import {Overlay} from "./DocuViewStyle";

const Preview = () => {
  const navigate = useNavigate();
  let {id} = useParams();
  console.log(id);

  return (
    <>
      <Overlay
        onClick={() => navigate("/storage")}
        exit={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.2}}
      >
        <DocuViewTiptap isEditable={false} />;
      </Overlay>
    </>
  );
};

export default Preview;
