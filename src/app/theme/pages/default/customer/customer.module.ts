import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerService } from '../../../../server.service';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';





const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CustomerComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, HttpClientModule, NgxPaginationModule, Ng2SearchPipeModule, Ng2OrderModule, HttpModule, ReactiveFormsModule, FormsModule, FileUploaderModule
    ], exports: [
        RouterModule
    ], declarations: [
        CustomerComponent
    ],
    providers: [ServerService,],
})
export class CustomerModule {



}