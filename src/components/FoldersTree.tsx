import { ITreeNode, Tree } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoldersTree, setCurrentFolder } from '../actions';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { FoldersTreeItem } from '../models/FoldersTreeItem';
import { RootState } from '../store/rootReducer';

const getTreeItems = (folders: FoldersTreeItem[]): ITreeNode<FoldersTreeItem>[] => (
  folders
    .sort((a, b) => (b.date ? b.date.localeCompare(a.date || '') : a.name.localeCompare(b.name)))
    .map(f => {
      const childNodes = getTreeItems(f.subfolders);
      return { id: f.id, label: f.name, childNodes: childNodes.length ? childNodes : undefined, nodeData: f };
    })
);

const FoldersTree: React.FC = () => {

  const { foldersTree } = useSelector<RootState, RootState>(state => state);
  const [items, setItems] = useState(getTreeItems(foldersTree));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoldersTree());
  }, [dispatch]);

  useUpdateEffect(() => {
    setItems(getTreeItems(foldersTree));
  }, [foldersTree]);

  const forEachNode = (nodes: ITreeNode[], callback: (node: ITreeNode) => void): void => {
    nodes.forEach(n => {
      callback(n);
      if (n.childNodes) {
        forEachNode(n.childNodes, callback);
      }
    });
  };

  const handleNodeExpand = (node: ITreeNode): void => {
    node.isExpanded = true;
    setItems([...items]);
  };

  const handleNodeCollapse = (node: ITreeNode): void => {
    node.isExpanded = false;
    setItems([...items]);
  };

  const handleNodeClick = (node: ITreeNode<FoldersTreeItem>): void => {
    forEachNode(items, n => { n.isSelected = n === node; });
    setItems([...items]);
    dispatch(setCurrentFolder(node.nodeData));
  };

  const handleNodeDoubleClick = (node: ITreeNode): void => {
    // eslint-disable-next-line no-unused-expressions
    node.isExpanded
      ? handleNodeCollapse(node)
      : handleNodeExpand(node);
  };

  return (
    <Tree
      contents={items}
      onNodeExpand={handleNodeExpand}
      onNodeCollapse={handleNodeCollapse}
      onNodeClick={handleNodeClick}
      onNodeDoubleClick={handleNodeDoubleClick}
    />
  );

};

export default FoldersTree;
