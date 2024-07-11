import { Component, OnInit, Output,EventEmitter, Optional, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../../Serviices/translate.service';
import { StorageService } from '../../../Serviices/storage.service';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [TabMenuModule, ButtonModule,BreadcrumbModule,SelectButtonModule,FormsModule],
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  itemss: MenuItem[] | undefined;
  value: string = 'eng';


  constructor(public translateService:TranslateService,
    private storageService: StorageService){}
  

  ngOnInit() {
    this.get_translate();    
   }
 
  toggleValue(): void {
   // this.value = this.value === 'eng' ? 'geo' : 'eng';
    this.value = this.value === 'geo' ? 'eng' : 'geo';

    localStorage.setItem('language', this.value);
    this.get_translate();    

  }

  get_translate():void{
    this.translateService.translate().subscribe({
      next: data => {
        this.updateLabels();

      },
      error: err => {
        console.error('Error fetching doctors:', err);
      }
    });

  }
  updateLabels(): void {
    this.itemss = [
      { label: this.translateService.Dictionary['doctors'] },
      { label: 'კლინიკები' },
      { label: 'ანოტაციები' },
      { label: 'აქციები' },
      { label: 'სერვისები' },
      { label: 'მედიკამენტები' },
      { label: 'კონტაქტი' }
    ];
    this.items = [
      { label: this.translateService.Dictionary['signIn'], url: 'logIn'},
      { label:this.translateService.Dictionary['signUp'], url: 'register' }
  ];

  }

}
