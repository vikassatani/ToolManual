import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';

import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddCatalog, Catalog, ProductCategory, Cluster, InventoryClassificationLevelWise, InventoryCategoryLevelWise, Brand, AddProductCategory } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addCategory.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
    @ViewChild('f') CatalogForm: NgForm
    productCategory: ProductCategory[];
    cluster: Cluster[];
    ResponseStatus: string;

    clusterData: InventoryClassificationLevelWise[];
    submitted = false;
    products: AddProductCategory[];
    errorMessage: String;
    comp_Id: number;
    parent_Id: number;
    Id: number;
    Name: string;
    is_Active: number;
    login_Id: number;
    token: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    product = new AddProductCategory();
    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) {

    }
    ngOnInit() {
        if (myGlobals.categoryId > 0) {
            this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')
                .subscribe(Data => {
                    this.cluster = Data;
                });

            this.serverService.getProductCategoryDataFromServers(myGlobals.categoryId, 0, 0, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
                .subscribe(Data => {
                    this.product.Id = Data[0].Id;
                    this.product.Name = Data[0].Name;
                    this.product.parent_Id = Data[0].parent_Id;
                    if (Data[0].is_Active == 1) {
                        this.product.is_Active = 1;
                    }
                    else { this.product.is_Active = 0; }
                });
        }
        else {
            this.product.is_Active = 1;

            // this.serverService.getProductCategoryDataFromServers(0,0,0,'GET_INVENTORY_CLASSIFICATION_CATEGORY')

            // .subscribe(Data => {
            //     this.productCategory= Data;
            // });


            this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')

                .subscribe(Data => {
                    this.cluster = Data;
                });
        }
    }
    onSubmit(): void {
        this.submitted = true;
        this.serverService.addProductCategoryData(this.product, 'INSERT_INVENTORY_CLASSIFICATION')
            .subscribe(product => {
                this.ResponseStatus = product[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            },
            error => this.errorMessage = <any>error);
        this.onCancel();
        this.ngOnInit();
    }

    onCancel(): void {

        myGlobals.setCategoryIDValue(0);
        this.router.navigate(['./product']);

    }
    onIsActiveChanged(value) {
        if (value) {
            this.product.is_Active = 1;
        } else { this.product.is_Active = 2; }

    }

    ngAfterViewInit() {


    }

}