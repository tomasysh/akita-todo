import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
