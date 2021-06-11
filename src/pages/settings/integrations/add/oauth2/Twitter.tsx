import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { NextRouter } from 'next/router';
import SettingsPage from '../../../../../Components/SettingsPage';
import AuthLayer from '../../../../../Components/AuthLayer';
import Loader from '../../../../../Components/Loader';
import { useRouter } from 'next/router';

interface TwitterAuthenticatorPropsType {
  router: NextRouter;
}
/**
 * @TODO:
 */
const TwitterAuthenticator = ({ router: router }: TwitterAuthenticatorPropsType) => {
  router;
  return <></>;
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthLayer>
      <SettingsPage>{mounted ? <TwitterAuthenticator router={router} /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
