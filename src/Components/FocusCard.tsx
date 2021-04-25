import React, { FunctionComponent } from 'react';
import Card from './Card';

const FocusCard: FunctionComponent = ({ children }) => {
  return (
    <Card borderRadius={'lg'} padding={2} minW={['sm', 'md']} maxW={'lg'} width={'100%'}>
      {children}
    </Card>
  );
};

export default FocusCard;
