

import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Branch, Cluster } from '../../../../componentDetails';
import { ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { InventoryUpload, ProductCategory, Brand } from '../../../../componentDetails';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./inventoryUpload.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class InventoryUploadComponent implements OnInit, AfterViewInit {
    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    ResponseStatus: string;
    //sorting
    key: string = '';
    reverse: boolean = false;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    //pagination
    p: number = 1;

    itemsPerPage: number = 5;
    rowsPerPage: number = 5;
    setPageSize(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage = 5;
        } else {
            this.itemsPerPage = itemsPerPage;
        }
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

    isDailyInventory: boolean;
    isDailyInventoryUpload: boolean;
    inventoryUpload: InventoryUpload[];
    productCategory: ProductCategory[];
    brand: Brand[];
    branch: Branch[];
    cluster: Cluster[];
    errorMessage: String;

    selectedCategory: number;
    disableFile1: boolean;
    branchId: number;
    constructor(private serverService: ServerService, public http: Http) { }


    selectedBranch: number;

    ngOnInit(): void {
        this.disableFile1 = true;
        this.isDailyInventory = true;
        this.isDailyInventoryUpload = false;
        this.serverService.getInventoryUploadDataFromServers(0, 0, 0)
            .subscribe(Data => {
                this.inventoryUpload = Data;
            });

        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;
                this.branchId = Data[0].branch_Id;

                this.selectedBranch = 0;
            });
        this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')
            .subscribe(Data => {
                this.cluster = Data;
            });
        this.serverService.getProductCategoryDataFromServers(0, 0, 0, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
            .subscribe(Data => {
                this.productCategory = Data;
            });

        // this.serverService.getBrandDataFromServers(0,0)
        // .subscribe(Data => {
        //     this.brand= Data;
        // });
    }
    changeStatus() {
        this.isDailyInventory = false;
        this.isDailyInventoryUpload = true;
    }
    UpdateQty(itemId, branchId, quantity): void {
        this.serverService.addDailyInventoryData(itemId, branchId, quantity)
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
    onCancel() {
        this.isDailyInventory = true;
        this.isDailyInventoryUpload = false;
    }
    getProductCategory(cluster, category, branch) {
        this.productCategory = [];
        this.serverService.getProductCategoryDataFromServers(0, 0, cluster, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
            .subscribe(Data => {
                this.productCategory = Data;
                this.getInventoryDetails(cluster, 0, branch);
            });
    }

    getInventoryDetails(cluster, category, branch) {
        this.serverService.getInventoryUploadDataFromServers(cluster, category, branch)
            .subscribe(Data => {
                this.inventoryUpload = Data;

            });
    }

    fileuploaderFileChange(event, branchId) {
        if (branchId == undefined) {
            swal("Select Branch");
        }
        else {
            swal({
                title: 'Are you sure to Upload?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Upload it!'
            }).then((result) => {
                if (result.value) {
                    let file = event[0];
                    let formData: FormData = new FormData();
                    formData.append('uploadFile', file, file.name);
                    let headers = new Headers()
                    // headers.append('Content-Type', 'json');  
                    // headers.append('Accept', 'application/json');  
                    headers.append('compId', this.compId);
                    headers.append('loginid', this.loginId);
                    headers.append('branchId', branchId);
                    headers.append('token', this.token);
                    headers.append('userName', this.user_Name);
                    headers.append('ipAddress', '12345');
                    headers.append('deviceId', '123');
                    headers.append('filepath', 'Expense');
                    headers.append('filename', file.name);
                    let options = new RequestOptions({ headers: headers });
                    let apiUrl1 = "http://localhost:57509/api/DailyUpload/ExcelUploadDailyInventory";
                    this.http.post(apiUrl1, formData, options)
                        .map(res => res.json())
                        .catch(error => Observable.throw(error))
                        .subscribe(
                        Data => {
                            var data1 = [
                                {
                                    Product_Category: "Product Category",
                                    Item_Name: "Item_Name",
                                    Cluster: "Cluster",
                                    Brand: "Brand",
                                    Quantity: "Quantity",
                                    Pcs: "Pcs",
                                    rownumber: "Error Row",
                                    name: "Column Name"
                                }]
                            for (var i = 0; i < Data.length; i++) {
                                if (Data[i].name != "GOOD RECORD") {
                                    data1[i + 1] = Data[i]
                                }

                                // data1[i+1].Item_Name = Data[i].Item_Name
                                // data1[i+1].Cluster = Data[i].Cluster
                                // data1[i+1].Brand = Data[i].Brand
                                // data1[i+1].Quantity = Data[i].Quantity
                            }
                            if (data1.length > 1) {
                                swal(
                                    'Good Records Only Uploaded.',

                                )
                                new Angular2Csv(data1, 'My Report');
                                this.ngOnInit();
                            } else {
                                swal(
                                    'Data Uploaded.',
                                    'success'
                                )
                                this.ngOnInit();
                            }
                        })
                    // data => console.log('success'),  
                    // error => console.log(error)  )

                }

            });

        }
    }
    ngAfterViewInit() {

    }
}
