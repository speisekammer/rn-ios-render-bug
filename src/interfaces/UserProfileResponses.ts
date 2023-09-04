import {UserProfileRepresentation} from './UserProfileRepresentation';

export interface UserProfileResponses {
  renderUserProfile: (
    userProfile: UserProfileRepresentation | undefined,
  ) => void;
  setError: (error: Error) => void;
}
