import React, { useState, useEffect } from 'react';
import { Tree, ITreeNode } from '@blueprintjs/core';
import { FoldersTreeItem } from '../models/FoldersTreeItem';
import { callApi } from '../utils/viewHelpers';
import * as libraryApi from '../api/libraryApi';

const getTreeItems = (folders: FoldersTreeItem[]): ITreeNode<FoldersTreeItem>[] =>
  folders
    .sort((a, b) => b.date ? b.date.localeCompare(a.date || '') : -1)
    .map(f => {
      const childNodes = getTreeItems(f.subfolders);
      return { id: f.id, label: f.name, childNodes: childNodes.length ? childNodes : undefined , nodeData: f };
    });

const FoldersTree: React.FC = () => {

  const [items, setItems] = useState([] as ITreeNode<FoldersTreeItem>[]);

  useEffect(() => {
    async function fetchFolders(): Promise<void> {
      const folders = await callApi(libraryApi.fetchFoldersTree, []);
      const treeItems = getTreeItems(folders);
      setItems(treeItems);
    }

    fetchFolders();
  }, []);

  const forEachNode = (nodes: ITreeNode[], callback: (node: ITreeNode) => void): void => {
    nodes.forEach(n => {
      callback(n);
      if (n.childNodes) {
        forEachNode(n.childNodes, callback);
      }
    });
  }

  const handleNodeExpand = (node: ITreeNode): void => {
    node.isExpanded = true;
    setItems([...items]);
  };

  const handleNodeCollapse = (node: ITreeNode): void => {
    node.isExpanded = false;
    setItems([...items]);
  };

  const handleNodeClick = (node: ITreeNode): void => {
    forEachNode(items, n => n.isSelected = n === node);
    console.log(items);
    setItems([...items]);
  }

  const handleNodeDoubleClick = (node: ITreeNode): void => {
    node.isExpanded ? handleNodeCollapse(node) : handleNodeExpand(node);
  }

  return <Tree
    contents={items}
    onNodeExpand={handleNodeExpand}
    onNodeCollapse={handleNodeCollapse}
    onNodeClick={handleNodeClick}
    onNodeDoubleClick={handleNodeDoubleClick} />;
}

export default FoldersTree;