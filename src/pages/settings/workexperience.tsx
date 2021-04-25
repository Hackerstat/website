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
import Router from 'next/router';
import Loader from '../../Components/Loader';
import WorkExperienceForm, { ExperienceFormFields } from '../../Components/Settings/Experience';
import AuthLayer from '../../Components/AuthLayer';
import Experience from '../../Components/Experience';
import { useFetchUser } from '../../utils/user';
import Axios from 'axios';

function ExperienceSettings() {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.replace('/');
  }

  useEffect(() => {
    Axios.get('/api/settings/workexperience')
      .then((res) => {
        setExperiences(res.data.workExperience || []);
      })
      .catch((e) => console.error(e));
  }, []);

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
    // Check if index is deleted. Experience will be an empty object.
    if (Object.keys(experience).length === 0) {
      deletedWorkExperience();
      return;
    }
    setExperiences([...experiences.slice(0, currentIndex), experience, ...experiences.slice(currentIndex + 1)]);

    setCurrentIndex(null);
    onClose();
  };

  const onAddExperience = async (experience: ExperienceFormFields) => {
    setCurrentIndex(null);
    const newExperiences = experiences.slice();
    setExperiences([...newExperiences, experience]);
    onClose();
  };

  const openWorkExperienceModal = () => {
    setCurrentIndex(null);
    onOpen();
  };

  const deletedWorkExperience = () => {
    const newExperiences = experiences.slice();
    newExperiences.splice(currentIndex, 1);
    setExperiences(newExperiences);
    setCurrentIndex(null);
    onClose();
  };

  console.log('dsadsads' + experiences);
  return (
    <AuthLayer>
      <Flex flexDirection={'column'} width={'100%'}>
        <Button onClick={openWorkExperienceModal} leftIcon="add" alignSelf={'flex-end'}>
          Add Experience
        </Button>
        <Stack shouldWrapChildren spacing={3} mt={3}>
          {!!experiences &&
            experiences.map((experience, index) => {
              return (
                <Experience
                  key={index}
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
            <ModalHeader>{typeof currentIndex === 'number' ? 'Edit' : 'Add'} Experience</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <WorkExperienceForm
                index={currentIndex}
                onClose={currentIndex !== null ? onFinishEditExperience : onAddExperience}
                initialValues={startingValues}
              />
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </AuthLayer>
  );
}

const WorkExperiencePage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setMounted(true);
    return () => abortController.abort();
  }, []);

  return <SettingsPage>{mounted ? <ExperienceSettings /> : <Loader />}</SettingsPage>;
};

export default WorkExperiencePage;
