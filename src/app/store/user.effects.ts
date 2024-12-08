import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(action => this.userService.updateUser(action.user)
      .pipe(
        map(user => UserActions.updateUserSuccess({ user })),
        catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}