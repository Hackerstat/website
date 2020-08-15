import React, { FunctionComponent } from 'react';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends Omit<ChakraLinkProps, 'href'>, Pick<NextLinkProps, 'href' | 'shallow' | 'prefetch'> {
  passHref?: boolean;
}

/**
 * A Chakra link wrapped by a Next.js link
 */
const Link: FunctionComponent<LinkProps> = ({
  /* Next Properties */
  href,
  passHref = true,
  shallow,
  prefetch,
  /* Chakra Properties */
  children,
  ...rest
}) => (
  <NextLink href={href} passHref={passHref} shallow={shallow} prefetch={prefetch}>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </NextLink>
);

export default Link;
