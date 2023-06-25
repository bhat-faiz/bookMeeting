import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import type { MeetingRoom } from '../types';
import moment from 'moment';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit {
  roomID: string = '';
  userID: string = '';
  bookingList: any[] = [];
  roomName: MeetingRoom | undefined;
  constructor(private route: ActivatedRoute, public data: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomID = params['id'];
    });
    this.getMeetings();
    this.getRoom();
  }

  getRoom() {
    this.roomName = this.data.getRoomById(this.roomID);
  }

  getMeetings() {
    const bookings = this.data.getBookingsByRoomID(this.roomID);
    this.bookingList = bookings
      .filter((booking) => {
        const dateFormat = 'DD-MM-YYYY';
        const timeFormat = 'HH:mm';
        const todaysDate = moment().format(dateFormat);
        const currentTime = moment().format(timeFormat);
        return (
          moment(booking.date, dateFormat).isAfter(
            moment(todaysDate, dateFormat)
          ) ||
          moment(booking.endTime, timeFormat).isAfter(
            moment(currentTime, timeFormat)
          )
        );
      })
      .map((booking) => {
        const employee = this.data.getEmployeeById(booking.employee_id);
        return {
          ...booking,
          eemployeeName: employee?.name,
          employeeDept: employee?.department,
        };
      });
  }

  deleteBooking(id: string) {
    confirm('Do want to delete the meeting?');
    this.data.deleteBooking(id);
    this.getMeetings();
  }
}
