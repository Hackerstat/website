import React, { FunctionComponent } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

interface ImagePieceListProps {
  children: JSX.Element | Array<JSX.Element>;
}

const ImagePieceList: FunctionComponent<ImagePieceListProps> = ({ children }) => (
  <Flex w="100%" justifyContent="center">
    <Grid
      justifyContent="center"
      width="100%"
      gap={10}
      rowGap={5}
      gridTemplateColumns={[
        'repeat(auto-fit, minmax(300px, max-content))',
        'repeat(auto-fit, minmax(380px, max-content))',
        'repeat(auto-fit, minmax(400px, max-content))',
      ]}
    >
      {children}
    </Grid>
  </Flex>
);

export default ImagePieceList;
