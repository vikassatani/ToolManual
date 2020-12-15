
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs';
import { Expense, ExpenseStatus, AddExpense, AddClaimExpenseDetails, ClaimExpenseDetails, AddApproverExpense, ApproverExpense } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./approveExpense.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ApproveExpenseComponent implements OnInit, AfterViewInit {
    expenseStatus: ExpenseStatus[];
    expenseStatus1: ExpenseStatus[];
    approverExpense: ApproverExpense[];
    len: number;
    approves: AddApproverExpense[];
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

    expense: Expense[];


    approverStatus: number;

    //sorting
    key: string = '';
    reverse: boolean = false;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    //pagination
    p: number = 1;

    itemsPerPage: number = 10;
    rowsPerPage: number = 10;
    setPageSize(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage = 10;
        } else {
            this.itemsPerPage = itemsPerPage;
        }
    }

    constructor(private serverService: ServerService, private router: Router) { }

    redirect(RedirectId, statusId) {
        if (statusId == 1) {
            this.router.navigate(['./addApproveExpense']);
            myGlobals.setRedirectExpenseIDValue(RedirectId);
        }
    }
    ngOnInit(): void {

        this.serverService.getApproveExpenseDataFromServers(1, 0, 1, 'GET_APPROVER_EXPENSE')

            .subscribe(Data => {
                this.approverExpense = Data;
            });

        // this.serverService.getApproveExpenseDataFromServers(1,0,-1)

        // .subscribe(Data => {
        //     this.approverExpense= Data;
        // });

        this.serverService.getExpenseStatusDataFromServers(0, 0)
            .subscribe(Data => {
                this.expenseStatus = Data;
                this.expenseStatus.splice(0, 1);

                this.approverStatus = 1;

                // this.len = Data.length;
                //  if(Data){
                //     for(var i=0;i<this.expenseStatus.length-1;i++){
                //         this.expenseStatus[i]=this.expenseStatus[i+1];
                //     }
                //     this.expenseStatus.splice(this.len-1,1);
                //  }
            });
    }


    onStatusChange(statusId) {
        // this.expense.status=statusId;
        this.serverService.getApproveExpenseDataFromServers(1, 0, statusId, 'GET_APPROVER_EXPENSE')

            .subscribe(Data => {
                this.approverExpense = Data;
            });
    }


    ngAfterViewInit() {

    }
}
// <h5>Model<font color="#FF0000">*</font></h5>