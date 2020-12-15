import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit, TemplateRef } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { OrderApproval, Branch } from '../../../../componentDetails';
import { AddCustomer, Employee, Customerstatus, TargetCustomerTarget, Country, State, City, InventoryClassificationLevelWise, CustomerTarget, CustomerType, ModeOfPayment } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import {Popup} from 'ng2-opd-popup';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./orderApproval.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class OrderApprovalComponent implements OnInit, AfterViewInit {
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;


    statusId: number;
    branchId: number;
    branch: any;
    orderId: number;
    customerId: number;
    ShowDetails: boolean;
    orderApproval: OrderApproval[];
    orderApprovalHistory: OrderApproval[];


    errorMessage: String;
    ResponseStatus: string;
    // orderApprovalDetail:OrderApproval[];
    orderApprovalDetailedData: OrderApproval[];
    orderApprovalHistoryDetailedData: OrderApproval[];

    orderApprovalDetail = new OrderApproval();
    orderApprovalHistoryDetail = new OrderApproval();


    // Customer Use //
    employee: Employee[];
    customerType: CustomerType[];
    modeOfPayment: ModeOfPayment[];
    customerStatus: Customerstatus[];
    customerTarget: CustomerTarget[];
    country: Country[];
    state: State[];
    city: City[];
    customer = new AddCustomer();

    // END Customer Use //
    modalRef: BsModalRef;
    constructor(private serverService: ServerService, private modalService: BsModalService) { }


    getState(Countyid) {
        this.serverService.getStateDataFromServers(Countyid)
            .subscribe(Data => {
                this.state = Data;
            });
    }

    getCity(Countyid, StateId) {
        this.serverService.getCityDataFromServers(Countyid, StateId)
            .subscribe(Data => {
                this.city = Data;
            });
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

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    ngOnInit(): void {
        this.ShowDetails = false;
        this.branch = [{ 'branch_id': 0, 'branch_Name': '' }]
        this.statusId = 1;
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
    getData(branchId, order, status) {
        this.serverService.getOrderApprovalDataFromServers(branchId, order, 0, status, "GET_ORDER_MANAGER", this.customerId)
            .subscribe(Data => {
                this.orderApproval = Data;
            })
    }
    showDetailedData(branchId, order, approval, customer) {
        if (approval == 1) {
            this.ShowDetails = true;
            this.branchId = branchId;
            this.orderId = order;
            this.customerId = customer;
            this.serverService.getOrderApprovalDataFromServers(branchId, order, 0, 0, "GET_ORDER_MANAGER", this.customerId)
                .subscribe(Data => {
                    this.orderApprovalDetail = Data[0];
                })
            this.serverService.getOrderApprovalDataFromServers(0, order, 0, 0, "GET_ORDER_DETAIL", this.customerId)
                .subscribe(Data => {
                    this.orderApprovalDetailedData = Data;
                })
        }
    }
    showHistoryDetailedData(branchId, order, approval, customer) {
        if (approval == 1) {
            this.ShowDetails = true;
            this.branchId = branchId;
            this.orderId = order;
            this.customerId = customer;
            this.serverService.getOrderApprovalDataFromServers(branchId, order, 0, 0, "GET_ORDER_MANAGER", this.customerId)
                .subscribe(Data => {
                    this.orderApprovalHistoryDetail = Data[0];
                })
            this.serverService.getOrderApprovalDataFromServers(0, order, 0, 0, "GET_ORDER_DETAIL", this.customerId)
                .subscribe(Data => {
                    this.orderApprovalHistoryDetailedData = Data;
                })
        }
    }
    approveData(status, approve, remarks) {
        this.statusId = status;
        this.serverService.updateOrderApproval(this.orderId, approve, remarks, "UPDATE_MANAGER")
            .subscribe(Data => {
                this.ResponseStatus = Data[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.ShowDetails = false;
                    this.serverService.getOrderApprovalDataFromServers(this.branchId, 0, 0, status, "GET_ORDER_MANAGER", this.customerId)
                        .subscribe(Data => {
                            this.orderApproval = Data;
                        })
                }
            },
            error => this.errorMessage = <any>error);
    }
    getCustomerDetails() {
        this.serverService.getCountryDataFromServers()
            .subscribe(Data => {
                this.country = Data;
            });

        this.serverService.getEmployeeDataFromServers(0, 0)
            .subscribe(Data => {
                this.employee = Data;
            });
        this.serverService.getCustomerTypeDataFromServers()
            .subscribe(Data => {
                this.customerType = Data;
            });
        this.serverService.getModeOfPaymentDataFromServers()
            .subscribe(Data => {
                this.modeOfPayment = Data;
            });
        this.serverService.getcustomerStatusDataFromServers()
            .subscribe(Data => {
                this.customerStatus = Data;
            });
        this.serverService.getCustomerDataFromServers(this.customerId, -1)
            .subscribe(Data => {
                this.customer.customer_Id = Data[0].customer_Id;
                this.customer.salesman = Data[0].salesman;
                this.customer.reffered_By = Data[0].reffered_By;
                this.customer.contact_Person_Name = Data[0].contact_Person_Name;
                this.customer.customer_Type = Data[0].customer_Type;
                this.customer.contact_Person_designation = Data[0].contact_Person_designation;
                this.customer.customer_Name = Data[0].customer_Name;
                this.customer.customer_Phone_Number = Data[0].customer_Phone_Number;
                this.customer.contact_Person_Mobile_Number = Data[0].contact_Person_Mobile_Number;
                this.customer.customer_Email = Data[0].customer_Email;
                this.customer.contact_Person_Email = Data[0].customer_Email;
                this.customer.nature_Of_Buisness = Data[0].nature_Of_Buisness;
                this.customer.annual_Turnover = Data[0].annual_Turnover;
                this.customer.credit_Limit = Data[0].credit_Limit;
                this.customer.credit_days = Data[0].credit_days;
                this.customer.mode_Of_Payment = Data[0].mode_Of_Payment;
                this.customer.current_Address = Data[0].current_Address;
                this.customer.current_State = Data[0].current_State;
                this.customer.current_City = Data[0].current_City;
                this.customer.current_Country = Data[0].current_Country;
                this.customer.shipping_Address = Data[0].shipping_Address;
                this.customer.shipping_City = Data[0].shipping_City;
                this.customer.shipping_State = Data[0].shipping_State;
                this.customer.shipping_Country = Data[0].shipping_Country;
                this.customer.current_Zipcode = Data[0].current_Zipcode;
                this.customer.shipping_Zipcode = Data[0].shipping_Zipcode;
                this.customer.pan_Number = Data[0].pan_Number;
                this.customer.tin_Number = Data[0].tin_Number;
                this.customer.gst_Number = Data[0].gst_Number;
                this.customer.buisness_Start_Date = Data[0].buisness_Start_Date;
                this.customer.status = Data[0].status;
            });
        this.serverService.getOrderApprovalDataFromServers(this.branchId, this.orderId, this.customerId, 0, "GET_CUSTOMER_HISTORY", this.customerId)
            .subscribe(Data => {
                this.orderApprovalHistory = Data;
            })
    }

    downloadExcelorder() {


        var downloadSalesReport = [{
            order_Ref_Number: "Order Ref Number", customer_Name: "Customer Name",
            order_Date: "order Date", staff_Name: "Employee Name", staff_Remarks: "Employee Remarks",

            Item_Name: "Item Name", quantity: "quantity", uom_Name: "uom_Name", price: "price", total_tax_Amount: "total_tax_Amount", total_Amount: "total_Amount"
        }]



        //  downloadSalesReport [0] ={'order_Ref_Number':this.orderApprovalDetail.order_Ref_Number,
        //  'customer_Name':this.orderApprovalDetail.customer_Name,
        //  'order_Date':(this.orderApprovalDetail.order_Date),
        //  'staff_Name':this.orderApprovalDetail.staff_Name,
        //  'staff_Remarks':this.orderApprovalDetail.staff_Remarks,
        //   }

        for (var i = 0; i < this.orderApprovalDetailedData.length; i++) {
            downloadSalesReport[i + 1] = {
                'order_Ref_Number': this.orderApprovalDetail.order_Ref_Number,
                'customer_Name': this.orderApprovalDetail.customer_Name,
                'order_Date': (this.orderApprovalDetail.order_Date),
                'staff_Name': this.orderApprovalDetail.staff_Name,
                'staff_Remarks': this.orderApprovalDetail.staff_Remarks,

                'Item_Name': this.orderApprovalDetailedData[i].Item_Name,
                'quantity': this.orderApprovalDetailedData[i].quantity,
                'uom_Name': this.orderApprovalDetailedData[i].uom_Name,
                'price': this.orderApprovalDetailedData[i].price,
                'total_tax_Amount': this.orderApprovalDetail.total_tax_Amount,
                'total_Amount': this.orderApprovalDetail.total_Amount
            }

        }

        new Angular2Csv(downloadSalesReport, 'Order Details');
    }




    ngAfterViewInit() {

    }
}
