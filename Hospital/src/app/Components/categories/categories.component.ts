import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoriesService } from '../../Serviices/categories.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../Models/Category';
import { TableModule } from 'primeng/table';
import { TranslateService } from '../../Serviices/translate.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];
  constructor(public translateService:TranslateService,public categoriesService:CategoriesService){}

  ngOnInit() {
    this.get_categories_geo();
    this.translateService.get_translate();
  }
 
  get_categories_eng():void{
    this.categoriesService.get_categories_eng().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.error('Error fetching doctors:', err);
      }
    });

  }
  get_categories_geo():void{
    this.categoriesService.get_categories_geo().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.error('Error fetching doctors:', err);
      }
    });

  }


}
