import React, { FunctionComponent, useState, createRef } from 'react';
// import './component.css';
import {
  Box,
  // Input,
  // FormLabel,
  // FormControl,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/core';

export const CollapseableInstruction = (): any => {
  const containerRef = createRef();
  const [isOpen, setIsOpen] = useState(false);
  const collapsedBoxClass = 'isClosed';
  const openBoxClass = 'isOpen';

  const toggleCollapsableBox = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <Box mb={2}>
      <Heading onClick={() => toggleCollapsableBox()} cursor="pointer" fontSize={'2xl'} mb={5}>
        Instructions For Adding WakaTime!
      </Heading>
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        id="container"
        className={`${isOpen ? openBoxClass : collapsedBoxClass}`}
      >
        <Stack mt={2} fontSize="lg" spacing={4} as="ol">
          <Heading style={{ listStylePosition: 'inside' }} fontSize={'lg'}>
            <li>Login to your WakaTime account.</li>
          </Heading>
          <Heading style={{ listStylePosition: 'inside' }} fontSize={'lg'}>
            <li>
              Go to this{' '}
              <Link isExternal href="https://wakatime.com/share/embed">
                <strong>link</strong>
              </Link>
            </li>
          </Heading>
          <Heading style={{ listStylePosition: 'inside' }} fontSize={'lg'}>
            <li>
              For Format, select <code>JSON</code>
            </li>
          </Heading>
          <Heading style={{ listStylePosition: 'inside' }} fontSize={'lg'}>
            <li>
              For Chart Type, select <code>Coding Activity</code>
            </li>
          </Heading>
          <Heading style={{ listStylePosition: 'inside' }} fontSize={'lg'}>
            <li>
              For Date Range, select <code>Last 30 Days</code>
            </li>
          </Heading>
          <Heading style={{ listStylePosition: 'inside' }} fontSize={'lg'}>
            <li>
              Click the checkbox and click <code>Get Embeddable Code</code>
            </li>
          </Heading>
        </Stack>
      </div>
    </Box>
  );
};
