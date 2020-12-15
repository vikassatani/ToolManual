import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';

import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddCatalog, Catalog, InventoryClassificationLevelWise, InventoryCategoryLevelWise, Brand, Cluster, ProductCategory } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addCatalog.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddCatalogComponent implements OnInit, AfterViewInit {



    @ViewChild('f') CatalogForm: NgForm;

    brand: Brand[];
    productCategory: ProductCategory[];
    cluster: Cluster[];

    submitted = false;

    catalogs: AddCatalog[];
    errorMessage: String;
    comp_Id: number;
    parent_Id: number;
    disable_Status: boolean;
    inventory_classification_id: number;
    brand_Id: number;
    item_Id: number;
    item_Name: string;
    pcs_Per_Weight: number;
    item_Code: string;
    item_Category: number;
    item_Type: number;
    item_price: number;
    is_Active: number;
    login_Id: number;
    token: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    catalog = new AddCatalog();

    ResponseStatus: string;

    constructor(private serverService: ServerService, private router: Router) {

    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }


    onSubmit(): void {
        this.submitted = true;

        this.serverService.addCatalogData(this.catalog, 'INSERT_ITEM')
            .subscribe(catalog => {
                this.ResponseStatus = catalog[0].errorCode;
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
    }


    onCancel(): void {

        myGlobals.setCatalogIDValue(0);
        this.router.navigate(['./catalog']);

    }
    onIsActiveChanged(value) {
        if (value) {
            this.catalog.is_Active = 1;
        } else { this.catalog.is_Active = 2; }

    }

    ngOnInit() {
        this.catalog.is_Active = 1;
        if (myGlobals.CatalogId > 0) {

            this.serverService.getCatalogDataFromServers(0, 0, 0, myGlobals.CatalogId, 0)

                .subscribe(Data => {

                    this.catalog.parent_Id = Data[0].parent_Id;
                    this.catalog.inventory_classification_id = Data[0].inventory_classification_id;
                    this.catalog.brand_Id = Data[0].brand_Id;
                    this.catalog.item_Id = Data[0].item_Id;
                    this.catalog.item_Name = Data[0].item_Name;
                    this.catalog.item_price = Data[0].item_price;
                    this.catalog.pcs_Per_Weight = Data[0].pcs_Per_Weight;
                    this.catalog.item_Code = Data[0].item_Code;
                    this.catalog.item_Category = Data[0].item_Category;
                    this.catalog.item_Type = Data[0].item_Type;
                    this.catalog.is_Active = Data[0].is_Active;
                    this.catalog.order_Flag = Data[0].order_Flag;
                    if (Data[0].is_Active == 1) {
                        this.catalog.is_Active = 1;
                    }
                    else {
                        this.catalog.is_Active = 0;
                    }
                    this.disable_Status = true;
                    // if(Data[0].order_Flag==1){
                    //     this.disable_Status = true;
                    // }else{
                    //     this.disable_Status = false;
                    // }
                });
        } else {
            this.disable_Status = false;
        }
        this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')

            .subscribe(Data => {
                this.cluster = Data;
            });


        this.serverService.getProductCategoryDataFromServers(0, 0, 0, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')

            .subscribe(Data => {
                this.productCategory = Data;
            });

        this.serverService.getBrandDataFromServers(0, 0)

            .subscribe(Data => {
                this.brand = Data;
            });
    }


    ngAfterViewInit() {

    }

}