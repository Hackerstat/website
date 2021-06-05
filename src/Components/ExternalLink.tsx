import React, { FunctionComponent } from 'react';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

/**
 * A Chakra link specified as external
 */
const ExternalLink: FunctionComponent<Omit<ChakraLinkProps, 'isExternal'>> = ({ children, ...rest }) => (
  <ChakraLink isExternal={true} {...rest}>
    {children}
  </ChakraLink>
);

export default ExternalLink;
