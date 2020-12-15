import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';

import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddCatalog, AddProductCategory, Catalog, InventoryClassificationLevelWise, InventoryCategoryLevelWise, Brand, Cluster, AddCluster, ProductCategory } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addCluster.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddClusterComponent implements OnInit, AfterViewInit {
    @ViewChild('f') CatalogForm: NgForm;
    ResponseStatus: string;
    productCategory: ProductCategory[];
    cluster: Cluster[];
    submitted = false;
    Clusters: AddCluster[];
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
    addCluster = new AddCluster();
    constructor(private serverService: ServerService, private router: Router, private _script: ScriptLoaderService) {

    }
    ngOnInit() {
        if (myGlobals.clusterId > 0) {
            this.serverService.getClusterDataFromServers(myGlobals.clusterId, 0, 'GET_INVENTORY_CLASSIFICATION')
                .subscribe(Data => {
                    // this.cluster = Data;
                    this.addCluster.Name = Data[0].Name;
                    this.addCluster.Id = Data[0].Id;
                    if (Data[0].is_Active == 1) {
                        this.addCluster.is_Active = 1;
                    }
                    else { this.addCluster.is_Active = 0; }
                });
        }
        else {
            this.addCluster.is_Active = 1;

            this.serverService.getProductCategoryDataFromServers(0, 0, 0, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')

                .subscribe(Data => {
                    this.productCategory = Data;
                });

            this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')

                .subscribe(Data => {
                    this.cluster = Data;
                });
        }
    }


    onSubmit(): void {
        this.submitted = true;

        this.serverService.addClusterData(this.addCluster, 'INSERT_INVENTORY_CLASSIFICATION')
            .subscribe(addCluster => {
                this.ResponseStatus = addCluster[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.router.navigate(['./product']);
                myGlobals.setClusterIDValue(0);
            },
            error => this.errorMessage = <any>error);
    }

    onCancel(): void {

        myGlobals.setClusterIDValue(0);
        this.router.navigate(['./product']);

    }
    onIsActiveChanged(value) {
        if (value) {
            this.addCluster.is_Active = 1;
        }
        else {
            this.addCluster.is_Active = 2;
        }

    }

    ngAfterViewInit() {


    }

}