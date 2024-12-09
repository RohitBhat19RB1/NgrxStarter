import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../models/user.model';
import { UserActions } from '../store/user.actions';
import { selectUsers, selectUsersLoading } from '../store/user.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  editForms: { [key: number]: FormGroup } = {};
  bulkEditEnabled: boolean = false;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectUsersLoading);
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
    
    this.users$.subscribe(users => {
      users.forEach(user => {
        this.editForms[user.id] = this.fb.group({
          name: [user.name, Validators.required],
          username: [user.username, Validators.required],
          email: [user.email, [Validators.required, Validators.email]]
        });
        this.editForms[user.id].disable();
      });
    });
  }

  toggleEdit(user: User) {
    const form = this.editForms[user.id];
    form.enabled ? form.disable() : form.enable();
  }

  toggleBulkEdit(){
    this.bulkEditEnabled = !this.bulkEditEnabled;
    Object.values(this.editForms).forEach(form => {
      this.bulkEditEnabled ? form.enable() : form.disable();
    });
  }

  saveUser(user: User) {
    const form = this.editForms[user.id];
    if (form.valid) {
      const updatedUser = { ...user, ...form.value };
      this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
      form.disable();
    }
  }

  saveAll(){
    const updatedUsers: User[] = [];

    for (const userId in this.editForms) {
      const form = this.editForms[userId];
      if(form.dirty && form.valid){
        const updatedUser: User = {id: userId, ...form.value};
        updatedUsers.push(updatedUser);
      }
    }

    // if (updatedUsers.length){
    //   this.store.dispatch(UserActions.bulkUpdateUsers(
    //     { users: updatedUsers} 
    //   ));
    //   this.bulkEditEnabled = false;
    //   Object.values(this.editForms).forEach(form => form.disable())
    // }
  }
}