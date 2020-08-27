import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import SettingsPage from '../../Components/SettingsPage';
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stack,
} from '../../../node_modules/@chakra-ui/core';
import Loader from '../../Components/Loader';
import WorkExperienceForm, { ExperienceFormFields } from '../../Components/Settings/Experience';
import Experience from '../../Components/Experience';

function ExperienceSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startingValues, setStartingValues] = useState<ExperienceFormFields>();
  const [experiences, setExperiences] = useState<Array<ExperienceFormFields>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>();

  const onStartEditExperience = (experience: ExperienceFormFields, index: number) => {
    setStartingValues(experience);
    setCurrentIndex(index);
    onOpen();
  };

  const onFinishEditExperience = (experience: ExperienceFormFields) => {
    setExperiences([...experiences.slice(0, currentIndex), experience, ...experiences.slice(currentIndex + 1)]);
    setCurrentIndex(null);
    onClose();
  };

  const onAddExperience = (experience: ExperienceFormFields) => {
    alert(JSON.stringify(experience, null, 2));
    setCurrentIndex(null);
    setExperiences([...experiences, experience]);
    onClose();
  };

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      <Button onClick={onOpen} leftIcon="add" alignSelf={'flex-end'}>
        Add Experience
      </Button>
      <Stack shouldWrapChildren spacing={3} mt={3}>
        {!!experiences &&
          experiences.map((experience, index) => {
            return (
              <Experience
                key={`${experience.companyName}_${experience.position}`}
                {...experience}
                onEdit={() => {
                  onStartEditExperience(experience, index);
                }}
              />
            );
          })}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={'md'}>
          <ModalHeader>Add Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkExperienceForm
              onClose={currentIndex !== null ? onFinishEditExperience : onAddExperience}
              initialValues={startingValues}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

const WorkExperiencePage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <ExperienceSettings /> : <Loader />}</SettingsPage>;
};

export default WorkExperiencePage;
