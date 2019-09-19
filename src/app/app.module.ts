import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfigService, initializeApp } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CartReducer } from './reducers/cart.reducer';
import { HistoryComponent } from './components/history/history.component';
import { EffectsModule } from '@ngrx/effects';
import { itemsEffect } from './effects/items.effects';
import { ItemsReducer } from './reducers/items.reducer';
import { ItemsService } from './services/items/items.service';
import { TransactionsService } from './services/transactions/transactions.service';
import { TransactionsReducer } from './reducers/transactions.reducer';
import { TransactionsEffect } from './effects/transactions.effects';
import { NgPipesModule } from 'ngx-pipes';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEffect } from './effects/profile.effects';
import { ProfileReducer } from './reducers/profile.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    HistoryComponent,
    ProfileComponent
  ],
  providers: [ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps:[ConfigService],
      multi: true
    },
    AccountService,
    ItemsService,
    TransactionsService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgPipesModule,
    StoreModule.forRoot({cart: CartReducer, items: ItemsReducer, 
      transactions: TransactionsReducer, accounts: ProfileReducer}),
    EffectsModule.forRoot([itemsEffect, TransactionsEffect, ProfileEffect])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
