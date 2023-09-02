import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';

export function useUserProfile(userId: string) {
  const db = firestore();
  const [userProfile, loading, error] = useDocumentData(
    db.collection('users').doc(userId),
  );

  return [userProfile, loading, error];
}
