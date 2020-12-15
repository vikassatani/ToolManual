import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FinishedGoodsComponent } from './finishedGoods.component';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";

import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ServerService } from '../../../../server.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": FinishedGoodsComponent
            },

        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule,
        HttpClientModule, FileUploaderModule, HttpModule, FormsModule, ReactiveFormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        FinishedGoodsComponent
    ],
    providers: [ServerService],

})
export class FinishedGoodsModule {



}