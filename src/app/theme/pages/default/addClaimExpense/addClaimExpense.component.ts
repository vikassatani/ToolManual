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
    templateUrl: "./addClaimExpense.component.html",
    encapsulation: ViewEncapsulation.None,
    //  providers: [ServerService]
})
export class AddClaimExpenseComponent implements OnInit, AfterViewInit {
    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    download1: boolean;

    ShowTable = false;
    show = false;
    selected1 = false;
    selected2 = false;
    selected3 = false;
    selected4 = false;
    ExpType: number;
    getId: number;

    StartDate: Date;
    EndDate: Date;
    expenseType: ExpenseCategory[];

    expense: Expense[];

    ResponseStatus: string;
    errorMessage: string;
    expenses: AddExpense[];
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
    staff_remarks: string;
    TotalAmount: number;
    addExpense = new AddExpense();


    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }


    claimExpenseDetails: ClaimExpenseDetails[];

    claimExpenses: AddClaimExpenseDetails[];
    //comp_id: number;
    //expense_id: number;
    expense_detail_id: number
    from_Date: string;
    to_Date: string;
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


    selectedDDLOPtion: Object = {};
    localdata = [];
    constructor(private serverService: ServerService, private http: Http, private _script: ScriptLoaderService, private router: Router) {

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
    //    getFromDate(fromdate){
    //     this.fromdateTra = new Date(fromdate);
    //     this.fromdateLod = new Date(fromdate);
    //     //    this.date2=new Date();
    //     //    if(fromdate1!=this.date2 ||fromdate1==this.date2 ){
    //     //        if(fromdate1>this.date2 || fromdate1==this.date2){
    //     //            this.fromDate=fromdate1;

    //     //        }
    //     //    }
    //    }

    //    getToDate(todate){
    //     this.todateTra = new Date(todate);
    //     this.todateLod = new Date(todate);
    //     //    this.date2=new Date();
    //     //    if(todate1!=this.date2){
    //     //        if(todate1>this.date2){
    //     //            this.toDate=todate1;

    //     //        }
    //     //    }
    //    }
    //    getFromDate1(fromdate){


    //     // this.date2=new Date();
    //     // if(fromdate1!=this.date2 ||fromdate1==this.date2 ){
    //     //     if(fromdate1>this.date2 || fromdate1==this.date2){
    //     //         this.fromDate=fromdate1;

    //     //     }
    //     // }
    // }

    // getToDate1(todate){


    //     // this.date2=new Date();
    //     // if(todate1!=this.date2){
    //     //     if(todate1>this.date2){
    //     //         this.toDate=todate1;

    //     //     }
    //     // }
    // }
    upload1: string;

    redirect(ExpenseId, ExpenseDDLId, ExpenseDetailId) {
        this.expense_detail_id = ExpenseDetailId;
        if (ExpenseDDLId == 1) {
            this.selected1 = true;
            this.selected2 = false;
            this.selected3 = false;
            this.selected4 = false;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.addClaimExpenseDetails.expense_detail_id = ExpenseDetailId;
            this.serverService.getClaimExpenseDetailsDataFromServers(ExpenseId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {

                    this.getExpenseDetailData(Data);
                });

        } else if (ExpenseDDLId == 2) {
            this.selected1 = false;
            this.selected2 = true;
            this.selected3 = false;
            this.selected4 = false;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.serverService.getClaimExpenseDetailsDataFromServers(ExpenseId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getExpenseDetailData(Data);
                });

        } else if (ExpenseDDLId == 3) {
            this.selected1 = false;
            this.selected2 = false;
            this.selected3 = true;
            this.selected4 = false;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.serverService.getClaimExpenseDetailsDataFromServers(ExpenseId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getExpenseDetailData(Data);

                });
        } else {
            this.selected1 = false;
            this.selected2 = false;
            this.selected3 = false;
            this.selected4 = true;
            this.addClaimExpenseDetails.expense_type = ExpenseDDLId;
            this.serverService.getClaimExpenseDetailsDataFromServers(ExpenseId, ExpenseDDLId, ExpenseDetailId)
                .subscribe(Data => {
                    this.getExpenseDetailData(Data);

                });
        }
    }


    getExpenseDetailData(Data) {
        this.addClaimExpenseDetails.expense_id = Data[0].expense_id;
        this.addClaimExpenseDetails.expense_detail_id = Data[0].expense_detail_id;
        this.addClaimExpenseDetails.from_Date = Data[0].from_Date;
        this.addClaimExpenseDetails.to_Date = Data[0].to_Date;
        this.addClaimExpenseDetails.from_location = Data[0].from_location;
        this.addClaimExpenseDetails.to_location = Data[0].to_location;
        this.addClaimExpenseDetails.bill_amount = Data[0].bill_amount;
        this.addClaimExpenseDetails.remarks = Data[0].remarks;
        this.addClaimExpenseDetails.expense_type = Data[0].expense_type;
        this.addClaimExpenseDetails.image_Name = "http://localhost:57509/Group/Expense/Image/" + Data[0].image_Name;


        this.upload1 = Data[0].image_Name;

        if (this.upload1 == undefined || this.upload1 == "" || this.addClaimExpenseDetails.image_Name == undefined) {
            this.download1 = false;
        }
        else {
            this.download1 = true;
        }



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
                this.addClaimExpenseDetails.expense_type = DelExpenseId;
                this.serverService.SaveClaimExpenseDetailsDataToServers(this.addClaimExpenseDetails, this.addClaimExpenseDetails.expense_type, myGlobals.ExpenseId, this.expense_detail_id, "DELETE_EXPENSE_DETAIL")
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
        this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.ExpenseId, 0, 0)

            .subscribe(Data => {
                this.claimExpenseDetails = Data;
            });
    }

    //  onCancle(){
    //     this.serverService.SaveExpenseDataToServers(this.addExpense, myGlobals.ExpenseId,"INSERT_EXPENSE")
    //     .subscribe(addExpense => {

    //     },
    //     error => this.errorMessage = <any>error);


    // }

    onSelect(value) {

        this.addClaimExpenseDetails.from_location = null;
        this.addClaimExpenseDetails.to_location = null;
        this.addClaimExpenseDetails.remarks = null;
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

    //    compareTwoDates(StartDate,EndDate)
    //    {
    //     if(StartDate > EndDate)
    //    }

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
        this.ShowTable = true;

        this.serverService.SaveClaimExpenseDetailsDataToServers(this.addClaimExpenseDetails, this.ExpType, myGlobals.ExpenseId, this.expense_detail_id, "INSERT_EXPENSE_DETAIL")
            .subscribe(addClaimExpenseDetails => {
                // this.getId=addClaimExpenseDetails.Id;

                if (this.count == 2) {
                    this.getDetailData(this.file1)
                }

                this.serverService.getClaimExpenseDetailsDataFromServers(myGlobals.ExpenseId, 0, 0)

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

                    this.show = true;
                }


                this.addClaimExpenseDetails.from_location = null;
                this.addClaimExpenseDetails.to_location = null;
                this.addClaimExpenseDetails.remarks = null;
                this.addClaimExpenseDetails.bill_amount = null;
                this.addExpense.expense_id = null;
                this.expenseType = [];
                this.count = 0;
                //   this.addClaimExpenseDetails.from_Date=new Date(Date.now());
                //  this.addClaimExpenseDetails.to_Date=new Date(Date.now());

            },
            error => this.errorMessage = <any>error);

    }

    dd: any;
    mm: any;
    yyyy: any;
    today: any;
    ngOnInit(): void {
        //  this.addClaimExpenseDetails.from_location='';
        this.addClaimExpenseDetails.remarks = null;
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
        this.addClaimExpenseDetails.from_location = '';
        this.addClaimExpenseDetails.to_location = '';
        this.serverService.getExpenseDataFromServers(myGlobals.ExpenseId, -1)
            .subscribe(Data => {
                this.addExpense.expense_id = Data[Data.length - 1].expense_id;
                this.addExpense.name = Data[Data.length - 1].name;

                //this.comp_name=Company.comp_name;
            });

        //  this.serverService.getExpenseDataFromServers(0,-1)

        //    .subscribe(Data => {
        //        this.expense= Data;
        //    });

        this.serverService.getExpenseCategoryDataFromServers(0, 0)

            .subscribe(Data => {
                this.expenseType = Data;
            });

        // this.serverService.getExpenseDataFromServers(0)

        // .subscribe(Data => {
        //     this.expense= Data;
        // });



    }

    SubmitForApproval() {


        this.serverService.SaveExpenseDataToServers(this.addExpense, myGlobals.ExpenseId, "INSERT_EXPENSE")
            .subscribe(addExpense => {

            },
            error => this.errorMessage = <any>error);


        this.serverService.SaveSubmitForApprovalClaimExpense(this.addExpense, myGlobals.ExpenseId, "SEND_FOR_APPROVAL")
            .subscribe(addClaimExpense => {
                this.ResponseStatus = addClaimExpense[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal("Sent For Approval");
                    this.router.navigate(['./claimExpense']);
                }
            });


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
    val1: any
    val2: any
    count: number;
    ResponseCode: number;
    fileuploaderFileChange(event) {

        this.count = 2;
        this.val1 = myGlobals.ExpenseId
        this.val2 = this.expense_detail_id
        let file = event[0];
        this.getDetailData(file)



    }


    file1: any;
    getDetailData(file) {

        this.file1 = file
        this.val1 = myGlobals.ExpenseId
        this.val2 = this.expense_detail_id

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
                //    if(this.ResponseCode=="0000")
                //    {
                //    swal({
                //        position: 'top-end',
                //        type: 'success',
                //        title: 'Your Data has been saved',
                //        showConfirmButton: false,
                //        timer: 1500
                //      });
                //    }
            })

    }


}
