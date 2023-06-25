import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RoomListComponent } from './room-list/room-list.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoomListComponent,
    MeetingListComponent,
    CreateMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
