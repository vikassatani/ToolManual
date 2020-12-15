
import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit, Directive } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Http, ResponseContentType, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {
    Addpaymode, Customercategoryselect, AddCuscategoty, AddCustomer, Employee, CustomerPath
    , Customerstatus, Docmentupload, TargetCustomerTarget, Country, State, City, InventoryClassificationLevelWise, CustomerTarget,
    CustomerType, ModeOfPayment
} from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Cluster } from '../../../../componentDetails';
import { CustomerComponent } from '../customer/customer.component';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';
import { ElementRef } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/Rx';
declare var $;
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addCustomer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddCustomerComponent implements OnInit, AfterViewInit {
    // readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    // readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    // readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    // readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    // readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    // readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    // readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    // readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;
    Doc: Docmentupload[];
    customerId: number;
    loginid: number;
    documentType: string;
    Docs = new Docmentupload();


    showMybutton: boolean = false;
    customerStatus: Customerstatus[];
    submitted = false;
    isEdited = false;

    employee: Employee[];
    customerType: CustomerType[];
    modeOfPayment: ModeOfPayment[];

    cluster: Cluster[];
    customerTarget: CustomerTarget[];
    country: Country[];
    state: State[];
    city: City[];

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }
    clusterData: InventoryClassificationLevelWise[];

    omit_special_char(event) {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }


    numberAndSpecial(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 91 && charCode != 92 && charCode != 93 && charCode != 94 && charCode != 95 && charCode != 96 && (charCode < 65 || charCode > 123))
            return false;
        return true;
    }


    onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    cusPath: CustomerPath[];
    path: string;


    delcatgory = new AddCuscategoty();
    categorylists: AddCuscategoty[];
    errorMessage1: string;
    ResponseStatus1: string;
    categorytype: AddCuscategoty[];



    customers: AddCustomer[];
    errorMessage: String;
    CustomerId: number;
    AddCustomer: number;
    getCustomerId: any;


    ResponseStatus: string;
    comp_Id: number;
    customer_Id: number;
    salesman: number;
    reffered_By: string;
    contact_Person_Name: string;
    customer_Type: number;
    contact_Person_designation: string;
    customer_Name: string;
    customer_Phone_Number: string;
    contact_Person_Mobile_Number: string;
    customer_Email: string;
    contact_Person_Email: string;
    nature_Of_Buisness: string;
    annual_Turnover: Float32Array;
    credit_Limit: Float32Array;
    credit_days: number;
    mode_Of_Payment: number;
    current_Address: string;
    current_State: number;
    current_City: number;
    current_Country: number;
    shipping_Address: string;
    shipping_City: number;
    shipping_State: number;
    shipping_Country: number;
    current_Zipcode: string;
    shipping_Zipcode: string;
    pan_Number: string;
    tin_Number: string;
    gst_Number: string;
    status: number;
    userId: string;
    buisness_Start_Date: string;
    login_Id: number;
    visiting_card: string;
    visiting_card_back: string;
    id_Card_Proof: string;
    gst_Certificate: string;
    address_Proof: string;
    // token:string;
    mode: string;

    //new code for customer code
    cust_code: String;
    sub_code: String;
    customer_category: number;
    whatssup: string;

    customer = new AddCustomer();
    categorylist = new AddCuscategoty();
    showMyupdate: boolean = false;
    showMyinsert: boolean = true;
    category_name: string;
    customer_category_name: string;


    paymodelist = new Addpaymode();
    showpaymodeinsert: boolean = true;
    showpaymodeupdate: boolean = false;
    getpaymodelist: Addpaymode[];
    delpaymode = new Addpaymode();




    targets: TargetCustomerTarget[];
    //comp_Id:number;
    //customer_Id:number;
    cluster_Id: number;
    target_Quantity: string;
    //status:number;
    //login_Id:number;
    //token:string;
    userName: string;
    ipAdress: string;
    device_Id: string;
    target = new TargetCustomerTarget();



    idcard: boolean;
    gst: boolean;
    Address: boolean;
    Visiting: boolean;
    back: boolean;

    idcard1: boolean;
    gst1: boolean;
    Address1: boolean;
    Visiting1: boolean;
    back1: boolean;

    constructor(private serverService: ServerService, private router: Router, private http: Http) {


    }
    ResponseCode: any;

    ResponseCode1: string;


    fileuploaderFileChange(event, CusId, Doctype) {

        let file = event[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        // headers.append('Content-Type', 'json');  
        // // headers.append('Accept', 'application/json');  
        // headers.append('compId', this.compId);
        // headers.append('customerId', CusId);
        // headers.append('loginid', this.loginId);
        // headers.append('token', this.token);
        headers.append('documentType', Doctype);
        headers.append('filepath', 'Group/Customer');
        headers.append('filename', file.name);
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:57509/api/Customer/DocumentUpdate", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            Data => {
                this.ResponseCode1 = Data.ResponseCode;
                // if(this.ResponseCode=="0000")
                // {
                // swal({
                //     position: 'top-end',
                //     type: 'success',
                //     title: 'Your Data has been saved',
                //     showConfirmButton: false,
                //     timer: 1500
                //   });
                // }
            })


    }

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



    copyDetails(isSame, address, country, state, city, zipcode) {
        if (!isSame) {
            this.customer.shipping_Address = address;
            this.customer.shipping_City = city;
            this.customer.shipping_State = state;
            this.customer.shipping_Country = country;
            this.customer.shipping_Zipcode = zipcode;
        } else {
            this.customer.shipping_Address = '';
            this.customer.shipping_City = 0;
            this.customer.shipping_State = 0;
            this.customer.shipping_Country = 0;
            this.customer.shipping_Zipcode = '';
        }


    }




    today: any;
    startdate: any;

    onSubmit(startddate): void {


        this.today = new Date();
        this.startdate = new Date(startddate)
        if (this.startdate > this.today) {
            swal("Plese select valid Date");
        }
        else {
            this.submitted = true;
            this.serverService.addCustomerData(this.customer, 'INSERT_CUSTOMER')
                .subscribe(data => {
                    this.ResponseStatus = data[0].errorCode;
                    if (this.ResponseStatus == "0") {
                        swal({
                            position: 'top-end',
                            type: 'success',
                            title: 'Your Data has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    this.getCustomerId = data[0].Id;
                    this.customer.customer_Id = this.getCustomerId;
                    myGlobals.setCustomerIDValue(this.customer.customer_Id, 0);

                    this.isEdited = true;
                },
                error => this.errorMessage = <any>error);
        }


        // this.serverService.CustomerDocumentUpload(this.Docs)
        // .subscribe(data => { 
        //     // this.ResponseStatus=data[0].errorCode;
        //     // if(this.ResponseStatus=="0")
        //     // {
        //     // swal({
        //     //     position: 'top-end',
        //     //     type: 'success',
        //     //     title: 'Your Data has been saved',
        //     //     showConfirmButton: false,
        //     //     timer: 1500
        //     //   });
        //     // }
        //     this.getCustomerId=data[0].Id;
        //     this.customer.customer_Id=this.getCustomerId;
        //     myGlobals.setCustomerIDValue(this.customer.customer_Id);

        //     this.isEdited=true;  
        // },
        // error => this.errorMessage = <any>error);







    }
    //new code for category list add 30-12-2019

    // categoryname:any;

    onSubmit1(category_name): void {



        //this.categorylist.category_name;
        if (this.categorylist.category_name == "" || this.categorylist.category_name == undefined) {

            swal(
                'please enter Category name',

            )
        }
        else {
            //  this.submitted=true;
            this.serverService.addCustomecategorylist(this.categorylist)
                .subscribe(data => {
                    this.ResponseStatus = data[0].errorCode;
                    if (this.ResponseStatus == "0") {
                        swal({
                            position: 'top-end',
                            type: 'success',
                            title: 'Your Data has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else if (this.ResponseStatus == "1") {

                        swal(
                            'Category Name Already Exists',

                        )

                    }
                    this.getDataforcategorylist();
                    this.categorylist.category_name = "";
                },
                error => this.errorMessage = <any>error);
        }


    }



    //update for categorylist

    onSubmit2(): void {


        this.serverService.updateCustomecategorylist(this.categorylist)
            .subscribe(data => {
                this.ResponseStatus = data[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (this.ResponseStatus == "1") {

                    swal(
                        'Category Name Already Exists',

                    )

                }
                this.getDataforcategorylist();
                this.categorylist.category_name = "";
                this.categorylist.cust_category_id1 = null;
                this.showMyupdate = false;
                this.showMyinsert = true;
            },
            error => this.errorMessage = <any>error);



    }



    getDataforcategorylist() {
        this.serverService.getvalueforcategorylist()

            .subscribe(Data => {
                this.categorylists = Data;
                this.categorytype = Data;
            });
    }


    updatecate(customersId, custname) {
        this.categorylist.cust_category_id1 = customersId;
        //  this.router.navigate(['./addCustomer']);
        //  myGlobals.setCustomerIDValue(this.customersId,StatusId);
        this.categorylist.category_name = custname;
        this.showMyupdate = true;
        this.showMyinsert = false;

    }



    updatepaymode(customersId, custname) {
        this.paymodelist.paymode_id1 = customersId;
        this.paymodelist.paymode_textname = custname;
        // this.showMyupdate = true;
        //   this.showMyinsert= false;
        this.showpaymodeinsert = false;
        this.showpaymodeupdate = true;

    }






    closemeth() {

        this.showMyupdate = false;
        this.showMyinsert = true;
        this.categorylist.category_name = "";
    }



    clospaymode() {


        this.showpaymodeinsert = true;
        this.showpaymodeupdate = false;
        this.paymodelist.paymode_id1 = null;
        this.paymodelist.paymode_textname = "";
        this.cashpayrefersh();
    }





    deletecat(customerId) {
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
                this.delcatgory.cust_category_id = customerId;
                this.serverService.delCustomecategorylist(this.delcatgory)
                    .subscribe(custid => {
                        this.ResponseStatus = custid[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getDataforcategorylist();
                    },
                    error => this.errorMessage = <any>error);

            }
        })



    }



    //paymode insert
    onSubmitpaymode(textname): void {



        //this.categorylist.category_name;
        if (textname == "" || textname == undefined) {
            swal(
                'Please Enter payment name',

            )
        }
        else {
            //  this.submitted=true;
            this.serverService.addpaymentmode(this.paymodelist)
                .subscribe(data => {
                    this.ResponseStatus = data[0].errorCode;
                    if (this.ResponseStatus == "0") {
                        swal({
                            position: 'top-end',
                            type: 'success',
                            title: 'Your Data has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else if (this.ResponseStatus == "2") {

                        swal(
                            'Paymode Name Already Exists',

                        )

                    }
                    //   this.getDataforcategorylist();
                    this.getDataforpaymentmode();
                    this.paymodelist.paymode_textname = "";
                },
                error => this.errorMessage = <any>error);
        }


    }





    //updatepaymode
    onSubupdatepay(): void {


        this.serverService.updatepaymode(this.paymodelist)
            .subscribe(data => {
                this.ResponseStatus = data[0].errorCode;
                if (this.ResponseStatus == "0") {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your Data has been Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (this.ResponseStatus == "1") {

                    swal(
                        'Paymentmode Name Already Exists',

                    )

                }
                this.getDataforpaymentmode();
                this.paymodelist.paymode_textname = "";
                this.paymodelist.paymode_id1 = null;

                this.showpaymodeinsert = true;
                this.showpaymodeupdate = false;
            },
            error => this.errorMessage = <any>error);



    }







    deletepay(paymodeId) {
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
                this.delpaymode.paymode_id = paymodeId;
                this.serverService.deletepaymode(this.delpaymode)
                    .subscribe(custid => {
                        this.ResponseStatus = custid[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getDataforpaymentmode();
                    },
                    error => this.errorMessage = <any>error);

            }
        })



    }





    getDataforpaymentmode() {
        this.serverService.getvalueforpaymentmode()

            .subscribe(Data => {
                this.getpaymodelist = Data;
                //    this.categorytype = Data;
            });
    }












    getTargets() {
        this.serverService.getCustomerTargetDataFromServers(myGlobals.customersId)
            .subscribe(Data => {
                this.customerTarget = Data;
            });
    }
    postTargets() {
        this.submitted = true;

        for (var i = 0; i < this.customerTarget.length; i++) {
            this.target.comp_Id = this.customer.comp_Id;
            this.target.customer_Id = this.customer.customer_Id;
            this.target.cluster_Id = this.customerTarget[i].cluster_Id;
            this.target.target_Quantity = this.customerTarget[i].target_Quantity;;
            this.serverService.getTargetCustomerDataFromServers(this.target)
                .subscribe(customerId => {

                })
        }
        this.onSubmit(1);
        // swal({
        //     position: 'top-end',
        //     type: 'success',
        //     title: 'Your Data has been saved',
        //     showConfirmButton: false,
        //     timer: 1500
        //   });
    }

    onCancle(): void {
        myGlobals.setCustomerIDValue(0, 0);
        this.router.navigate(['./customer']);

    }


    OnDocumentSubmit() {
        if (this.ResponseCode1 == "0000") {
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Your Data has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    // downloadIDCardExcel() {
    //     return this.http
    //       .post('this.customer.id_Card_Proof', {
    //         responseType: ResponseContentType.Blob,
    //        search: // query string if have
    //       })
    //       .map(res => {
    //         return {
    //           filename: 'filename.pdf',
    //           data: res.blob()
    //         };
    //       })
    //       .subscribe(res => {
    //           console.log('start download:',res);
    //           var url = window.URL.createObjectURL(res.data);
    //           var a = document.createElement('a');
    //           document.body.appendChild(a);
    //           a.setAttribute('style', 'display: none');
    //           a.href = url;
    //           a.download = res.filename;
    //           a.click();
    //           window.URL.revokeObjectURL(url);
    //           a.remove(); // remove the element
    //         }, error => {
    //           console.log('download error:', JSON.stringify(error));
    //         }, () => {
    //           console.log('Completed file download.')
    //         });
    //   }
    cashpayrefersh() {
        this.serverService.getModeOfPaymentDataFromServers()
            .subscribe(Data => {
                this.modeOfPayment = Data;
            });
    }



    downloadIDCardExcel() {
        // window.location.href = 'this.customer.id_Card_Proof';
        var blob = new Blob([this.customer.id_Card_Proof], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    }
    cus: any;
    upload1: string;
    upload2: string;
    upload3: string;
    upload4: string;
    upload5: string;
    rowsPerPage = 5
    ngOnInit() {

        // if (this.user_Name == 'ADMIN') {
        //     this.showMybutton = true;
        //     // this.showMyDownload = true;
        // }
        this.customers = [];

        this.getDataforcategorylist();
        this.getDataforpaymentmode();



        if (myGlobals.customersId > 0) {
            this.serverService.getCountryDataFromServers()
                .subscribe(Data => {
                    this.country = Data;
                });

            this.serverService.getModeOfPaymentDataFromServers()
                .subscribe(Data => {
                    this.modeOfPayment = Data;
                });

            this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')
                .subscribe(Data => {
                    this.clusterData = Data;
                });
            this.serverService.getEmployeeDataFromServers(0, 0)
                .subscribe(Data => {
                    this.employee = Data;
                });
            this.serverService.getCustomerTypeDataFromServers()
                .subscribe(Data => {
                    this.customerType = Data;
                });

            this.serverService.getcustomerStatusDataFromServers()
                .subscribe(Data => {
                    this.customerStatus = Data;
                });
            this.serverService.getCustomerPath('GET_CUSTOMER_DOCUMENT_PATH')
                .subscribe(Data => {
                    this.path = Data[0].Name;
                });
            this.isEdited = true;
            this.serverService.getCustomerDataFromServers(myGlobals.customersId, myGlobals.statusId)
                .subscribe(Data => {


                    this.cus = Data[0]
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
                    //new code for
                    this.customer.cust_code = Data[0].cust_code;
                    this.customer.sub_code = Data[0].sub_code;
                    this.customer.customer_category = Data[0].customer_category;
                    this.customer.whatssup = Data[0].whatssup;


                    this.upload1 = Data[0].visiting_card;
                    this.upload2 = Data[0].id_Card_Proof;
                    this.upload3 = Data[0].gst_Certificate;
                    this.upload4 = Data[0].address_Proof;
                    this.upload5 = Data[0].visiting_card_back;

                    this.customer.visiting_card = this.path + Data[0].visiting_card;
                    this.customer.id_Card_Proof = this.path + Data[0].id_Card_Proof;
                    //  this.customer.id_Card_Proof=Data[0].id_Card_Proof;
                    this.customer.gst_Certificate = this.path + Data[0].gst_Certificate;
                    this.customer.address_Proof = this.path + Data[0].address_Proof;
                    this.customer.visiting_card_back = this.path + Data[0].visiting_card_back;

                    if (this.upload1 == undefined || this.upload1 == "" || this.customer.visiting_card == undefined || this.path == undefined) {
                        this.Visiting = true;
                        this.Visiting1 = false;
                    }
                    if (this.upload2 == undefined || this.upload2 == "" || this.customer.id_Card_Proof == undefined || this.path == undefined) {
                        this.idcard = true;
                        this.idcard1 = false;
                    }
                    if (this.upload3 == undefined || this.upload3 == "" || this.customer.gst_Certificate == undefined || this.path == undefined) {
                        this.gst = true;
                        this.gst1 = false;
                    }
                    if (this.upload4 == undefined || this.upload4 == "" || this.customer.gst_Certificate == undefined || this.path == undefined) {
                        this.Address = true;
                        this.Address1 = false;
                    }
                    if (this.upload5 == undefined || this.upload5 == "" || this.customer.visiting_card_back == undefined || this.path == undefined) {
                        this.back = true;
                        this.back1 = false;
                    }
                });

        } else {
            this.serverService.getCountryDataFromServers()
                .subscribe(Data => {
                    this.country = Data;
                });

            this.serverService.getClusterDataFromServers(0, 0, 'GET_INVENTORY_CLASSIFICATION')
                .subscribe(Data => {
                    this.clusterData = Data;
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
            this.isEdited = false;
        }


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

}


