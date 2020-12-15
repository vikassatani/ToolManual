import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { CutomerApproval, AppCustomer, Status, LeaveStatus } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { RATING_CONTROL_VALUE_ACCESSOR } from 'ngx-bootstrap/rating/rating.component';
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./approveCustomer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ApproveCustomerComponent implements OnInit, AfterViewInit {
    status: Status[];
    show = true;
    show1 = true;
    selected12 = true;
    selected13 = false;

    leaveStatusDDL: LeaveStatus[];
    cutomerApproval: CutomerApproval[];

    appcustomers: AppCustomer[];
    comp_Id: number;
    customer_Id: number;
    status1: number;
    mode: string;
    errorMessage: string;
    ResponseStatus: string;
    appcustomer = new AppCustomer();



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



    constructor(private serverService: ServerService, private router: Router) {

    }

    SubmitForApproval(cusID) {
        // this.show=true;
        // this.show1=false;

        this.serverService.ApproveAndRejectCustomerApprovalData(this.appcustomer, cusID, 1, "APPROVE_CUSTOMER")
            .subscribe(appcustomer => {

                this.serverService.getCustomerApprovalData(0, 0)

                    .subscribe(Data => {
                        this.cutomerApproval = Data;
                    });
                this.ResponseStatus = appcustomer[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'customer is Approved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            },
            error => this.errorMessage = <any>error);

    }

    onStatusChange(StatusId) {

        if (StatusId == 0) {
            this.selected12 = true;
            this.selected13 = false;

        }
        else {
            this.selected12 = false;
            this.selected13 = true;

        }
        this.serverService.getCustomerApprovalData(0, StatusId)

            .subscribe(Data => {
                this.cutomerApproval = Data;
            });

    }

    SubmitForRejected(cusID) {
        // this.show=false;
        // this.show1=true;

        this.serverService.ApproveAndRejectCustomerApprovalData(this.appcustomer, cusID, 2, "APPROVE_CUSTOMER")
            .subscribe(appcustomer => {


                this.serverService.getCustomerApprovalData(0, 0)

                    .subscribe(Data => {
                        this.cutomerApproval = Data;
                    });
                this.ResponseStatus = appcustomer[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Customer is Rejected',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            },
            error => this.errorMessage = <any>error);

    }

    ngOnInit() {

        this.show = false;
        this.show1 = false;

        this.serverService.getCustomerApprovalData(0, 0)

            .subscribe(Data => {
                this.cutomerApproval = Data;
            });


        this.serverService.getApproveLeaveStatusDataFromServers(0, 0)
            .subscribe(Data => {
                this.leaveStatusDDL = Data;
            });
    }


    redirect(customersId) {
        this.router.navigate(['./addApproveCustomer']);
        myGlobals.setCustomerIDValue(customersId, 0);
    }

    ngAfterViewInit() {


    }

}