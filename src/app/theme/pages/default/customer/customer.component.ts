
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { Customer, CustomerTarget, AddCustomer, Status } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../../../../Global';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { saveAs } from 'file-saver';
import { ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./customer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent implements OnInit, AfterViewInit {

    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;



    showMyContainer: boolean = false;

    status: Status[];
    customer: Customer[];
    errorMessage: String;
    comp_Id: number;
    // userId :string;
    delcustomers = new AddCustomer();
    ResponseStatus: string;


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


    jsonData = [];

    onStatusChange(statusId) {
        this.delcustomers.status = statusId;
        this.serverService.getCustomerDataFromServers(0, this.delcustomers.status)
            .subscribe(Data => {
                this.customer = Data;


            });
        // this.deleteBranch.branch_Id=0;
    }
    days: number;
    customersId: number;
    customerTarget: CustomerTarget[];
    constructor(private serverService: ServerService, private router: Router, public http: Http) { }



    ngOnInit(): void {

        this.serverService.getCustomerDataFromServers(0, -1)

            .subscribe(Data => {
                this.customer = Data;
                this.days = Data[2].credit_days;
            });

        // this.serverService.getCustomerTargetDataFromServers(0)

        // .subscribe(Data => {
        //     this.customerTarget = Data;
        // });

        this.serverService.getStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.status = Data;
                this.delcustomers.status = 0;
            });

        if (this.user_Name == 'ADMIN') {
            this.showMyContainer = true;
        }








    }
    ngAfterViewInit() {

        // var DatatableDataLocalDemo = function() {
        //     var e = function() {
        //         var e = JSON.parse('[{"COMPANY_ID":1,"CUSTOMER_ID":1,"CUATOMER_NAME":"RamBuilders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9783641034","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Aman","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"120000","CREDIT_DAYS":20,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":2,"CUATOMER_NAME":"Prestige builders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"8423559345","FAX":"9916775405","EMAIL":"Rohan@gmail.com","CONTACT_PERSON_NAME":"Nikilesh","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"200000","CREDIT_DAYS":25,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":3,"CUATOMER_NAME":"DLF","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9324354625","FAX":"9916775405","EMAIL":"Murali@gmail.com","CONTACT_PERSON_NAME":"Rohit","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"170000","CREDIT_DAYS":19,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":4,"CUATOMER_NAME":"Embassy Group","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"8665167405","FAX":"9916775405","EMAIL":"Rajesh@gmail.com","CONTACT_PERSON_NAME":"Arun","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"150000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":5,"CUATOMER_NAME":"Godrej Properties","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"8456721120","FAX":"9916775405","EMAIL":"Prasad@gmail.com","CONTACT_PERSON_NAME":"Sunil","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"120000","CREDIT_DAYS":13,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":6,"CUATOMER_NAME":"Prestige builders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"7324569103","FAX":"9916775405","EMAIL":"Santhosh@gmail.com","CONTACT_PERSON_NAME":"Arjun","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"170000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":7,"CUATOMER_NAME":"DLF","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9543623499","FAX":"9916775405","EMAIL":"Pranav@gmail.com","CONTACT_PERSON_NAME":"Akil","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"100000","CREDIT_DAYS":12,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":8,"CUATOMER_NAME":"RamBuilders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9421224571","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Mahesh","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"140000","CREDIT_DAYS":14,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0}]')
        //        let a = $(".m_datatable").mDatatable({
        //                 data: { type: "local", source: e, pageSize: 10 },
        //                 layout: { theme: "default", class: "", scroll: !1, height: 300, footer: !1 },
        //                 sortable: !0,
        //                 pagination: !0,
        //                 search: { input: $("#generalSearch") },
        //                 columns: [{
        //                         field: "CUSTOMER_ID",
        //                         title: "#",
        //                         width: 50,
        //                         sortable: !1,
        //                         selector: !1,
        //                         textAlign: "center"
        //                     },
        //                     {
        //                         field: "CUATOMER_NAME",
        //                         title: "Customer Name",
        //                         responsive: {
        //                             visible: "lg"
        //                         }
        //                     },
        //                     {
        //                         field: "CONTACT_PERSON_NAME",
        //                         title: "Contact Person",
        //                         responsive: {
        //                             visible: "lg"
        //                         }
        //                     },
        //                     {
        //                         field: "PHONE",
        //                         title: "Mobile Number",
        //                         width: 100
        //                     },
        //                     {
        //                         field: "EMAIL",
        //                         title: "Email",
        //                         width: 200,
        //                     },
        //                     {
        //                         field: "CREDIT_LIMIT",
        //                         title: "Credit Limit",
        //                         width: 100,
        //                     },
        //                     {
        //                         field: "CREDIT_DAYS",
        //                         title: "Credit Days",
        //                         width: 100,
        //                     },
        //                     {
        //                         field: "IS_APPROVED",
        //                         title: "Status",
        //                         template: function(e) {
        //                             var a = {
        //                                 1: {
        //                                     title: "Active",
        //                                     class: "m-badge--brand",
        //                                 },
        //                                 2: {
        //                                     title: "Inactive",
        //                                     class: " m-badge--metal"
        //                                 },
        //                                 3: {
        //                                     title: "Canceled",
        //                                     class: " m-badge--primary"
        //                                 },
        //                                 4: {
        //                                     title: "Success",
        //                                     class: " m-badge--success"
        //                                 },
        //                                 5: {
        //                                     title: "Info",
        //                                     class: " m-badge--info"
        //                                 },
        //                                 6: {
        //                                     title: "Danger",
        //                                     class: " m-badge--danger"
        //                                 },
        //                                 7: {
        //                                     title: "Warning",
        //                                     class: " m-badge--warning"
        //                                 }
        //                             };
        //                             return '<span class="m-badge ' + a[
        //                                 e.IS_APPROVED
        //                             ].class + ' m-badge--wide">' + a[
        //                                 e.IS_APPROVED
        //                             ].title + "</span>"
        //                         }
        //                     },
        //                     {
        //                         field: "Actions",
        //                         width: 110,
        //                         title: "Actions",
        //                         sortable: !1,
        //                         overflow: "visible",
        //                         template: function(e) {
        //                             return '\t\t\t\t\t\t<div class="dropdown ' + (e.getDatatable().getPageSize() - e.getIndex() <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">                                <i class="la la-ellipsis-h"></i>                            </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View ">                            <i class="la la-edit"></i>                        </a>\t\t\t\t\t'
        //                         }
        //                     }
        //                 ]
        //             }),
        //             i = a.getDataSourceQuery();
        //         $("#m_form_status").on("change", function() { a.search($(this).val(), "IS_APPROVED") }).val(void 0 !== i.IS_APPROVED ? i.IS_APPROVED : ""), $("#m_form_type").on("change", function() { a.search($(this).val(), "Type") }).val(void 0 !== i.Type ? i.Type : ""), $("#m_form_status, #m_form_type").selectpicker()
        //     };
        //     return { init: function() { e() } }
        // }();
        // jQuery(document).ready(function() { DatatableDataLocalDemo.init() });
    }
    redirect(customersId, StatusId) {
        this.customersId = customersId
        this.router.navigate(['./addCustomer']);
        myGlobals.setCustomerIDValue(this.customersId, StatusId);
    }

    //  delete(customerId)
    //  {
    //     swal({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.value) {
    //             this.delcustomers.customer_Id=customerId;
    //             this.serverService.addCustomerData(this.delcustomers,'DELETE_CUSTOMER')
    //             .subscribe(custid => { 
    //                 this.ResponseStatus=custid[0].errorCode;
    //                 if(this.ResponseStatus=="0"){ 
    //               swal(
    //                 'Deleted!',
    //                 'Your file has been deleted.',
    //                 'success'
    //               )
    //             }
    //                this.getData();
    //             },
    //             error => this.errorMessage = <any>error);

    //         }
    //       })



    //  }
    //test123=false;



    selectAll(value) {
        for (let i = 0; i < this.customer.length; i++) {

            if (value == 0) {
                this.customer[i].checkdelete = 0;
            } else {
                this.customer[i].checkdelete = 1;
            }


            //   {
            //     this.customer[i].customer_Id = this.selectedAll;
            //   }
        }
    }



    deleteall() {
        for (var j = 0; j < this.customer.length; j++) {
            if (this.customer[j].checkdelete == 1) {
                this.delete(this.customer[j].customer_Id);

            }
        }
    }
    delete(customer_Id) {
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
                for (var k = 0; k < this.customer.length; k++) {
                    if (this.customer[k].checkdelete == 1) {
                        this.delcustomers.customer_Id = this.customer[k].customer_Id;

                        this.serverService.addCustomerData(this.delcustomers, 'DELETE_CUSTOMER')

                            .subscribe(custid => {
                                this.ResponseStatus = custid[0].errorCode;
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
                }
            }
        })

    }
    //test123: Boolean;

    getData() {
        this.serverService.getCustomerDataFromServers(0, -1)

            .subscribe(Data => {
                this.customer = Data;
            });
    }


    getarray = [];


    fileuploaderFileChange(event) {
        // if(branchId==undefined){
        //    swal("Select Branch");
        // }
        // else{

        var test1 = 0;

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
                // headers.append('branchId', branchId);
                headers.append('token', this.token);
                headers.append('userName', this.user_Name);
                headers.append('ipAddress', '12345');
                headers.append('deviceId', '123');
                headers.append('filepath', 'Expense');
                headers.append('filename', file.name);

                let options = new RequestOptions({ headers: headers });
                let apiUrl1 = " http://localhost:57509/api/CustomerExcellUpload/ExcelUploadcustomer";
                this.http.post(apiUrl1, formData, options)
                    .map(res => res.json())

                    .catch(error => Observable.throw(error))
                    .subscribe(
                    Data => {

                        for (var i = 0; i < Data.length; i++) {
                            if (Data[i].name == "GOOD RECORD") {

                                swal(
                                    'Data Uploaded.',
                                    'success'
                                ).then((result) => {
                                    if (result.value) {

                                        window.location.reload();
                                    }
                                })
                                this.ngOnInit();

                            } else {

                                swal(
                                    'Please Check Excel.',

                                ).then((result) => {
                                    if (result.value) {

                                        window.location.reload();
                                    }
                                })
                                //   new Angular2Csv(Data, 'My Report');

                                test1 = 1;
                                this.ngOnInit();


                            }
                        }
                        if (test1 == 1) {
                            this.notepadtest(Data)
                        }


                    })
                // data => console.log('success'),  
                // error => console.log(error)  )

            }

        });

    }


    //   Router.get('./addCustomer', function(req, res) {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    //     res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    //     res.send('cors problem fixed:)');
    // });




    notepadtest(getarray) {

        //   var binaryData = [];
        //   binaryData.push(this.customer);
        //   ///  console.log(data.text());
        //   var blob = new Blob(binaryData, {type: "text/plain;charset=utf-8"});
        //  FileSaver.saveAs(blob, "hello world.txt");

        //   window.URL.createObjectURL(this.customer)



        //  window.URL.createObjectURL(new Blob(binaryData, {type: "text/plain;charset=utf-8"}))


        let A = getarray;
        var text = A;
        if (text.length > 0) {
            var textFile = null;
            var message = '';
            for (var i = 0; i < text.length; i++) {

                if (text[i].name != "GOOD RECORD") {
                    message = message + " \n\r " + "Please Check " + text[i].name + " At row number " + (parseInt(text[i].rownumber)) + ". \n\r ";
                }
            }

            message = message.replace(/\n/g, "\r\n");
            var data = new Blob([message], { type: 'text/plain' });


            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);
            FileSaver.saveAs(data, "Errors.txt");
        }


    }





    //   exportexcel(): void 
    //   {
    //      /* table id is passed over here */   
    //      let element = document.getElementById('excel-table'); 
    //      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    //      /* generate workbook and add the worksheet */
    //      const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //      /* save to file */
    //      XLSX.writeFile(wb, "CustomerExcel.xlsx");

    //   }


    exportexcel() {


        var downloadCUSTReport = [{ customer_Name: "Customer Name", contact_Person_Name: "Contact Person", customer_Phone_Number: "Mobile Number", customer_Email: "Email", credit_Limit: "Credit Limit", credit_days: "Credit Days" }]
        //var x = downloadCUSTReport.toString();

        for (var i = 0; i < this.customer.length; i++) {
            downloadCUSTReport[i + 1] = {
                'customer_Name': this.customer[i].customer_Name,
                'contact_Person_Name': this.customer[i].contact_Person_Name,
                'customer_Phone_Number': this.customer[i].customer_Phone_Number,
                'customer_Email': this.customer[i].customer_Email,
                'credit_Limit': this.customer[i].credit_Limit + "",
                'credit_days': this.customer[i].credit_days + ""
            }
        }
        new Angular2Csv(downloadCUSTReport, 'CustomerExcelData');

    }


























    //new code for excel download


    // downloadtest(){



    //     this.downloadFile(this.jsonData, 'CustomerExcel');
    //   }



    //   downloadFile(data, filename='data') {
    //     let csvData = this.ConvertToCSV(data, ["Customer Name","Customer Phone Number","Customer Email","Contact Person Name","Contact Person Designation","Contact Number",
    //     "Credit Limit","Credit Days","PAN Number","GST Number","Customer Type","Nature Of Business","Start Date of Business","Mode Of Payment",
    //     "Salesmen","Annual Turnover","Refered By","Address","Country","State","City","Zipcode","Shipping Address is same as Address","Shipping Address","Shipping Country",
    //     "Shipping State","Shipping City","Shipping Zipcode"]);
    //     console.log(csvData)
    //     let blob = new Blob(['\ufeff' + csvData], { type: 'application/vnd.ms-excel;' });
    //     let dwldLink = document.createElement("a");
    //     let url = URL.createObjectURL(blob);
    //     let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    //     if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
    //         dwldLink.setAttribute("target", "_blank");
    //     }
    //     dwldLink.setAttribute("href", url);
    //     dwldLink.setAttribute("download", filename + ".xls");
    //     dwldLink.style.visibility = "hidden";
    //     document.body.appendChild(dwldLink);
    //     dwldLink.click();
    //     document.body.removeChild(dwldLink);
    // }

    // ConvertToCSV(objArray, headerList) {
    //      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    //      let str = '';
    //      let row = 'Sub code,';

    //      for (let index in headerList) {
    //          row += headerList[index] + ',';
    //      }
    //      row = row.slice(0, -1);
    //      str += row + '\r\n';

    //      for (let i = 0; i < array.length; i++) {
    //          let line = (i+1)+'';
    //          for (let index in headerList) {
    //             let head = headerList[index];

    //              line += ',' + array[i][head];
    //          }
    //          str += line + '\r\n';
    //      }
    //      return str;
    //  }









































}
