import { useState } from "react";

const FolderComponent = ({
  handleDeleteNode,
  handleInsertNode,
  explorerData,
}) => {
  // ============= States =========================

  // state to control expansion of folders
  const [expandRoot, setExpandRoot] = useState(false);
  // state to control display of input box ...
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  // ============ Handlers =========================

  /* Handler to handle expanding of folder like dropdown */
  const handleExpandRoot = () => {
    console.log("<==========================>");
    console.log("handleExpandRoot Invoked");
    console.log("<==========================>");
    setExpandRoot(!expandRoot);
  };

  /* Handler to handle addition of File/Folder */
  const handleNewFileAndFolder = (e, isFolder) => {
    e.stopPropagation(); // so that we don't expand root div (cancel side effect of expandRoot)
    setExpandRoot(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  /* Handler to handle Blur Event for Input Field */
  const handleBlurEvent = () => {
    console.log("<==========================>");
    console.log("handleBlurEvent Invoked");
    console.log("<==========================>");
    // Onblur event occurs when an HTML element loses focus.
    setShowInput({ ...showInput, visible: false });
  };

  /* Handler to Delete Folder/File */
  const onAddFolder = (e) => {
    console.log("<==========================>");
    console.log("onAddFolder Invoked");
    console.log("Folder Name :", e.target.value);
    console.log("Folder Id:", explorerData.id);
    console.log("<==========================>");
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  /* Handler to Delete Folder/File */
  const onDeleteFolder = (e) => {
    console.log("onDeleteFolder Invoked");
    e.stopPropagation(); // stop even to expand folder div
    handleDeleteNode(explorerData.id, showInput.isFolder);
    setShowInput({ ...showInput, visible: false });
  };

  // ============= Render Logic ================

  if (explorerData.isFolder && !explorerData.isDeleted) {
    return (
      <div>
        <div className="folder" onClick={handleExpandRoot}>
          <span>🗂️ {explorerData.name}</span>
          {/* Folder | File | Delete Button */}
          <div className="button">
            <button onClick={(e) => handleNewFileAndFolder(e, true)}>
              🗂️+
            </button>
            <button onClick={(e) => handleNewFileAndFolder(e, false)}>
              📑+
            </button>
            <button onClick={(e) => onDeleteFolder(e)}>🗑️</button>
          </div>
        </div>

        <div
          style={{ display: expandRoot ? "block" : "none", paddingLeft: 25 }}
        >
          {/* Input Field Logic */}

          {showInput.visible && (
            <div className="inputContainer">
              <span style={{ padding: 2 }}>
                {showInput.isFolder ? "🗂️" : "📑"}
              </span>
              <input
                onKeyDown={(e) => onAddFolder(e)}
                className="inputfield"
                type="text"
                onBlur={handleBlurEvent}
                autoFocus
              ></input>
            </div>
          )}

          {/* Recursive Logic for Display Component */}

          {explorerData?.items?.map((item) => {
            return (
              <FolderComponent
                key={item.id}
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                explorerData={item}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (!explorerData.isFolder && !explorerData.isDeleted) {
    return (
      <div className="file">
        <span>{explorerData.name}</span>
        <button onClick={(e) => onDeleteFolder(e)}>🗑️</button>
      </div>
    );
  }
};

export default FolderComponent;
