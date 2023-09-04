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

  if (error) {
    return <Section title={'Error'}>Error: {JSON.stringify(error)}</Section>;
  }
  if (loading) {
    return <Section title={'Loading'}>...</Section>;
  }
  return <Section title="User Profile">Name: {value?.name}</Section>;
}
