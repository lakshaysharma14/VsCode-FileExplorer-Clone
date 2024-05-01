import { useState } from "react";
import "./styles.css";
import explorer from "./data/folder.data";
import FolderComponent from "./components/FolderComponent";
import useTraverseTree from "./hooks/useTraverseTree";

export default function App() {
  // ============== State =================================

  /* Global Data For File Explorer */
  const [explorerData, setExplorerData] = useState(explorer);

  // ============== Custom Hooks ===============================

  /* Custom Hook to Handle Data Present in Form Of Tree Data Structure */
  const { insertNode, deleteNode } = useTraverseTree();

  // ============= Handlers =====================================

  /* Callback Handler to Insert New Folder */
  const handleInsertNode = (folderId, item, isFolder) => {
    console.log("<==========================>");
    console.log("handleInsertNode Invoked");
    console.log("FolderId:", folderId);
    console.log("Folder:", item);
    console.log("isFolder:", isFolder);
    console.log("<==========================>");
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  /* Callback Handler to Delete New Folder */
  const handleDeleteNode = (folderId, isFolder) => {
    console.log("<==========================>");
    console.log("handleDeleteNode Invoked");
    console.log("FolderId:", folderId);
    console.log("isFolder:", isFolder);
    const finalTree = deleteNode(explorerData, folderId, isFolder);
    setExplorerData(finalTree);
    console.log("Explorer Data After Deletetion:", explorerData);
    console.log("<==========================>");
  };

  return (
    <div className="App">
      <h1 className="mainheading"> File Explorer Clone </h1>
      <FolderComponent
        handleDeleteNode={handleDeleteNode}
        handleInsertNode={handleInsertNode}
        explorerData={explorerData}
      />
    </div>
  );
}
