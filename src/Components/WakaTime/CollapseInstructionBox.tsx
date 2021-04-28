import React, { FunctionComponent, useState, createRef } from 'react';
import deepmerge from 'deepmerge';
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CollapseableInstruction = (): any => {
  const containerRef = createRef();
  const [isOpen, setIsOpen] = useState(false);
  const collapsedBoxClass = 'isClosed';
  const openBoxClass = 'isOpen';

  const toggleCollapsableBox = () => {
    setIsOpen(!isOpen);
  };

  const normalStyles = {
    transition: 'all .3s linear',
  };

  const turnedStyles = deepmerge({ transform: 'rotate(90deg)' }, normalStyles);

  return (
    <Box mb={2}>
      <Flex cursor="pointer" onClick={() => toggleCollapsableBox()} alignItems="flex-start">
        <Heading fontSize={'2xl'} mb={5}>
          Instructions For Adding WakaTime!
        </Heading>
        <Box ml={2} mt={1} style={isOpen ? turnedStyles : normalStyles}>
          <FontAwesomeIcon icon={faChevronRight} size={'1x'} />
        </Box>
      </Flex>
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
              For Date Range, select <code>any date range</code>
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
