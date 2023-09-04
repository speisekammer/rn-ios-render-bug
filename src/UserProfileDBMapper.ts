import {UserProfile} from './interfaces/UserProfile';
import {Deserializable} from './interfaces/Deserializable';

export class UserProfileDBMapper implements Deserializable<UserProfile> {
  deserialize(object: Record<string, any>): UserProfile {
    try {
      return {id: object.id, name: object.name};
    } catch (error) {
      const e = error as Error;
      console.error(e);
      throw e;
    }
  }
}
