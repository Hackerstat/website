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
} from '../../../node_modules/@chakra-ui/react';
import Router from 'next/router';
import Loader from '../../Components/Loader';
import WorkExperienceForm, { ExperienceFormFields } from '../../Components/Settings/Experience';
import AuthLayer from '../../Components/AuthLayer';
import Experience from '../../Components/Experience';
import { useFetchUser } from '../../utils/user';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * @name ExperienceSettings
 * @description It is a component that allows users to CRUD their work experience instances.
 * @author @Cgunter1 @LouisIV
 * @returns {FunctionComponent}
 */
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

  /**
   * @name onStartEditExperience
   * @description It is the function that sets up all needed variables for the pop up window to edit the specific work experience.
   * @author @LouisIV
   * @param {ExperienceFormFields} experience It is the set values for the specific work experience instance to be editted.
   * @param {number} index It is the index of the specific work experience instance that will be edited when the pop-up window is saved.
   * @returns {void}
   */
  const onStartEditExperience = (experience: ExperienceFormFields, index: number) => {
    setStartingValues(experience);
    setCurrentIndex(index);
    onOpen();
  };

  /**
   * @name onFinishEditExperience
   * @description It is the function that either updates the current work experience instance on the work experience UI or deletes it entirely.
   * @author @LouisIV @Cgunter1
   * @param {ExperienceFormFields} experience It is the edited/deleted specific work experience instance to be added to the component's UI.
   * @returns {void}
   */
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
  /**
   * @name onAddExperience
   * @description It is the function that adds the new work experience instance to the list of work experiences.
   * @author @LouisIV @Cgunter1
   * @param {ExperienceFormFields} experience It is the newly created specific work experience instance to be added to the component's UI.
   * @returns {void}
   */
  const onAddExperience = async (experience: ExperienceFormFields) => {
    setCurrentIndex(null);
    const newExperiences = experiences.slice();
    setExperiences([...newExperiences, experience]);
    onClose();
  };

  /**
   * @name openWorkExperienceModal
   * @description It is the function that puts up the workExperienceModal.
   * @author @LouisIV @Cgunter1
   * @returns {void}
   */
  const openWorkExperienceModal = () => {
    setCurrentIndex(null);
    onOpen();
  };

  /**
   * @name deletedWorkExperience
   * @description It is the function that removes the work experience instance from the Work Experience UI List.
   * @author @Cgunter1
   * @returns {void}
   */
  const deletedWorkExperience = () => {
    const newExperiences = experiences.slice();
    newExperiences.splice(currentIndex, 1);
    setExperiences(newExperiences);
    setCurrentIndex(null);
    onClose();
  };

  return (
    <AuthLayer>
      <Flex flexDirection={'column'} width={'100%'}>
        <Flex maxWidth="100%" justifyContent="flex-end">
          <Button onClick={openWorkExperienceModal} leftIcon={<FontAwesomeIcon icon={faPlus} />} alignSelf={'flex-end'}>
            Add Experience
          </Button>
        </Flex>
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
