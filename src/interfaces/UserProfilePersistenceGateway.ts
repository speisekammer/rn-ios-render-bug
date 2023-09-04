import {UserProfile} from './UserProfile';

export type UserProfileUpdateHandler = (
  userProfile: UserProfile | undefined,
) => void;

export interface UserProfilePersistenceGateway {
  listenToUserProfile: (
    id: string,
    callback: UserProfileUpdateHandler,
    setError: (error: Error) => void,
  ) => void;
  isListeningToUserProfile: () => boolean;
  stopListeningToUserProfile: () => void;
}
