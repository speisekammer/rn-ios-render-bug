import {UserProfileResponses} from './interfaces/UserProfileResponses';
import {UserProfileRepresentation} from './interfaces/UserProfileRepresentation';

class UserProfilePresenter implements UserProfileResponses {
  setUserProfile: (userProfile: UserProfileRepresentation | undefined) => void;
  setError: (error: Error) => void;

  constructor(
    setUserProfile: (
      userProfile: UserProfileRepresentation | undefined,
    ) => void,
    setError: (error: Error) => void,
  ) {
    this.setUserProfile = setUserProfile;
    this.setError = setError;
  }

  renderUserProfile(userProfile: UserProfileRepresentation | undefined): void {
    if (this.setUserProfile !== undefined) {
      this.setUserProfile(userProfile);
    } else {
      throw new Error('No setUserProfile function provided');
    }
  }
}

export {UserProfilePresenter};
