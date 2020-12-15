import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuAssignComponent } from './menuAssign.component';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": MenuAssignComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FileUploaderModule, HttpClientModule, HttpModule, FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        MenuAssignComponent
    ],
    providers: [ServerService,],
})
export class MenuAssignModule {



}