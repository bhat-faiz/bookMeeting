import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Bookings, Employees, MeetingRoom } from '../types';
import moment from 'moment';
import { NgForm } from '@angular/forms';

export class contact {
  agenda:string | undefined;
  date:string | undefined;
  duration:string | undefined;
  meetingRoomId:boolean | undefined;
  startTime:string | undefined;
  userNameId:string | undefined;
} 

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss'],
})


export class CreateMeetingComponent implements OnInit {
  allRoom: MeetingRoom[] = [];
  allEmployees: Employees[] = [];
  minDate: string = '';
  
  booking: Bookings = {
    id: '',
    agenda: '',
    employee_id: '',
    room_id: '',
    startTime: '',
    endTime: '',
    date: '',
  };

  
  
  timeSlots: string[] = [];

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
    this.minDate = new Date().toISOString().slice(0, 10);
    this.getMeetingRoom();
    this.getAllEmployees();
  }
  getMeetingRoom() {
    this.allRoom = this.data.getRooms();
  }

  getAllEmployees() {
    this.allEmployees = this.data.getEmployees();
  }

  onSubmit(contactForm: any) {
    this.booking.agenda = contactForm.value.agenda;
    this.booking.date = moment(contactForm.value.date, 'YYYY-MM-DD').format(
      'DD-MM-YYYY'
    );
    this.booking.endTime = moment(contactForm.value.startTime, 'HH:mm')
      .add(contactForm.value.duration, 'minutes')
      .format('HH:mm');
    this.booking.room_id = contactForm.value.meetingRoomId;
    this.booking.startTime = contactForm.value.startTime;
    this.booking.employee_id = contactForm.value.userNameId;
    const bookingCheck = this.data.addBooking(this.booking);
    // console.log(bookingCheck);
    alert('Meeting has been created successfully')
    contactForm.form.reset();
  }

  getTimeSlots(selectedDate: any) {
    const allTimeSlots = [
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
    ];

    this.timeSlots = allTimeSlots.filter((timeSlot) => {
      const dateFormat = 'YYYY-MM-DD';
      const timeFormat = 'HH:mm';
      const todaysDate = moment().format(dateFormat);
      const currentTime = moment().format(timeFormat);
      return (
        moment(selectedDate.target.value, dateFormat).isAfter(moment(todaysDate, dateFormat)) ||
        moment(timeSlot, timeFormat).isAfter(moment(currentTime, timeFormat))
      );
    });
  }
}
