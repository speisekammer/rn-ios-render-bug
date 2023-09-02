import React, {JSX} from 'react';
import {Section} from './Section';
import {useUserProfile} from './useUserProfile';

export function UserProfile(): JSX.Element {
  const [userProfile, loading, error] = useUserProfile('test-user');

  if (error) {
    return <Section title={'Error'}>Error: {error}</Section>;
  }
  if (loading) {
    return <Section title={'Loading'}>...</Section>;
  }
  return <Section title="User Profile">Name: {userProfile?.name}</Section>;
}
