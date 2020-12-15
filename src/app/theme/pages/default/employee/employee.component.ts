import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { Helpers } from '../../../../helpers';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../../componentDetails';
import { AddEmployee, EmployeeStatus, currency } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as myGlobals from '../../../../Global';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as FileSaver from 'file-saver';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./employee.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit, AfterViewInit {

    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    showMyContainer: boolean = false;
    showMyDownload: boolean = false;

    empstatus: EmployeeStatus[];
    employee: Employee[];
    errorMessage: String;
    employees = new Employee();

    i: any;
    delEmployee = new AddEmployee();
    comp_Id: number;
    ResponseStatus: string;
    constructor(private serverService: ServerService, private router: Router, public http: Http) { }

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


    ngOnInit(): void {

        this.serverService.getEmployeeDataFromServers(0, 0)

            .subscribe(Data => {
                this.employee = Data;
            });

        this.serverService.getEmployeeStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.empstatus = Data;
                this.delEmployee.status = 0;
            });

        if (this.user_Name == 'ADMIN') {
            this.showMyContainer = true;
            //   this.showMyDownload =true;
        }


    }
    onStatusChange(statusId) {
        this.delEmployee.status = statusId;
        this.serverService.getEmployeeDataFromServers(0, this.delEmployee.status)
            .subscribe(Data => {
                this.employee = Data;
            });

    }
    ngAfterViewInit() {

    }
    redirect(staffId) {
        this.router.navigate(['./addEmployee']);
        myGlobals.setValue(staffId);
    }

    addPage() {
        myGlobals.setValue(0);
        this.router.navigate(['./addEmployee']);
    }




    deleteall() {
        for (var j = 0; j < this.employee.length; j++) {
            if (this.employee[j].empiddelete == 1) {
                this.delete(this.employee[j].staff_Id);

            }
        }
    }

    selectAll(value) {
        for (let i = 0; i < this.employee.length; i++) {

            if (value == 0) {
                this.employee[i].empiddelete = 0;
            } else {
                this.employee[i].empiddelete = 1;
            }


        }
    }










    delete(staffId) {
        swal({
            title: 'All the Records will be Deleted of this Staff and You will not be able to revert this!',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                // this.delEmployee.staff_Id=staffId;
                for (var k = 0; k < this.employee.length; k++) {
                    if (this.employee[k].empiddelete == 1) {
                        this.delEmployee.staff_Id = this.employee[k].staff_Id;

                        this.serverService.saveEmployeeDetails(this.delEmployee, 'DELETE_STAFF')
                            .subscribe(employeeId => {
                                this.ResponseStatus = employeeId[0].errorCode;
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

    getData() {
        this.serverService.getEmployeeDataFromServers(0, 0)
            .subscribe(Data => {
                this.employee = Data;
            });
    }



    fileuploaderFileChange(event) {
        // if(branchId==undefined){
        //    swal("Select Branch");
        // }
        // else{
        var testbd = 0;
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
                let apiUrl1 = " http://localhost:57509/api/EmployeeExcelUpload/ExcelUploademployee";
                this.http.post(apiUrl1, formData, options)
                    .map(res => res.json())

                    .catch(error => Observable.throw(error))
                    .subscribe(
                    Data => {
                        //  var data1 = [
                        //      {
                        //          Product_Category: "Product Category",
                        //          Item_Name: "Item_Name",
                        //          Cluster: "Cluster",
                        //          Brand: "Brand",
                        //          Quantity: "Quantity",
                        //          Pcs:"Pcs",
                        //          rownumber:"Error Row",
                        //          name:"Column Name"
                        //      }]

                        //  for(var i=0;i<Data.length;i++){
                        //      if(Data[i].name != "GOOD RECORD"){
                        //         Data[i+1] = Data[i]
                        //      }

                        //      // data1[i+1].Item_Name = Data[i].Item_Name
                        //      // data1[i+1].Cluster = Data[i].Cluster
                        //      // data1[i+1].Brand = Data[i].Brand
                        //      // data1[i+1].Quantity = Data[i].Quantity



                        //  }

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


                                testbd = 1;
                                this.ngOnInit();

                            }


                        }


                        if (testbd == 1) {
                            this.notepadtest(Data)
                        }

                        // if(Data.length > 1){
                        //      swal(
                        //          'Good Records Only Uploaded.',

                        //        )
                        //   //   new Angular2Csv(Data, 'My Report');
                        //      this.ngOnInit();

                        //  }else {
                        //      swal(
                        //          'Data Uploaded.',
                        //          'success'
                        //        )
                        //        this.ngOnInit();
                        //  }

                        //  this. getarray= Data;
                        //  this.notepadtest(Data)

                    })

                // data => console.log('success'),  
                // error => console.log(error)  )

            }

        });


    }


    //   getarray=[];

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





    exportexcel() {


        var downloadEMPReport = [{ staff_No: "staff_No", first_Name: "Employee Name ", designation: "Designation", approver: "Manager", mob_No: "Mobile No", branch_Name: "Branch", Status: "Status" }]
        //var x = downloadCUSTReport.toString();
        var statusd = "";

        for (var i = 0; i < this.employee.length; i++) {
            if (this.employee[i].status == 1) {

                statusd = "Active"

            } else {

                statusd = "InActive"
            }


            downloadEMPReport[i + 1] = {
                'staff_No': this.employee[i].staff_No,
                'first_Name': this.employee[i].first_Name + "" + this.employee[i].last_Name,
                'designation': this.employee[i].designation,
                'approver': this.employee[i].approver,
                'mob_No': this.employee[i].mob_No,
                'branch_Name': this.employee[i].branch_Name,
                'Status': statusd
            }
        }
        new Angular2Csv(downloadEMPReport, 'EmployeeExcelData');

    }

}
