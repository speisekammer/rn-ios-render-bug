import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  UserProfilePersistenceGateway,
  UserProfileUpdateHandler,
} from './interfaces/UserProfilePersistenceGateway';
import {Unsubscribe} from './interfaces/types';
import {UserProfile} from './interfaces/UserProfile';
import {UserProfileDBMapper} from './UserProfileDBMapper';

export class UserProfileFirestorePersistence
  implements UserProfilePersistenceGateway
{
  private unsubscribeUserProfile: Unsubscribe | undefined;
  private readonly userProfileMapper = new UserProfileDBMapper();

  private deserializeUserProfile(
    snap: FirebaseFirestoreTypes.DocumentSnapshot,
  ): UserProfile {
    return this.userProfileMapper.deserialize({...snap.data(), id: snap.id});
  }
  stopListeningToUserProfile(): void {
    if (this.unsubscribeUserProfile !== undefined) {
      this.unsubscribeUserProfile();
    }
  }

  private getUserProfileRef(
    userId: string,
  ): FirebaseFirestoreTypes.DocumentReference {
    const colRef = this.getCollectionReference();
    return colRef.doc(userId);
  }

  listenToUserProfile(
    userId: string,
    updateHandler: UserProfileUpdateHandler,
  ): void {
    const docRef = this.getUserProfileRef(userId);

    const onNext = (snapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
      const userProfile: UserProfile | undefined =
        this.deserializeUserProfile(snapshot);
      updateHandler(userProfile);
    };

    this.unsubscribeUserProfile = docRef.onSnapshot(onNext, console.error);
  }

  private getCollectionReference(): FirebaseFirestoreTypes.CollectionReference {
    const db = firebase.firestore();
    return db.collection('users');
  }

  isListeningToUserProfile(): boolean {
    return this.unsubscribeUserProfile != null;
  }
}
