import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InventoryUploadComponent } from './inventoryUpload.component';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ServerService } from '../../../../server.service';
import { FormsModule } from '@angular/forms';


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
                "component": InventoryUploadComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FileUploaderModule, NgxPaginationModule, Ng2OrderModule, Ng2SearchPipeModule, HttpClientModule, HttpModule, FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        InventoryUploadComponent
    ],
    providers: [ServerService,],
})
export class InventoryUploadModule {



}