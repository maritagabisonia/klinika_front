import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [TabMenuModule, ButtonModule,BreadcrumbModule,SelectButtonModule,FormsModule],
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class TabMenuComponent implements OnInit {
  @Output() valueChange = new EventEmitter<string>();
  items: MenuItem[] | undefined;
  itemss: MenuItem[] | undefined;
  stateOptions: any[] = [
    { label: 'ENG', value: 'eng' }
  ];
  value: string = 'eng';

  ngOnInit() {
    this.itemss = [
      { label: 'ექიმები' },
      { label: 'კლინიკები' },
      { label: 'ანოტაციები' },
      { label: 'აქციები' },
      { label: 'სერვისები' },
      { label: 'მედიკამენტები' },
      { label: 'კონტაქტი' }
    ];
    this.items = [
      { label: 'ავტორიზაცია', url: 'logIn'},
      { label: 'რეგისტრაცია', url: '' }
  ];
   }
   onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
   


}
