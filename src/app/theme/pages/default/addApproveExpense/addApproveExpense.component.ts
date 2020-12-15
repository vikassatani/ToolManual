import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Expense, AddExpense, ExpenseCategory, ClaimExpenseDetails, ApproverExpense, AddApproverExpense, AddClaimExpenseDetails, ApproverExpenseDetails } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addApproveExpense.component.html",
    encapsulation: ViewEncapsulation.None,
    //  providers: [DatePipe]
})
export class AddApproveExpenseComponent implements OnInit, AfterViewInit {


    approverExpenseDetails: ApproverExpenseDetails[];
    approverExpense: ApproverExpense[];

    TotalAmount: number;
    approves: AddApproverExpense[];
    errorMessage: string;
    approver_remarks: string;
    status: number;
    userName: string;
    ip_address: string;
    device_Id: string;
    expense_id: string;
    mode: string;
    login_Id: number;
    token: string;
    addApproverExpense = new AddApproverExpense();
    ResponseStatus: string;



    // approver:AddApproverExpenseDetails[];
    // name:string;
    // expense_detail_id:number;
    // addApproverExpenseDetails=new  AddApproverExpenseDetails();






    constructor(private serverService: ServerService, private router: Router) { }

    SubmitForApproval() {
        this.SendRemarksData(2);
        // swal("approved");
    }
    SubmitForRejected() {
        this.SendRemarksData(4);
        // swal("rejected");
    }
    NeedsModifications() {
        this.SendRemarksData(3);
        // swal("Needs Modification");

    }
    SendRemarksData(statusId) {
        this.serverService.SaveApproverExpenseDataToServers(this.addApproverExpense, myGlobals.RedirectId, statusId, "APPROVER_EXPENSE_UPDATE")
            .subscribe(addApproverExpense => {
                this.ResponseStatus = addApproverExpense[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.router.navigate(['./approveExpense']);
                }
            },
            error => this.errorMessage = <any>error);


        // this.serverService.SaveApproverExpenseDetailsDataToServers(this.addApproverExpenseDetails,myGlobals.RedirectId,statusId,"APPROVER_EXPENSEDETAIL_UPDATE")
        // .subscribe(addApproverExpenseDetails => {

        // },
        // error => this.errorMessage = <any>error);

    }


    ngOnInit(): void {

        //     this.serverService.getApproveExpenseName(myGlobals.RedirectId,0)

        // .subscribe(Data => {
        //     this.approverExpense= Data;
        // });


        this.serverService.getApproveExpenseDetailsDataFromServers(myGlobals.RedirectId)
            .subscribe(Data => {
                //  this.addApproverExpenseDetails.expense_id=Data[0].expense_id;
                //  this.addApproverExpenseDetails.name= Data[0].name;
            });


        this.serverService.getApproveExpenseDataFromServers(1, myGlobals.RedirectId, -1, 'GET_APPROVER_EXPENSE')

            .subscribe(Data => {
                this.approverExpense = Data;
                this.addApproverExpense.name = Data[0].name;
            });

        this.serverService.getApproveExpenseDetailsDataFromServers(myGlobals.RedirectId)

            .subscribe(Data => {
                this.approverExpenseDetails = Data;
                this.TotalAmount = 0;
                for (var i = 0; i < this.approverExpenseDetails.length; i++) {
                    this.TotalAmount = this.TotalAmount + this.approverExpenseDetails[i].bill_amount;
                }

            });
    }


    fileuploaderFileChange(files: FileList) {

    }
    ngAfterViewInit() {

    }

}