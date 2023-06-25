import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'room-list',
    pathMatch:"full"
  },
  {
    path:'room-list',
    component:RoomListComponent,
    pathMatch:"full"
  },
  {
    path:'create-meeting',
    component:CreateMeetingComponent
  },
  {
    path:'meeting-list/:id',
    component:MeetingListComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
