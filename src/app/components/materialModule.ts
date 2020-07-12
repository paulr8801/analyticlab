import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule }  from 'ng-apexcharts';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NgApexchartsModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class MaterialModule { }