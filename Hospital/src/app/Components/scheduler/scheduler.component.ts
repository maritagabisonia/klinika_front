import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event } from '../../Models/Event';
import { AppoitmensService } from '../../Serviices/appoitmens.service';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  viewDate: Date = new Date();
  events: Event[] = [];
  week: { label: string, date: Date }[] = [];
  hours: string[] = [];
  appointments: { [key: string]: boolean } = {};

  constructor(public appoitmensService: AppoitmensService) { }

  ngOnInit(): void {
    this.generateHours();
    this.appoitmensService.getDoctorAppoitments(28).subscribe(data => {
      console.log("API CALL ENDED");
      console.log(data);
      this.appoitmensService.appointments = data;
      this.loadEvents(data);
    });
    this.calculateWeek();
  }

  generateHours(): void {
    this.hours = [];
    for (let i = 9; i < 18; i++) { // Assuming working hours from 9 AM to 5 PM
      const startHour = i.toString().padStart(2, '0') + ':00';
      const endHour = (i + 1).toString().padStart(2, '0') + ':00';
      this.hours.push(`${startHour}-${endHour}`);
    }
  }

  loadEvents(data: Event[]): void {
    this.events = data.map(event => ({
      ...event,
      startDate: new Date(new Date(event.startDate).getTime()),
      endDate: new Date(new Date(event.endDate).getTime())
    }));
  }

  calculateWeek(): void {
    const startOfWeek = this.getStartOfWeek(this.viewDate);
    this.week = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        label: date.toLocaleString('default', { weekday: 'short' }),
        date
      };
    });
  }

  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    return start;
  }

  getEventsForDayAndHour(day: Date, hour: string): Event[] {
    const [startHour] = hour.split('-').map(time => parseInt(time.split(':')[0]));
    return this.events.filter(event => {
      const eventDay = event.startDate.toDateString();
      const eventHour = event.startDate.getHours();
      return eventDay === day.toDateString() && eventHour === startHour;
    });
  }

  onTimeSlotClick(date: Date, hour: string): void {
    const [startHour, endHour] = hour.split('-').map(time => parseInt(time.split(':')[0]));
    const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, 0, 0);
    const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, 0, 0);
  
    // Convert to UTC
    const adjustedStartTime = new Date(
      Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), 0, 0)
    );
    const adjustedEndTime = new Date(
      Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), 0, 0)
    );
  
    const key = `${adjustedStartTime.toISOString()}`;
  
    if (this.appointments[key]) {
      delete this.appointments[key];
    } else {
      this.appointments[key] = true;
    }
  
    const appointment = new Event(0, 28, 29, adjustedStartTime, adjustedEndTime);
    this.appoitmensService.placeAppoitments(appointment).subscribe(response => {
      console.log('Appointment placed successfully:', response);
      // Refetch events after successfully placing the appointment
      this.appoitmensService.getDoctorAppoitments(13).subscribe(data => {
        console.log("API CALL ENDED");
        console.log(data);
        this.appoitmensService.appointments = data;
        this.loadEvents(data);
      });
    }, error => {
      console.error('Error placing appointment:', error);
    });
  
    console.log(`Clicked time slot: Start - ${startTime}, End - ${endTime}`);
  }
  

  isTimeSlotTaken(date: Date, hour: string): boolean {
    const [startHour] = hour.split('-').map(time => parseInt(time.split(':')[0]));
    const startTime = new Date(date);
    startTime.setHours(startHour, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 0

    const utcStartTime = new Date(Date.UTC(
      startTime.getFullYear(), startTime.getMonth(), startTime.getDate(),
      startTime.getHours(), startTime.getMinutes(), startTime.getSeconds()
    ));
    const key = `${utcStartTime.toISOString()}`;
    return !!this.appointments[key];
  }

  previous(): void {
    this.viewDate.setDate(this.viewDate.getDate() - 7);
    this.calculateWeek();
  }

  next(): void {
    this.viewDate.setDate(this.viewDate.getDate() + 7);
    this.calculateWeek();
  }

  hasEventsOnDate(date: Date): boolean {
    return this.events.some(event => event.startDate.toDateString() === date.toDateString());
  }
}
