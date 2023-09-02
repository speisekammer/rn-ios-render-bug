import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import React, {JSX} from 'react';
import {Section} from './Section';

export function UserProfile(): JSX.Element {
  const db = firestore();
  const [userProfile, loading, error] = useDocumentData(
    db.collection('users').doc('test-user'),
  );

  if (error) {
    return <Section title={'Error'}>Error: {error}</Section>;
  }
  if (loading) {
    return <Section title={'Loading'}>...</Section>;
  }
  return <Section title="User Profile">Name: {userProfile?.name}</Section>;
}
