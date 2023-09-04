import {UserProfileUpdateHandler} from './UserProfilePersistenceGateway';

export interface UserProfileRequests {
  listenToUserProfile: (
    userId: string,
    callback: UserProfileUpdateHandler,
  ) => void;
  stopListeningToUserProfile: () => void;
}
