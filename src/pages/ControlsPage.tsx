import React from 'react';
import { useControls } from '../context/ControlsContext';
import ControlsList from '../components/controls/ControlsList';

const ControlsPage: React.FC = () => {
  const { controls } = useControls();

  return (
    <div>
      <ControlsList controls={controls} title="All Controls" />
    </div>
  );
};

export default ControlsPage;