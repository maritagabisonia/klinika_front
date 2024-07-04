import { Component, Input } from '@angular/core';
import { Doctor } from '../../Models/Doctor';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {
  @Input() doctor!: Doctor;
}
