
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { NgForm } from '@angular/forms';
import { Catalog, Status, ProductCategory, Cluster, InventoryClassificationLevelWise, InventoryCategoryLevelWise, AddCatalog } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { PlaceOrder, Customer } from '../../../../componentDetails';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';


//addCatalog.parent_Id
//addCatalog.inventory_classification_id
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./placeOrder.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PlaceOrderComponent implements OnInit, AfterViewInit {
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;

    showTable: boolean;
    disabledData: boolean;
    branch: any;
    branchId: number;
    itemAmount: any;
    subTotal: any;
    itemTotal: any;
    totalAmount: any;
    discount: any;
    plPlus: any;
    plMinus: any;
    FOR: any;
    cgst: any;
    sgst: any;
    totalTax: any;
    grandTotal: any;
    taxArrayCount: number;
    orderId: number;
    quantity: string;
    // status:Status[];
    catalog: Catalog[];
    productCategory: ProductCategory[];
    cluster: Cluster[];
    customer: Customer[];
    taxArray: any;
    checkQuantityMTN: any;
    checkQuantityPCS: any;
    // brand:Brand[];
    uomDropDown: any;
    errorMessage: String;
    ResponseStatus: string;
    ResponseCode: String;


    addCatalog = new AddCatalog();
    placeOrder = new PlaceOrder();

    placeOrder_quantityMT: any;
    placeOrder_priceMT: any;
    placeOrder_quantityPCS: any;
    placeOrder_pricePCS: any;
    placeOrder_staticQuantityMT: any;
    placeOrder_staticQuantityPCS: any;
    placeOrder_pcs_Per_Weight: any;

    productCategoryData: InventoryCategoryLevelWise[];
    clusterData: InventoryClassificationLevelWise[];

    cluster_Name: string;
    category_Name: string;
    item_Name: string;
    uom_Name: string;
    ArrayData: any;


    constructor(private serverService: ServerService, private router: Router, public http: Http) { }

    onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

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

    ngOnInit(): void {
        this.itemTotal = ''; this.subTotal = ''; this.plPlus = ''; this.FOR = ''; this.plMinus = ''; this.discount = ''; this.totalAmount = '';
        this.cgst = ''; this.sgst = ''; this.grandTotal = '';
        this.disabledData = false;
        this.branch = [];
        this.taxArray = [{ 'tax_Id': 1, 'tax_Name': 'CGST', 'tax_Percentage': 12, 'tax_Amount': '' },
        { 'tax_Id': 2, 'tax_Name': 'SGST', 'tax_Percentage': 12, 'tax_Amount': '' }];
        this.ArrayData = [];
        this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')
            .subscribe(Data => {
                this.cluster = Data;
            });
        this.serverService.getUOMDataFromServers()
            .subscribe(Data => {
                this.uomDropDown = Data;
            });
        this.serverService.getCustomerDataFromServers(0, 1)
            .subscribe(Data => {
                this.customer = Data;
            });
        this.serverService.getAssignedBranchDataFromServers(this.staff_Id)
            .subscribe(Data => {

                if (this.staff_Id == '0') {
                    this.branch = Data;
                }
                else {
                    for (var i = 0; i < Data.length; i++) {
                        if (Data[i].checked_Branch == 1) {
                            this.branch.unshift(Data[i]);
                        }
                        if (Data[i].is_primary == 1) {
                            this.branchId = Data[i].branch_id;
                        }
                    }

                }

                // for(var i=0; i<Data.length;i++){
                //     if(Data[i].checked_Branch==1){
                //         this.branch.unshift(Data[i]);
                //     }
                //     if(Data[i].is_primary==1){
                //         this.branchId=Data[i].branch_id;
                //     }
                // }
            })
    }
    getProductCategory(cluster) {
        this.productCategory = [];
        this.catalog = [];
        //this.brand = [];
        this.serverService.getProductCategoryDataFromServers(0, 0, cluster, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
            .subscribe(Data => {
                this.productCategory = Data;
            });
    }
    getCatalogDetails(cluster, category) {
        this.serverService.getCatalogDataFromServers(cluster, category, 0, 0, 0)
            .subscribe(Data => {
                this.catalog = Data;
            });
    }
    getQuantityAndRate(branch, clusterId, category, item) {
        this.checkQuantityMTN = 0;
        this.checkQuantityPCS = 0;

        if (branch != undefined && category != undefined && item != undefined) {
            this.serverService.getRateAndQuantityDataFromServers(branch, category, item)
                .subscribe(Data => {
                    //  if(Data.length==0){

                    //  }
                    //  else{
                    //   this.errorMessage="Quantity And Rate Received"
                    //  if(this.errorMessage==Data[0].errorMessage){
                    this.placeOrder_priceMT = Data[0].priceMT;
                    this.placeOrder_pricePCS = Data[0].pricePCS;
                    this.placeOrder_pcs_Per_Weight = Data[0].pcs_Per_Weight;
                    // }
                    // }


                    for (var i = 0; i < this.ArrayData.length; i++) {
                        if (this.ArrayData[i].cluster_Id == clusterId && this.ArrayData[i].category_Id == category && this.ArrayData[i].item_Id == item) {
                            if (this.ArrayData[i].uom == 1) {
                                this.checkQuantityMTN = +this.checkQuantityMTN + +this.ArrayData[i].quantity;
                                this.checkQuantityPCS = ((+this.checkQuantityMTN * 1000) * +this.ArrayData[i].pcs_per_Weight);
                            } else {
                                this.checkQuantityPCS = +this.checkQuantityPCS + +this.ArrayData[i].quantity;
                                this.checkQuantityMTN = ((+this.checkQuantityPCS / 1000) / +this.ArrayData[i].pcs_per_Weight);
                            }
                        }
                    }
                    this.placeOrder_quantityMT = +Data[0].quantityMT - this.checkQuantityMTN;
                    this.placeOrder_staticQuantityMT = this.placeOrder_quantityMT;
                    this.placeOrder_quantityPCS = +Data[0].quantityPCS - this.checkQuantityPCS;
                    this.placeOrder_staticQuantityPCS = this.placeOrder_quantityPCS;
                });
        }
    }
    calcAmount(uom, quantity, MT, PCS) {
        if (uom == 1) {
            if (quantity > this.placeOrder_staticQuantityMT) {
                // var len = quantity.length;
                this.quantity = '';
                this.itemAmount = '';
                //quantity = quantity.toString().slice(0,len-1);
                this.placeOrder_quantityMT = this.placeOrder_staticQuantityMT - +this.quantity;
                swal("Out Of Stock...");
            }
            else {
                this.itemAmount = quantity * MT;
            }
        } else {
            if (quantity > this.placeOrder_staticQuantityPCS) {
                // var len = quantity.length;
                this.quantity = '';
                this.itemAmount = '';
                //quantity = quantity.toString().slice(0,len-1);
                this.placeOrder_quantityPCS = this.placeOrder_staticQuantityPCS - +this.quantity;
                swal("Quantity Not In Stock...");
            } else {
                this.itemAmount = quantity * PCS;
            }
        }
    }
    grandCalculation() {
        this.totalAmount = 0;
        this.grandTotal = 0;
        this.totalTax = 0;
        this.totalAmount = ((((this.itemTotal + +this.plPlus) + +this.FOR) - +this.plMinus) - +this.discount)
        this.subTotal = this.totalAmount;
        for (var i = 0; i < this.taxArray.length; i++) {
            this.taxArray[i].tax_Amount = ((this.totalAmount * this.taxArray[i].tax_Percentage) / 100);
            this.totalTax = this.totalTax + this.taxArray[i].tax_Amount;
        }
        // this.cgst = ((this.totalAmount * 12)/100);
        // this.sgst = this.cgst;
        this.grandTotal = (this.totalAmount + this.totalTax);
        this.grandTotal = this.grandTotal.toFixed(2);
    }
    deleteData(row, branch, clusterId, category, item) {
        this.getQuantityAndRate(branch, clusterId, category, item)
        this.placeOrder_quantityMT = this.placeOrder_quantityMT + +this.ArrayData[row].quantity;
        this.placeOrder_staticQuantityMT = this.placeOrder_quantityMT;
        this.placeOrder_quantityPCS = this.placeOrder_quantityPCS + +this.ArrayData[row].quantity;
        this.placeOrder_staticQuantityPCS = this.placeOrder_quantityPCS;
        this.ArrayData.splice(row, 1);
        if (this.ArrayData.length > 0) {
            this.showTable = true;
            this.disabledData = true;
        }
        this.itemTotal = 0;
        for (var i = 0; i < this.ArrayData.length; i++) {
            this.itemTotal = this.itemTotal + this.ArrayData[i].item_Amount;
        }
        this.grandCalculation();
    }
    addData(cluster, category, item, uom, quantity, amount) {
        this.itemTotal = 0;
        this.serverService.getClusterDataFromServers(cluster, 0, 'GET_INVENTORY_CLASSIFICATION')
            .subscribe(Data => {
                this.cluster_Name = Data[0].Name;

                this.serverService.getProductCategoryDataFromServers(category, 0, cluster, 'GET_INVENTORY_CLASSIFICATION_CATEGORY')
                    .subscribe(Data => {
                        this.category_Name = Data[0].Name;

                        this.serverService.getCatalogDataFromServers(cluster, category, 0, item, 0)
                            .subscribe(Data => {
                                this.item_Name = Data[0].item_Name;

                                for (var i = 0; i < this.uomDropDown.length; i++) {
                                    if (this.uomDropDown[i].id == uom) {
                                        this.uom_Name = this.uomDropDown[i].Name
                                    }
                                }
                                this.ArrayData.unshift({
                                    'id': this.ArrayData.length, 'cluster_Id': cluster,
                                    'cluster_Name': this.cluster_Name, 'category_Id': category, 'category_Name': this.category_Name,
                                    'item_Id': item, 'item_Name': this.item_Name, 'uom': uom, 'uom_Name': this.uom_Name,
                                    'quantity': quantity, 'item_Amount': amount, 'pcs_per_Weight': this.placeOrder_pcs_Per_Weight
                                })
                                if (uom == 1) {
                                    this.placeOrder_quantityMT = this.placeOrder_staticQuantityMT - +quantity;
                                    this.placeOrder_staticQuantityMT = this.placeOrder_quantityMT;
                                    this.placeOrder_quantityPCS = ((+this.placeOrder_quantityMT * 1000) * +this.placeOrder_pcs_Per_Weight);
                                    this.placeOrder_staticQuantityPCS = this.placeOrder_quantityPCS;
                                    this.quantity = '';
                                    this.itemAmount = '';
                                } else {
                                    this.placeOrder_quantityPCS = this.placeOrder_staticQuantityPCS - +quantity;
                                    this.placeOrder_staticQuantityPCS = this.placeOrder_quantityPCS;
                                    this.placeOrder_quantityMT = ((+this.placeOrder_quantityPCS / +this.placeOrder_pcs_Per_Weight) / 1000);
                                    this.placeOrder_staticQuantityMT = this.placeOrder_quantityMT;
                                    this.quantity = '';
                                    this.itemAmount = '';
                                }
                                for (var i = 0; i < this.ArrayData.length; i++) {
                                    this.itemTotal = this.itemTotal + this.ArrayData[i].item_Amount;
                                }
                                if (this.ArrayData.length > 0) {
                                    this.showTable = true;
                                    this.disabledData = true;
                                }
                                this.grandCalculation();
                            });
                    });
            });

    }
    itemArrayCount: number;
    saveData(customerId, branchId, refNum, remarks) {
        if (customerId == undefined || customerId == "") {
            swal("Select Customer");
        } else {
            this.serverService.savePlaceOrderDataToServer(customerId, branchId, refNum, remarks, "INSERT_ORDER")
                .subscribe(Data => {
                    this.ResponseStatus = Data[0].errorCode;
                    this.orderId = Data[0].Id;
                    if (this.ResponseStatus == "0") {
                        this.taxArrayCount = 0;
                        for (var i = 0; i < this.taxArray.length; i++) {
                            this.taxArrayCount++;
                            this.serverService.savePlaceOrderTaxDataToServer(this.orderId, this.taxArray[i].tax_Id, this.taxArray[i].tax_Amount, "INSERT_ORDER_TAX")
                                .subscribe(Data => {
                                    if (this.ResponseStatus == "0") {
                                        if (this.taxArrayCount == this.taxArray.length) {
                                            this.taxArrayCount = 0;
                                            this.itemArrayCount = 0;
                                            for (var i = 0; i < this.ArrayData.length; i++) {
                                                this.itemArrayCount++;
                                                this.serverService.savePlaceOrderDetailDataToServer(this.orderId, this.ArrayData[i].item_Id, this.ArrayData[i].quantity, this.ArrayData[i].uom, this.ArrayData[i].item_Amount, "INSERT_ORDER_DETAIL")
                                                    .subscribe(Data => {
                                                        if (this.itemArrayCount == this.ArrayData.length) {
                                                            this.itemArrayCount = 0;
                                                            this.router.navigate(['./placeOrderView']);
                                                        }
                                                        this.ResponseStatus = Data[0].errorCode;
                                                    },
                                                    error => this.errorMessage = <any>error);
                                            }
                                        }
                                        swal({
                                            position: 'top-end',
                                            type: 'success',
                                            title: 'Your Order has been Placed',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });

                                    }
                                },
                                error => this.errorMessage = <any>error);
                        }

                    }
                },
                error => this.errorMessage = <any>error);
        }

    }
    ngAfterViewInit() {

    }
}



