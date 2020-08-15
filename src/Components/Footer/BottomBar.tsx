import React, { FunctionComponent } from 'react';
import { Stack } from '@chakra-ui/core';
import { CopyrightNotice } from './Copyright-Notice';
import Link from '../Link';
import dynamic from 'next/dynamic';

const DynamicColorModePicker = dynamic(() => import('./Color-Mode-Choice').then((mod) => mod.ColorModePicker), {
  ssr: false,
});

const BOTTOM_BAR_COLOR = 'gray.500';

const BottomBarLink = ({ href, children, ...rest }) => (
  <Link href={href} {...rest} color={BOTTOM_BAR_COLOR}>
    {children}
  </Link>
);

const BottomBar: FunctionComponent = () => (
  <Stack isInline shouldWrapChildren spacing={8} my={3} alignItems={'center'}>
    <CopyrightNotice color={BOTTOM_BAR_COLOR} />
    <BottomBarLink href={'/terms-of-use'}>Terms</BottomBarLink>
    <BottomBarLink href={'/privacy-policy'}>Privacy</BottomBarLink>
    <DynamicColorModePicker />
  </Stack>
);

export { BottomBar };
