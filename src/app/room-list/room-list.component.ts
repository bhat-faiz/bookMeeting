import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import type { MeetingRoom } from '../types';
import moment from 'moment';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  public roomData: any[] = [];
  constructor(public data: DataService) {}

  ngOnInit(): void {
    this.getMeetingRoom();
  }

  getMeetingRoom() {
    const rooms = this.data.getRooms();
    rooms.map((room) => {
      const bookingData = this.data.getBookingsByRoomID(room.id);
      const booking = bookingData.find((booking) => {
        return (
          moment().format('DD-MM-YYYY') === booking.date &&
          moment(moment().format('HH:mm'), 'HH:mm').isBetween(
            moment(booking.startTime, 'HH:mm'),
            moment(booking.endTime, 'HH:mm'),
            'minutes'
          )
        );
      });
      if (booking) {
        const employeeDetails = this.data.getEmployeeById(booking.employee_id);
        this.roomData.push({
          ...room,
          employeeName: employeeDetails?.name,
          employeeDept: employeeDetails?.department,
          status: 'IN-USE',
        });
      } else {
        this.roomData.push({
          ...room,
          status: 'AVAILABLE',
        });
      }
    });
  }
}
