
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs';
import { Expense, ExpenseStatus, AddExpense, AddClaimExpenseDetails, ClaimExpenseDetails } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./claimExpense.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ClaimExpenseComponent implements OnInit, AfterViewInit {

    expense: Expense[];
    expenseStatus: ExpenseStatus[];


    ExpenseId: number;
    getExpenseId: any;

    ResponseStatus: string;
    expenses: AddExpense[];
    errorMessage: string;
    data: any
    comp_id: number;
    expense_id: number;
    staff_id: number;
    name: string;
    userName: string;
    ip_address: string;
    device_Id: string;
    staff_remarks: string;
    token: string;
    mode: string;

    login_Id: number;
    addExpense = new AddExpense();
    errorCode: string;

    claimExpenseDetails: ClaimExpenseDetails[];

    claimExpenses: AddClaimExpenseDetails[];
    //comp_id: number;
    //expense_id: number;
    Expstatus: number;
    expense_detail_id: number
    from_Date: Date;
    to_Date: Date;
    from_location: string;
    to_location: string;
    bill_amount: number;
    remarks: string;
    //userName:string;
    //ip_address:string;
    //device_Id:string;
    expense_type: number;
    //mode:string;
    //login_Id:number;
    //token:string;
    addClaimExpenseDetails = new AddClaimExpenseDetails();

    constructor(private serverService: ServerService, private router: Router) { }


    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
    redirectToAddPage(RedirectId, StatusID) {
        if (StatusID == 0 || StatusID == 3) {
            this.router.navigate(['./redirectExpense']);
            myGlobals.setRedirectExpenseIDValue(RedirectId);
        }

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

    itemsPerPage: number = 10;
    rowsPerPage: number = 10;
    setPageSize(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage = 10;
        } else {
            this.itemsPerPage = itemsPerPage;
        }
    }

    onSubmit(): void {
        this.serverService.SaveExpenseDataToServers(this.addExpense, 0, "INSERT_EXPENSE")
            .subscribe(ExpenseId => {

                this.getExpenseId = ExpenseId.Id;
                this.addExpense.expense_id = this.getExpenseId;
                myGlobals.setExpenseIDValue(this.addExpense.expense_id);
                this.ResponseStatus = ExpenseId.errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.router.navigate(['./addClaimExpense']);
            },
            error => this.errorMessage = <any>error);
    }

    onStatusChange(statusId) {
        // this.expense.status=statusId;
        this.serverService.getExpenseDataFromServers(0, statusId)
            .subscribe(Data => {
                this.expense = Data;
            });

    }
    delete(DelExpenseId) {
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
                this.addExpense.expense_id = DelExpenseId;

                this.serverService.SaveExpenseDataToServers(this.addExpense, this.addExpense.expense_id, "DELETE_EXPENSE")
                    .subscribe(ExpenseDetailId => {
                        this.getData();
                    },
                    error => this.errorMessage = <any>error);

                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    getData() {
        this.serverService.getExpenseDataFromServers(0, -1)

            .subscribe(Data => {
                this.expense = Data;
            });
    }

    ngOnInit(): void {

        this.serverService.getExpenseDataFromServers(0, -1)

            .subscribe(Data => {
                this.expense = Data;
            });

        this.serverService.getClaimExpenseDetailsDataFromServers(this.addExpense.expense_id, 0, 0)

            .subscribe(Data => {
                this.claimExpenseDetails = Data;
            });

        this.serverService.getExpenseStatusDataFromServers(0, 0)

            .subscribe(Data => {
                this.expenseStatus = Data;

                //new code for status
                this.Expstatus = -1;

            });
    }
    ngAfterViewInit() {

    }
}
