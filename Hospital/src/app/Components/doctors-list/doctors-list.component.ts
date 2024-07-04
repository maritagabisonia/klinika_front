// doctors-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../Models/Doctor';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';
import { NgFor, NgIf } from '@angular/common';
import { SafePipePipe } from '../../Pipes/safe-pipe.pipe';
import { DoctorService } from '../../Serviices/doctor.service';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [DoctorCardComponent, SafePipePipe, NgIf, NgFor],
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  pageNumber: number = 1;
  rowsPerPage: number = 10;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    console.log('doctor ngOnit');
    this.loadDoctors();
  }

  loadDoctors(): void {
    debugger;
    this.doctorService.getDoctors(this.pageNumber, this.rowsPerPage).subscribe({
      next: data => {
        console.log("loadDoctors");

        console.log(data);
        this.doctors = data.map((item: any) => new Doctor(item));
      },
      error: err => {
        console.error('Error fetching doctors:', err);
      }
    });
  }
}
