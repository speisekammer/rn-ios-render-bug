import {UserProfileRequests} from './interfaces/UserProfileRequests';
import {
  UserProfilePersistenceGateway,
  UserProfileUpdateHandler,
} from './interfaces/UserProfilePersistenceGateway';
import {UserProfile} from './interfaces/UserProfile';
import {UserProfileResponses} from './interfaces/UserProfileResponses';
import {userProfileToRepresentation} from './UserProfileRepresentationMapper';

export class UserProfileUseCases implements UserProfileRequests {
  private readonly _userProfilePersistence: UserProfilePersistenceGateway;
  private readonly _userProfileResponses?: UserProfileResponses;

  constructor(
    userProfilePersistenceGateway: UserProfilePersistenceGateway,
    userProfileResponses: UserProfileResponses | undefined,
  ) {
    this._userProfilePersistence = userProfilePersistenceGateway;
    this._userProfileResponses = userProfileResponses;
  }

  listenToUserProfile(userId: string): void {
    const persistence = this.getUserProfilePersistence();
    const responses = this.getUserProfileResponses();

    const successHandler: UserProfileUpdateHandler = (
      userProfile: UserProfile | undefined,
    ) => {
      const userProfileOrUndefined =
        userProfile === undefined
          ? undefined
          : userProfileToRepresentation(userProfile);
      responses.renderUserProfile(userProfileOrUndefined);
    };

    persistence.listenToUserProfile(userId, successHandler, responses.setError);
  }

  stopListeningToUserProfile(): void {
    this.getUserProfilePersistence().stopListeningToUserProfile();
  }

  private getUserProfileResponses(): UserProfileResponses {
    if (this._userProfileResponses === undefined) {
      throw new Error('No userprofile responses set');
    }
    return this._userProfileResponses;
  }

  private getUserProfilePersistence(): UserProfilePersistenceGateway {
    if (this._userProfilePersistence === undefined) {
      throw new Error('No userprofile persistence provided');
    }
    return this._userProfilePersistence;
  }
}
