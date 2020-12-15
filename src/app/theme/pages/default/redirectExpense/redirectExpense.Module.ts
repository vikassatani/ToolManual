import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RedirectComponent } from './redirectExpense.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from '../../../../server.service';
import { HttpModule } from '@angular/http';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
                "component": RedirectComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, NgxPaginationModule, Ng2SearchPipeModule, Ng2OrderModule, FileUploaderModule, HttpClientModule, HttpModule, FormsModule, ReactiveFormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        RedirectComponent
    ],
    providers: [ServerService,]
})
export class RedirectComponentModule {



}