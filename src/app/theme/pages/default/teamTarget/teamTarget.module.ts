import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TeamTargetComponent } from './teamTarget.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { FormsModule } from '@angular/forms';


import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": TeamTargetComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, HttpClientModule, HttpModule, FormsModule, FileUploaderModule
    ], exports: [
        RouterModule
    ], declarations: [
        TeamTargetComponent
    ],
    providers: [ServerService,],
})
export class TeamTargetModule {



}