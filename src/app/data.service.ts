import { Injectable } from '@angular/core';
import { default as data } from '../assets/data.json';
import { remove } from 'lodash';
import type { MeetingRoom, Employees, Bookings, Setting } from './types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private meetingRooms: MeetingRoom[] = data.meetingRooms;
  private employees: Employees[] = data.employees;
  private bookings: Bookings[] = data.bookings;
  private setting: Setting = data.setting;

  constructor() {}

  getEmployees(): Employees[] {
    return this.employees;
  }

  getEmployeeById(id: string): Employees | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  getRooms(): MeetingRoom[] {
    return this.meetingRooms;
  }

  getRoomById(id: string): MeetingRoom | undefined {
    return this.meetingRooms.find((meetingRoom) => meetingRoom.id === id);
  }

  getBookings(): Bookings[] {
    return this.bookings;
  }

  getBookingById(id: string): Bookings | undefined {
    return this.bookings.find((booking) => booking.id === id);
  }

  getBookingsByRoomID(id: string): Bookings[] {
    return this.bookings.filter((booking) => booking.room_id === id);
  }

  getBookingsByEmployeeID(employeeId: string): Bookings[] {
    return this.bookings.filter(
      (booking) => booking.employee_id === employeeId
    );
  }

  addBooking(booking: Bookings): Bookings[] {
    booking.id = new Date().valueOf().toString()
    this.bookings.push(booking);
    return this.bookings;
  }

  deleteBooking(bookingId: string): Bookings[] {
    this.bookings = this.bookings.filter(
      (booking) => booking.id !== bookingId
    );
    console.log(this.bookings)
    return this.bookings
  }

  getSetting(): Setting {
    return this.setting;
  }
}
