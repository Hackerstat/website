import React, { FunctionComponent, useState, createRef } from 'react';
import deepmerge from 'deepmerge';
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CollapseableInstructionProps {
  typeOfChartIsActivity: boolean;
}

/**
 * @name CollapseableInstruction
 * @description This component displays the instructions to retrieve the WakaTime URLs for integration.
 * @author @Cgunter1
 * @param {CollapseableInstructionProps} props It is the prop object of the component.
 * @param {boolean} props.typeOfChartIsActivity It is the boolean determines what instruction info to use. Either activity code chart or languages used chart.
 * @returns {FunctionComponent<CollapseableInstructionProps>}
 */
const CollapseableInstruction: FunctionComponent<CollapseableInstructionProps> = ({ typeOfChartIsActivity }) => {
  const containerRef = createRef();
  const [isOpen, setIsOpen] = useState(false);
  const collapsedBoxClass = 'isClosed';
  const openBoxClass = 'isOpen';

  const toggleCollapsableBox = () => {
    setIsOpen(!isOpen);
  };

  const normalStyles = {
    transition: 'all .2s linear',
  };

  const turnedStyles = deepmerge({ transform: 'rotate(90deg)' }, normalStyles);
  return (
    <Box mb={2}>
      <Flex cursor="pointer" onClick={() => toggleCollapsableBox()} alignItems="flex-start">
        <Heading fontSize={'2xl'} mb={5}>
          Instructions For{' '}
          {typeOfChartIsActivity ? 'Adding Your WakaTime Coding Activity!' : 'Adding Your WakaTime Languages!'}
        </Heading>
        <Box ml={2} mt={1} style={isOpen ? turnedStyles : normalStyles}>
          <FontAwesomeIcon icon={faChevronRight} size={'1x'} />
        </Box>
      </Flex>
      {/* TODO: Redo Animation Later. */}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
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
              For Chart Type, select <code>{typeOfChartIsActivity ? 'Coding Activity' : 'Languages'}</code>
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

export const CollapseableInstructionWrapper = React.memo(CollapseableInstruction);
