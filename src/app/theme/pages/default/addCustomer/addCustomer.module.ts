import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './addCustomer.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": AddCustomerComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, NgxPaginationModule, RouterModule.forChild(routes), LayoutModule, FileUploaderModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpModule
    ], exports: [
        RouterModule
    ], declarations: [
        AddCustomerComponent
    ],
    providers: [ServerService,],
})
export class AddCustomerModule {



}


