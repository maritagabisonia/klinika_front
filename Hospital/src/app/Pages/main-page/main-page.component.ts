import { Component } from '@angular/core';
import { TabMenuComponent } from '../../Components/header/tab-menu/tab-menu.component';
import { CategoriesComponent } from '../../Components/categories/categories.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TabMenuComponent,CategoriesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {


}
