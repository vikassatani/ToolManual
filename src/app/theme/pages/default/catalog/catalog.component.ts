
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { Catalog, Status, ProductCategory, Cluster, InventoryClassificationLevelWise, InventoryCategoryLevelWise, AddCatalog } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Brand } from '../../../../componentDetails';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';


//addCatalog.parent_Id
//addCatalog.inventory_classification_id
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./catalog.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CatalogComponent implements OnInit, AfterViewInit {
    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    status: Status[];
    catalog: Catalog[];
    productCategory: ProductCategory[];
    cluster: Cluster[];
    brand: Brand[];
    errorMessage: String;
    addCatalog = new AddCatalog();
    productCategoryData: InventoryCategoryLevelWise[];
    clusterData: InventoryClassificationLevelWise[];


    constructor(private serverService: ServerService, private router: Router, public http: Http) { }


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

    ngOnInit(): void {
        this.serverService.getStatusDataFromServers(0, 1)
            .subscribe(Data => {
                this.status = Data;
                this.addCatalog.is_Active = Data[0].is_Active;
            });
        this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')
            .subscribe(Data => {
                this.cluster = Data;
            });
        this.serverService.getCatalogDataFromServers(0, 0, 0, 0, 0)
            .subscribe(Data => {
                this.catalog = Data;
            });
    }

    getProductCategory(cluster) {
        this.productCategory = [];
        this.brand = [];
        this.serverService.getProductCategoryDataFromServers(0, 0, cluster, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
            .subscribe(Data => {
                this.productCategory = Data;
            });
        this.getCatalogDetails(cluster, 0, 0, 0);
    }
    getBrandDetails(cluster, category) {
        this.brand = [];
        this.serverService.getBrandDataFromServers(category, 0)
            .subscribe(Data => {
                this.brand = Data;
            });
        this.getCatalogDetails(cluster, category, 0, 0);
    }
    getCatalogDetails(cluster, category, brand, statusId) {
        this.serverService.getCatalogDataFromServers(cluster, category, brand, 0, statusId)
            .subscribe(Data => {
                this.catalog = Data;
            });
    }



    fileuploaderFileChange(event) {
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
                headers.append('token', this.token);
                headers.append('userName', this.user_Name);
                headers.append('ipAddress', '12345');
                headers.append('deviceId', '123');
                headers.append('filepath', 'Expense');
                headers.append('filename', file.name);

                let options = new RequestOptions({ headers: headers });
                let apiUrl1 = "http://localhost:57509/api/InventoryUpload/ExcelUploadProductCatalog";
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
                                conversion_Formula: "Conversion Formula",
                                Rate: "Rate",
                                rownumber: "Error Row",
                                name: "Column Name"
                            }]
                        for (var i = 0; i < Data.length; i++) {
                            if (Data[i].name != "GOOD RECORD") {
                                data1[i + 1] = Data[i]
                            }
                        }
                        if (data1.length > 1) {
                            swal(
                                'Good Records Only Uploaded.',
                                'success'
                            ).then((result) => {
                                if (result.value) {
                                    new Angular2Csv(data1, 'My Report');
                                    window.location.reload();
                                }
                            })

                        } else {
                            swal(
                                'Data Uploaded.',
                                'success'
                            ).then((result) => {
                                if (result.value) {
                                    window.location.reload();
                                }
                            })
                        }
                    })
            }
        });
    }

    redirect(CatalogId) {
        myGlobals.setCatalogIDValue(CatalogId);
        this.router.navigate(['./addCatalog']);
    }



    ngAfterViewInit() {

    }


    exportexcel() {


        var downloadCATAReport = [{ parent_Name: "Cluster Name ", Name: "Category Name ", brand_Name: "Brand Name", item_Name: "Item Name ", pcs_Per_Weight: "Pieces/Weight", item_price: "Price/MT", is_Active: "status" }]
        //var x = downloadCUSTReport.toString();
        var statusd = "";
        for (var i = 0; i < this.catalog.length; i++) {
            if (this.catalog[i].is_Active == 1) {

                statusd = "Active"

            } else {

                statusd = "InActive"
            }
            downloadCATAReport[i + 1] = {
                'parent_Name': this.catalog[i].parent_Name,
                'Name': this.catalog[i].Name,
                'brand_Name': this.catalog[i].brand_Name,
                'item_Name': this.catalog[i].item_Name,
                'pcs_Per_Weight': this.catalog[i].pcs_Per_Weight + "",
                'item_price': this.catalog[i].item_price + "",
                'is_Active': statusd
            }
        }
        new Angular2Csv(downloadCATAReport, 'CatalogExcelData');


    }








}



