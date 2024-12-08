import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserActions } from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UserActions.loadUsers, state => ({ ...state, loading: true })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    on(UserActions.updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(u => u.id === user.id ? user : u)
    }))
  )
});

export const {
  name,
  reducer,
  selectUsers,
  selectLoading,
  selectError
} = userFeature;