import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";



const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": EmployeeComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, NgxPaginationModule, Ng2SearchPipeModule, Ng2OrderModule, HttpClientModule, HttpModule, FormsModule, ReactiveFormsModule, FileUploaderModule
    ], exports: [
        RouterModule
    ], declarations: [
        EmployeeComponent
    ],
    providers: [ServerService,],
})
export class EmployeeModule {

}