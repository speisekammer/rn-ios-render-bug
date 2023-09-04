import {UserProfile} from './interfaces/UserProfile';
import {UserProfileRepresentation} from './interfaces/UserProfileRepresentation';

export const userProfileToRepresentation = (
  userProfile: UserProfile,
): UserProfileRepresentation => {
  if (userProfile === undefined || userProfile === null) {
    throw new Error('UserProfile is not defined, cannot map to representation');
  }
  return {id: userProfile.id, displayName: userProfile.name};
};

export const userProfileFromRepresentation = (
  userProfileRepresentation: UserProfileRepresentation,
): UserProfile => {
  if (userProfileRepresentation == null) {
    throw new Error(
      'ProductRepresentation is not defined, cannot convert to user profile',
    );
  }

  return {
    id: userProfileRepresentation.id,
    name: userProfileRepresentation.displayName,
  };
};
