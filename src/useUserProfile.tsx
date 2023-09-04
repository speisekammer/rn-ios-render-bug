import {useEffect, useRef, useState} from 'react';

import {useLoadingValue} from './helper/useLoadingValue';
import {UserProfilePersistenceGateway} from './interfaces/UserProfilePersistenceGateway';
import {UserProfileRequests} from './interfaces/UserProfileRequests';
import {UserProfileUseCases} from './UserProfileUseCases';
import {UserProfilePresenter} from './UserProfilePresenter';
import {UserProfileRepresentation} from './interfaces/UserProfileRepresentation';

export const useComparatorRef = <T,>(
  value: T | null | undefined,
  isEqual: (v1: T | null | undefined, v2: T | null | undefined) => boolean,
  onChange?: () => void,
): RefHook<T | null | undefined> => {
  const ref = useRef(value);
  useEffect(() => {
    if (!isEqual(value, ref.current)) {
      ref.current = value;
      if (onChange) {
        onChange();
      }
    }
  });
  return ref;
};

export type RefHook<T> = {
  current: T;
};

const isRefEqual = <T,>(
  v1: T | null | undefined,
  v2: T | null | undefined,
): boolean => {
  const bothNull: boolean = !v1 && !v2;
  const equal: boolean = Boolean(v1) && Boolean(v2) && v1 === v2;
  return bothNull || equal;
};

export const useIsRefEqual = <T,>(
  value: T | null | undefined,
  onChange?: () => void,
): RefHook<T | null | undefined> =>
  useComparatorRef(value, isRefEqual, onChange);

export interface CollectionReturnType<T> {
  value?: T;
  loading: boolean;
  error?: Error;
}
type UseUserProfileType = CollectionReturnType<UserProfileRepresentation>;

export const useUserProfile = (
  userId: string | undefined,
  userProfilePersistence: UserProfilePersistenceGateway | undefined,
): UseUserProfileType => {
  const {setValue, setError, value, loading, error, reset} = useLoadingValue<
    UserProfileRepresentation,
    Error
  >();

  // reset value and loading when persistence changes
  const ref = useIsRefEqual(userProfilePersistence, () => {
    console.debug('useUserProfile(): resetting persistence');
    reset();
  });

  const [userProfileResponses] = useState<UserProfilePresenter>(
    new UserProfilePresenter(setValue, setError),
  );
  const [userProfileUseCases, setUserProfileUseCases] =
    useState<UserProfileRequests>();

  useEffect(() => {
    if (!ref.current) {
      // sets value to undefined and loading to false, because we are not loading anything
      setValue(undefined);
      return;
    }

    try {
      if (userId != null && userProfilePersistence != null) {
        const up = new UserProfileUseCases(
          userProfilePersistence,
          userProfileResponses,
        );
        up.listenToUserProfile(userId);
        setUserProfileUseCases(up);
      }
    } catch (err) {
      console.error(err);
      setError(err as Error);
    }
    return () => {
      try {
        userProfileUseCases?.stopListeningToUserProfile();
      } catch (err) {
        setError(err as Error);
        console.error(err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, userId, userProfilePersistence]);

  return {value, loading, error};
};
