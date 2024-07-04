import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LogIn } from '../../Models/LogIn';
import { UserService } from '../../Serviices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [InputTextModule,FloatLabelModule,FormsModule,ReactiveFormsModule,ButtonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  LogInForm:FormGroup;
  UserLogIn:LogIn= new LogIn()


  constructor(private fb: FormBuilder,public userService:UserService,private router: Router){
    this.LogInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  });
  }


  login(): void {
    Object.assign(this.UserLogIn, this.LogInForm.value);
    this.userService.LogIn(this.UserLogIn).subscribe({
      next: res => {
        console.log(res.token)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/doctors-list']);  
      },
      error: err => {
        console.error('Error during login:', err);
      }
    });
  }

}
