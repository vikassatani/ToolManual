
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Cluster, ProductCategory, AddCluster, AddProductCategory, Status, InventoryClassificationLevelWise, InventoryCategoryLevelWise } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./product.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit, AfterViewInit {
    status: Status[];
    cluster: Cluster[];

    addCluster = new AddCluster();
    ResponseStatus: string;

    productCategory: ProductCategory[];
    productCategoryData: InventoryCategoryLevelWise[];
    clusterData: InventoryClassificationLevelWise[];

    errorMessage: string;
    product = new AddProductCategory();
    constructor(private serverService: ServerService, private router: Router) { }


    // //sorting
    // key: string = ''; 
    // reverse: boolean = false;

    // sort(key){
    //     this.key = key;
    //     this.reverse = !this.reverse;
    // }
    // //pagination
    // p: number = 1;

    // itemsPerPage : number = 5;
    // rowsPerPage :  number = 5;
    // setPageSize(itemsPerPage){
    //     if(itemsPerPage==""){
    //         this.itemsPerPage=5;
    //     }else{
    //         this.itemsPerPage = itemsPerPage;
    //     }
    // }
    // //pagination2
    // p2: number = 1;

    // itemsPerPage2 : number = 5;
    // rowsPerPage2 :  number = 5;
    // setPageSize2(itemsPerPage2){
    //     if(itemsPerPage2==""){
    //         this.itemsPerPage2=5;
    //     }else{
    //         this.itemsPerPage2 = itemsPerPage2;
    //     }
    // }

    ngOnInit(): void {

        this.serverService.getStatusDataFromServers(0, 0)

            .subscribe(Data => {
                this.status = Data;
                this.addCluster.is_Active = 0;

            });


        this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')

            .subscribe(Data => {
                this.cluster = Data;
                //  this.product.parent_Id=0;


            });


        this.serverService.getProductCategoryDataFromServers(0, 0, 0, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')

            .subscribe(Data => {
                this.productCategory = Data;
            });


    }

    deleteCluster(clusterId) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.addCluster.Id = clusterId;
                this.addCluster.parent_Id = 0;
                this.serverService.addClusterData(this.addCluster, 'DELETE_INVENTORY_CLASSIFICATION')
                    .subscribe(addCluster => {
                        this.ngOnInit();
                        this.ResponseStatus = addCluster[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    },
                    error => this.errorMessage = <any>error);
            }
        });
    }

    getClusterData() {

        this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')

            .subscribe(Data => {
                this.cluster = Data;
            });

    }
    deleteCategory(catalogId) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.product.Id = catalogId;
                this.serverService.addProductCategoryData(this.product, "DELETE_BRANCH")
                    .subscribe(id => {
                        this.ResponseStatus = id[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getCategoryData(0, 0);
                    },
                    error => this.errorMessage = <any>error);

            }
        });
    }

    getCategoryData(statusId, parent_Id) {
        this.serverService.getProductCategoryDataFromServers(0, statusId, parent_Id, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
            .subscribe(Data => {
                this.productCategory = Data;
            });
    }


    onClusterStatusChange(statusId) {
        this.addCluster.is_Active = statusId;
        this.serverService.getClusterDataFromServers(0, this.addCluster.is_Active, 'GET_INVENTORY_CLASSIFICATION')
            .subscribe(Data => {
                this.cluster = Data;
            });
        // this.deleteBranch.branch_Id=0;
    }

    //  onCategoryStatusChange(statusId){
    //     this.product.is_Active=statusId;
    //     this.serverService.getProductCategoryDataFromServers(0,this.product.is_Active,0,'GET_INVENTORY_CLASSIFICATION_CATEGORY')
    //         .subscribe(Data => {
    //              this.productCategory = Data;
    //          });
    //       // this.deleteBranch.branch_Id=0;
    //  }

    redirectToCluster(clusterId) {
        myGlobals.setClusterIDValue(clusterId);
        this.router.navigate(['./addCluster']);
    }

    redirectToCategory(categoryId) {
        myGlobals.setCategoryIDValue(categoryId);
        this.router.navigate(['./addCategory']);
    }
    ngAfterViewInit() {

    }
}
