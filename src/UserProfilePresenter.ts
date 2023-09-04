import {UserProfileResponses} from './interfaces/UserProfileResponses';
import {UserProfile} from './interfaces/UserProfile';

class UserProfilePresenter implements UserProfileResponses {
  setUserProfile: (userProfile: UserProfile | undefined) => void;
  setError: (error: Error) => void;

  constructor(
    setUserProfile: (userProfile: UserProfile | undefined) => void,
    setError: (error: Error) => void,
  ) {
    this.setUserProfile = setUserProfile;
    this.setError = setError;
  }

  renderUserProfile(userProfile: UserProfile | undefined): void {
    if (this.setUserProfile !== undefined) {
      this.setUserProfile(userProfile);
    } else {
      throw new Error('No setUserProfile function provided');
    }
  }
}

export {UserProfilePresenter};
