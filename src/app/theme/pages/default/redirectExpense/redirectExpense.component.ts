import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Expense, AddExpense, ExpenseCategory, ClaimExpenseDetails, AddClaimExpenseDetails } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import * as myGlobals from '../../../../Global';
import { Router } from '@angular/router';
declare var $;
import swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./redirectExpense.component.html",
    encapsulation: ViewEncapsulation.None,
    //  providers: [DatePipe]
})
export class RedirectComponent implements OnInit, AfterViewInit {
    approver_remarks: string;
    selected1 = false;
    selected2 = false;
    selected3 = false;
    selected4 = false;
    ExpType: number;
    getId: number;
    ResponseStatus: string;

    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    download1: boolean;
    path: string;

    expenseType: ExpenseCategory[];

    expense: Expense[];

    errorMessage: string;
    expenses: AddExpense[];
    //    addExpense1:AddExpense[];

    comp_id: number;
    expense_id: number;
    staff_id: number;
    name: string;
    userName: string;
    ip_address: string;
    device_Id: string;
    // token:string;
    mode: string;
    login_Id: number;
    TotalAmount: number;
    addExpense = new AddExpense();
    //    addExpense1= new AddExpense();


    claimExpenseDetails: ClaimExpenseDetails[];

    claimExpenses: AddClaimExpenseDetails[];
    expense_detail_id: number
    from_Date: string;
    to_Date: string;
    from_location: string;
    to_location: string;
    bill_amount: number;
    remarks: string;
    expense_type: number;
    image_Name: string;
    addClaimExpenseDetails = new AddClaimExpenseDetails();


    selectedDDLOPtion: Object = {};
    localdata = [];
    constructor(private serverService: ServerService, private http: Http, private router: Router) {

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


    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }




    date2: Date;
    todate1: Date;
    fromdate1: Date;
    toDate: Date;
    fromDate: Date;
    fromdateLod: Date;
    todateLod: Date;
    fromdateTra: Date;
    todateTra: Date;
    // getFromDate(fromdate){
    //     let fromdate1 = new Date(fromdate);
    //     this.date2=new Date();
    //     if(fromdate1!=this.date2 ||fromdate1==this.date2 ){
    //         if(fromdate1>this.date2 || fromdate1==this.date2){
    //             this.fromDate=fromdate1;

    //         }
    //     }
    // }

    // getToDate(todate){
    //     let todate1 = new Date(todate);
    //     this.date2=new Date();
    //     if(todate1!=this.date2){
    //         if(todate1>this.date2){
    //             this.toDate=todate1;

    //         }
    //     }
    // }
    upload1: string;

    redirect(ExpenseId, ExpenseDDLId, ExpenseDetailId) {
        this.ExpType = ExpenseDDLId;
        this.expense_detail_id = ExpenseDetailId;
        this.val2 = this.expense_detail_id
        if (ExpenseDDLId == 1) {
            this.selected1 = true;
            this.selected2 = false;
            this.selected3 = false;
            this.selected4 = false;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.addClaimExpenseDetails.expense_detail_id = ExpenseDetailId;
            this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.RedirectId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getDropDownData(Data);

                });

        } else if (ExpenseDDLId == 2) {
            this.selected1 = false;
            this.selected2 = true;
            this.selected3 = false;
            this.selected4 = false;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.RedirectId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getDropDownData(Data);
                });

        } else if (ExpenseDDLId == 3) {
            this.selected1 = false;
            this.selected2 = false;
            this.selected3 = true;
            this.selected4 = false;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.RedirectId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getDropDownData(Data);
                });
        } else {
            this.selected1 = false;
            this.selected2 = false;
            this.selected3 = false;
            this.selected4 = true;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.RedirectId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getDropDownData(Data);
                });
        }
    }

    getDropDownData(Data) {
        this.addClaimExpenseDetails.expense_id = Data[0].expense_id;
        this.addClaimExpenseDetails.expense_detail_id = Data[0].expense_detail_id;
        this.addClaimExpenseDetails.from_Date = Data[0].from_Date;
        this.addClaimExpenseDetails.to_Date = Data[0].to_Date;
        this.addClaimExpenseDetails.from_location = Data[0].from_location;
        this.addClaimExpenseDetails.to_location = Data[0].to_location;
        this.addClaimExpenseDetails.bill_amount = Data[0].bill_amount;
        this.addClaimExpenseDetails.remarks = Data[0].remarks;
        this.addClaimExpenseDetails.expense_type = Data[0].expense_type;
        this.addClaimExpenseDetails.image_Name = this.path + Data[0].image_Name;


        this.upload1 = Data[0].image_Name;

        if (this.upload1 == undefined || this.upload1 == "" || this.addClaimExpenseDetails.image_Name == undefined || this.path == undefined) {
            this.download1 = true;
        }
        else {
            this.download1 = false;
        }

        // this.addClaimExpenseDetails.expense_type= Data[0].expense_type;
    }
    delete(DelExpenseId, expType, expDetailId) {
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
                this.addClaimExpenseDetails.expense_id = DelExpenseId;
                this.addClaimExpenseDetails.expense_type = expType;
                this.addClaimExpenseDetails.expense_detail_id = expDetailId;
                this.serverService.SaveClaimExpenseDetailsDataToServers(this.addClaimExpenseDetails, this.addClaimExpenseDetails.expense_type, this.addClaimExpenseDetails.expense_id, this.addClaimExpenseDetails.expense_detail_id, "DELETE_EXPENSE_DETAIL")
                    .subscribe(ExpenseDetailId => {
                        this.ResponseStatus = ExpenseDetailId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getData();
                    },
                    error => this.errorMessage = <any>error);


            }
        })
    }

    getData() {
        this.serverService.getClaimExpenseDetailsDataFromServers(this.addClaimExpenseDetails.expense_id, 0, 0)

            .subscribe(Data => {
                this.claimExpenseDetails = Data;
            });
    }

    onSubmit(val, fromDate, toDate): void {
        if (val == 1) {
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            if (fromDate > toDate) {
                swal("From Date is Greater than To Date");
            } else {
                this.DataSave();
            }
        } else if (val == 2) {
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            if (fromDate > toDate) {
                swal("From Date is Greater than To Date");
            } else { this.DataSave(); }
        } else {
            this.DataSave();
        }
    }
    DataSave() {

        this.serverService.SaveClaimExpenseDetailsDataToServers(this.addClaimExpenseDetails, this.ExpType, myGlobals.RedirectId, this.expense_detail_id, "INSERT_EXPENSE_DETAIL")
            .subscribe(addClaimExpenseDetails => {
                this.getId = addClaimExpenseDetails.Id;

                if (this.count == 2) {
                    this.getDetailData(this.file1)
                }
                this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.RedirectId, 0, 0)

                    .subscribe(Data => {
                        this.claimExpenseDetails = Data;
                        this.TotalAmount = 0;
                        for (var i = 0; i < this.claimExpenseDetails.length; i++) {
                            this.TotalAmount = this.TotalAmount + this.claimExpenseDetails[i].bill_amount;
                        }
                    });
                this.ResponseStatus = addClaimExpenseDetails[0].errorCode;
                if (this.ResponseStatus == "0") {

                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.addClaimExpenseDetails.from_location = '';
                this.addClaimExpenseDetails.remarks = '';
                this.addClaimExpenseDetails.bill_amount = null;
                //   this.addClaimExpenseDetails.from_Date=new Date(Date.now());
                //   this.addClaimExpenseDetails.to_Date=new Date(Date.now());
                this.addClaimExpenseDetails.to_location = '';
                this.count = 0;


            },
            error => this.errorMessage = <any>error);
    }

    onSelect(value) {

        this.addClaimExpenseDetails.from_location = '';
        this.addClaimExpenseDetails.to_location = '';
        this.addClaimExpenseDetails.remarks = '';
        this.addClaimExpenseDetails.bill_amount = null;

        this.expense_detail_id = 0;
        this.ExpType = value;
        if (value == 1) {
            this.selected1 = true;
            this.selected2 = false;
            this.selected3 = false;
            this.selected4 = false;
        } else if (value == 2) {
            this.selected1 = false;
            this.selected2 = true;
            this.selected3 = false;
            this.selected4 = false;

        } else if (value == 3) {
            this.selected1 = false;
            this.selected2 = false;
            this.selected3 = true;
            this.selected4 = false;
        } else {
            this.selected1 = false;
            this.selected2 = false;
            this.selected3 = false;
            this.selected4 = true;
        }

    }

    dd: any;
    mm: any;
    yyyy: any;
    today: any;

    ngOnInit() {



        this.addClaimExpenseDetails.remarks = '';
        this.addClaimExpenseDetails.bill_amount = null;
        this.today = new Date();
        this.dd = this.today.getDate();
        this.mm = this.today.getMonth() + 1; //January is 0!
        this.yyyy = this.today.getFullYear();
        if (this.dd < 10) {
            this.dd = '0' + this.dd
        }
        if (this.mm < 10) {
            this.mm = '0' + this.mm
        }
        this.today = this.mm + '/' + this.dd + '/' + this.yyyy;
        this.addClaimExpenseDetails.from_Date = this.today;
        this.addClaimExpenseDetails.to_Date = this.today;
        this.fromdateTra = new Date(this.today);
        this.todateTra = new Date(this.today);
        this.fromdateLod = new Date(this.today);
        this.todateLod = new Date(this.today);
        this.addClaimExpenseDetails.to_location = '';


        if (myGlobals.RedirectId > 0) {

            this.serverService.getCustomerPath('GET_EXPENSE_DOCUMENT_PATH')
                .subscribe(Data => {
                    this.path = Data[0].Name;
                });

            this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.RedirectId, 0, 0)

                .subscribe(Data => {
                    this.claimExpenseDetails = Data;

                    this.TotalAmount = 0;
                    for (var i = 0; i < this.claimExpenseDetails.length; i++) {
                        this.TotalAmount = this.TotalAmount + this.claimExpenseDetails[i].bill_amount;
                    }

                });

        }

        this.serverService.getExpenseDataFromServers(myGlobals.RedirectId, -1)

            .subscribe(Data => {
                this.expense = Data;
                this.addExpense.name = Data[0].name;
                this.val1 = myGlobals.RedirectId

            });
        this.serverService.getExpenseCategoryDataFromServers(0, 0)

            .subscribe(Data => {
                this.expenseType = Data;
            });
    }

    SubmitForApproval() {


        this.serverService.SaveExpenseDataToServers(this.addExpense, myGlobals.RedirectId, "INSERT_EXPENSE")
            .subscribe(addExpense => {

            },
            error => this.errorMessage = <any>error);


        this.serverService.SaveSubmitForApprovalClaimExpense(this.addExpense, myGlobals.RedirectId, "SEND_FOR_APPROVAL")
            .subscribe(addClaimExpense => {
                this.ResponseStatus = addClaimExpense[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal("Sent For Approval");
                    this.router.navigate(['./claimExpense']);
                }
            });


    }
    onCancle() {
        this.serverService.SaveExpenseDataToServers(this.addExpense, myGlobals.RedirectId, "INSERT_EXPENSE")
            .subscribe(addExpense => {

            },
            error => this.errorMessage = <any>error);

        this.router.navigate(['./claimExpense']);
    }

    ngAfterViewInit() {
        var BootstrapDatepicker = function() {
            var t = function() {
                $("#m_datepicker_1, #m_datepicker_1_validate").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_1_modal").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_2, #m_datepicker_2_validate").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_2_modal").datepicker({ todayHighlight: !0, orientation: "bottom left", templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_3, #m_datepicker_3_validate").datepicker({ todayBtn: "linked", clearBtn: !0, todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_3_modal").datepicker({ todayBtn: "linked", clearBtn: !0, todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_4_1").datepicker({ orientation: "top left", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_4_2").datepicker({ orientation: "top right", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_4_3").datepicker({ orientation: "bottom left", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_4_4").datepicker({ orientation: "bottom right", todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }),
                    $("#m_datepicker_5").datepicker({ todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } }), $("#m_datepicker_6").datepicker({ todayHighlight: !0, templates: { leftArrow: '<i class="la la-angle-left"></i>', rightArrow: '<i class="la la-angle-right"></i>' } })
            }; return { init: function() { t() } }
        }(); jQuery(document).ready(function() { BootstrapDatepicker.init() });

    }
    file: any;
    ResponseCode: string;
    fileuploaderFileChange(event) {

        let file = event[0];
        this.getDetailData(file);

    }

    val1: any
    val2: any
    count: number;
    file1: any;
    getDetailData(file) {
        this.count = 2;
        this.file1 = file


        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);

        let headers = new Headers()
        headers.append('compId', this.compId);
        headers.append('expenseId', this.val1);
        headers.append('loginid', this.loginId);
        headers.append('token', this.token);
        headers.append('expenseDetailId', this.val2);
        headers.append('filepath', 'Group/Expense/Image');
        headers.append('filename', file.name);
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:57509/api/Expense/DocumentUpdate", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            Data => {
                this.ResponseCode = Data.ResponseCode;
                if (this.ResponseCode == "0000") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }


}