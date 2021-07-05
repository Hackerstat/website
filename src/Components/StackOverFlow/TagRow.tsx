import React, { FunctionComponent } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { formatNums } from '../../utils/formatNums';
import { Tag } from '../../utils/utils';

interface TagRowProps {
  tag: Tag;
  backgroundColor: string;
}

// const formatNums = (num: number): string => {
//   const stringNum = `${num}`;
//   if (num < 1000) {
//     return stringNum;
//   }
//   const hundredsIndex = stringNum.length - 3;
//   const thousandsIndex = stringNum.length - 4;
//   return `${stringNum.slice(0, thousandsIndex + 1)}.${stringNum[hundredsIndex]}k`;
// };

export const TagRow: FunctionComponent<TagRowProps> = ({ tag, backgroundColor }) => (
  <Box p={1} borderWidth="1px" borderRadius={'lg'} backgroundColor={backgroundColor}>
    <Text as="h3" fontSize={['sm', 'md', 'lg']}>
      {tag.name}
    </Text>
    <Flex wrap="wrap" flexDirection="row" justifyContent="flex-start">
      <Text pr={2} as="h3" fontSize={'xs'} opacity={0.5} mt={2}>
        Question Score: {formatNums(tag.questionScore)}
      </Text>
      <Text as="h3" fontSize={'xs'} opacity={0.5} mt={2}>
        Answer Score: {formatNums(tag.answerScore)}
      </Text>
    </Flex>
  </Box>
);
