export type MeetingRoom = {
  id: string;
  name: string;
};

export type Employees = {
  name: string;
  department: string;
  id: string;
};

export type Bookings = {
  id?: string;
  agenda: string;
  employee_id: string;
  room_id: string;
  startTime: string;
  endTime: string;
  date: string;
};

export type Setting = {
  startTime: string;
  endTime: string;
  minTimeSlot: string;
  minTimeSlotUnit: string;
};
