import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { userFeature } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(userFeature),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }