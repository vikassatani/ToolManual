import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
import { ServerService } from '../../../../server.service';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CompanyComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, NgxPaginationModule, RouterModule.forChild(routes), LayoutModule, FileUploaderModule, HttpClientModule, HttpModule, FormsModule, ReactiveFormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        CompanyComponent
    ],
    providers: [ServerService,],
})
export class CompanyModule {



}