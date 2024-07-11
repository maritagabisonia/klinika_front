import { Routes } from '@angular/router';
import { LogInComponent } from './Components/log-in/log-in.component';
import { scheduled } from 'rxjs';
import { SchedulerComponent } from './Components/scheduler/scheduler.component';
import { DoctorsListComponent } from './Components/doctors-list/doctors-list.component';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    {path: 'logIn', component: LogInComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'schedular', component: SchedulerComponent},
  { path: 'doctors-list', component: DoctorsListComponent },
];
