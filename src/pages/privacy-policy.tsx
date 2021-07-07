import React, { FunctionComponent } from 'react';
import { Heading, Text, Box, VStack, UnorderedList, ListItem } from '@chakra-ui/react';
import {
  PRIVACY_INTRO,
  PRIVACY_INTERPRETATION,
  PRIVACY_DEFINITIONS,
  PRIVACY_PERSONAL_DATA_ITEMS,
  PRIVACY_USAGE_DATA,
  TRACKING_TECHNOLOGIES_AND_COOKIES,
  PRIVACY_TECH_AND_COOKIES,
  TRACKING_TECHNOLOGIES_AND_COOKIES_PURPOSES,
  USE_OF_YOUR_PRIVATE_DATA,
  USE_OF_YOUR_PRIVATE_DATA_PT2,
  RENTENTION_OF_YOUR_DATA,
  TRANSFER_OF_YOUR_PERSONAL_DATA,
  DISCLOSURE_OF_YOUR_PERSONAL_DATA,
  OTHER_LEGAL_REQS,
  CHILDRENS_PRIVACY,
  LINKS_TO_OTHER_WEBSITES,
  CHANGES_TO_THIS_PRIVACY_POLICY,
} from '../utils/constants';
import PageBase from '../Components/Page';

const listItemDisection = ([title, desc, url]: Array<string>) => (
  <React.Fragment key={title}>
    <ListItem>
      <strong>{`${title} `}</strong> {`${desc} `} <a href={url}>{url || ''}</a>
    </ListItem>
  </React.Fragment>
);

const personalDataItems = (title: string) => (
  <React.Fragment key={title}>
    <ListItem>{title}</ListItem>
  </React.Fragment>
);

const formatListOfParagraphs = (listOfText: Array<string>) =>
  listOfText.map((text) => (
    <React.Fragment key={text}>
      <Text fontSize="md">{text}</Text>
    </React.Fragment>
  ));

/**
 * Privacy
 * @author Cgunter1
 * @description This is the component that displays the Privacy page.
 * @redo This component will be completely redone as described here 'https://nextjs.org/blog/markdown'. Basically, transform MDX => React.
 * @returns {FunctionComponent}
 */
const Privacy: FunctionComponent = () => (
  <PageBase>
    <Box w={{ base: '100%', md: '70%' }}>
      <VStack alignItems="flex-start" textAlign="left" spacing={5}>
        <Heading>Privacy Policy</Heading>
        <VStack alignItems="flex-start" spacing={3}>
          <Text fontSize="md">Last updated: July 07, 2021</Text>
          <Text fontSize="md">{PRIVACY_INTRO}</Text>
        </VStack>
        <Heading>Interpretation and Definitions</Heading>
        <Heading fontSize="3xl">Interpretation</Heading>
        <Text fontSize="md">{PRIVACY_INTERPRETATION}</Text>
        <Heading fontSize="3xl">Definitions</Heading>
        <Text fontSize="md">For the purposes of this Privacy Policy:</Text>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {PRIVACY_DEFINITIONS.map((item: Array<string>) => listItemDisection(item))}
        </UnorderedList>
        <Heading>Collecting and Using Your Personal Data</Heading>
        <Heading fontSize="3xl">Types of Data Collected</Heading>
        <Heading fontSize="2xl">Personal Data</Heading>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {PRIVACY_PERSONAL_DATA_ITEMS.map((item: string) => personalDataItems(item))}
        </UnorderedList>
        <Heading fontSize="2xl">Usage Data</Heading>
        <Text fontSize="md">{PRIVACY_USAGE_DATA}</Text>
        <Heading fontSize="2xl">Tracking Technologies and Cookies</Heading>
        <Text fontSize="md">{TRACKING_TECHNOLOGIES_AND_COOKIES[0]}</Text>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {PRIVACY_TECH_AND_COOKIES.map((item: Array<string>) => listItemDisection(item))}
        </UnorderedList>
        <Text fontSize="md">{TRACKING_TECHNOLOGIES_AND_COOKIES[1]}</Text>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {TRACKING_TECHNOLOGIES_AND_COOKIES_PURPOSES.map((item: Array<string>) => listItemDisection(item))}
        </UnorderedList>
        <Text fontSize="md">{TRACKING_TECHNOLOGIES_AND_COOKIES[2]}</Text>
        <Heading fontSize="3xl">Use of Your Personal Data</Heading>
        <Text fontSize="md">The Company may use Personal Data for the following purposes:</Text>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {USE_OF_YOUR_PRIVATE_DATA.map((item: Array<string>) => listItemDisection(item))}
        </UnorderedList>
        <Text fontSize="md">We may share Your personal information in the following situations:</Text>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {USE_OF_YOUR_PRIVATE_DATA_PT2.map((item: Array<string>) => listItemDisection(item))}
        </UnorderedList>
        <Heading fontSize="3xl">Retention of Your Personal Data</Heading>
        <Text fontSize="md">{RENTENTION_OF_YOUR_DATA[0]}</Text>
        <Text fontSize="md">{RENTENTION_OF_YOUR_DATA[1]}</Text>
        <Heading fontSize="3xl">Transfer of Your Personal Data</Heading>
        {formatListOfParagraphs(TRANSFER_OF_YOUR_PERSONAL_DATA)}
        <Heading fontSize="3xl">Disclosure of Your Personal Data</Heading>
        <Heading fontSize="2xl">Business Transactions</Heading>
        <Text fontSize="md">{DISCLOSURE_OF_YOUR_PERSONAL_DATA[0]}</Text>
        <Heading fontSize="2xl">Law enforcement</Heading>
        <Text fontSize="md">{DISCLOSURE_OF_YOUR_PERSONAL_DATA[1]}</Text>
        <Heading fontSize="2xl">Other legal requirements</Heading>
        <Text fontSize="md">{DISCLOSURE_OF_YOUR_PERSONAL_DATA[2]}</Text>
        <UnorderedList pl={10} listStylePos="outside" spacing={5}>
          {OTHER_LEGAL_REQS.map((item: string) => personalDataItems(item))}
        </UnorderedList>
        <Heading fontSize="2xl">Security of Your Personal Data</Heading>
        <Text fontSize="md">{DISCLOSURE_OF_YOUR_PERSONAL_DATA[3]}</Text>
        <Heading fontSize="2xl">Children&apos;s Privacy</Heading>
        {formatListOfParagraphs(CHILDRENS_PRIVACY)}
        <Heading fontSize="2xl">Links to Other Websites</Heading>
        {formatListOfParagraphs(LINKS_TO_OTHER_WEBSITES)}
        <Heading fontSize="2xl">Changes to this Privacy Policy</Heading>
        {formatListOfParagraphs(CHANGES_TO_THIS_PRIVACY_POLICY)}
        <Heading fontSize="2xl">Contact Us</Heading>
        <Text fontSize="md">If you have any questions about this Privacy Policy, You can contact us:</Text>
        <UnorderedList pl={10}>
          <ListItem>
            By email: <a href="mailto:cinefiled@yahoo.com">cinefiled@yahoo.com</a>
          </ListItem>
        </UnorderedList>
      </VStack>
    </Box>
  </PageBase>
);
export default Privacy;
