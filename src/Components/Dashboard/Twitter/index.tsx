import React, { useState, useEffect, FunctionComponent } from 'react';
import Card from '../../Card';
// import UserBadge from '../../UserBadge';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

interface TwitterCardProps {
  screenName: string;
}

/**
 * @name TwitterCard
 * @description It is a component that displays on a user's profile to show their Twitter account and current Tweets.
 * @author @compile10 @LouisIV
 * @param {TwitterCardProps} props It is the prop object of the component.
 * @param {string} props.screenName It is the Twitter username of the HackerStat user.
 * @returns {FunctionComponent<TwitterCardProps>}
 */
const TwitterCard: FunctionComponent<TwitterCardProps> = ({ screenName }) => {
  const [loaded, setLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  const onError = () => {
    console.log('Something went wrong');
    setIsHidden(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onError();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card mt={2} maxH={'lg'} height={'100%'} maxW={'lg'}>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={screenName}
        theme={'dark'}
        options={{ height: '32rem' }}
        onComplete={onLoad}
      />
    </Card>
  );
};

export default TwitterCard;
