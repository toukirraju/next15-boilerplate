import React from 'react';
import MantineWrapper from './MantineWrapper';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineWrapper>{children}</MantineWrapper>
  );
};

export default Providers;
