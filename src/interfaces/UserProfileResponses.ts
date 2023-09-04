import {UserProfile} from './UserProfile';

export interface UserProfileResponses {
  renderUserProfile: (userProfile: UserProfile | undefined) => void;
  setError: (error: Error) => void;
}
