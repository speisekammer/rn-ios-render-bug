import React, {JSX, useState} from 'react';
import {Section} from './Section';
import {useUserProfile} from './useUserProfile';
import {UserProfileFirestorePersistence} from './UserProfileFirestorePersistence';

export function UserProfileSection(): JSX.Element {
  const [userProfilePersistence] = useState(
    new UserProfileFirestorePersistence(),
  );

  const {value, loading, error} = useUserProfile(
    'test-user',
    userProfilePersistence,
  );

  const listening = userProfilePersistence.isListeningToUserProfile()
    ? 'true'
    : 'false';

  console.log(
    'userProfilePersistence',
    userProfilePersistence,
    'listening is:',
    listening,
  );

  if (error) {
    return <Section title={'Error'}>Error: {JSON.stringify(error)}</Section>;
  }
  if (loading) {
    return <Section title={'Loading'}>...</Section>;
  }
  return (
    <>
      <Section title="User Profile">Name: {value?.displayName}</Section>
      <Section title={'Persistence'}>
        {JSON.stringify(userProfilePersistence)}
      </Section>
      <Section title={'Listening'}>Listening is: {listening}</Section>
    </>
  );
}
