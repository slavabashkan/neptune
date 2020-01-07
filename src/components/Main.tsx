import React from 'react';
import SplitPane from 'react-split-pane';
import MainPanel from './MainPanel';
import MainContent from './MainContent';
import styles from './Main.module.scss';

const Main: React.FC = () => (
  <SplitPane className={`bp3-dark ${styles.main}`} defaultSize={300} minSize={100} maxSize={500}>
    <MainPanel />
    <MainContent />
  </SplitPane>
);

export default Main;
