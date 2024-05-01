// Custom Hook to Handle Traversal of Tree Like Explorer Data
const useTraverseTree = () => {
  // To Do : This can be optimized using DP ...
  function insertNode(originalTree, folderId, item, isFolder) {
    /* Base Case : Where Folder in which we need to insert new folder is Found and it's a Folder. */
    if (originalTree.id === folderId && originalTree.isFolder) {
      originalTree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return originalTree;
    }

    let latestNode = [];

    latestNode = originalTree.items.map((childTree) => {
      return insertNode(childTree, folderId, item, isFolder);
    });

    return { ...originalTree, items: latestNode };
  }

  function deleteNode(originalTree, folderId, isFolder) {
    console.log("deleteNode Invoked");
    console.log("folderId:", folderId);

    console.log(originalTree?.id);
    if (originalTree?.id === folderId) {
      console.log("Id:", originalTree.id);
      originalTree.isDeleted = true;
      console.log(originalTree);
      return originalTree;
    }

    // === Depth First Search ===
    let latestNode = [];

    latestNode = originalTree.items.map((childTree) => {
      return deleteNode(childTree, folderId, isFolder);
    });

    return { ...originalTree, items: latestNode };
  }

  // To Do : Implement updateNode Functionality
  return { insertNode, deleteNode };
};

export default useTraverseTree;
