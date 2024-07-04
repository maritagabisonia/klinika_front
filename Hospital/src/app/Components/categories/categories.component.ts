import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoriesService } from '../../Serviices/categories.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../Models/Category';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnChanges {
  @Input() value!: string;
  categories!: Category[];
  constructor(public categoriesService:CategoriesService){}

  ngOnInit() {
    this.updateCategories();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      console.log('Value changed:', changes['value'].currentValue); // Debugging log
      this.updateCategories();
    }
  }


  updateCategories(): void {
    if (this.value === 'eng') {
      this.get_categories_eng();
    } else {
      this.get_categories_geo();
    }
  }
  get_categories_eng():void{
    this.categoriesService.get_categories_eng().subscribe({
      next: data => {
        console.log("categ");

        console.log(data);
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
        console.log("categ");

        console.log(data);
        this.categories = data;
      },
      error: err => {
        console.error('Error fetching doctors:', err);
      }
    });

  }


}
