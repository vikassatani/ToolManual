import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { TeamTarget, Branch, Team, Status } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { NgForm } from '@angular/forms';


import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import swal from 'sweetalert2';
import * as FileSaver from 'file-saver';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./teamTarget.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class TeamTargetComponent implements OnInit, AfterViewInit {
    // @ViewChild('f1') addressForm:NgForm;
    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    showMyContainer: boolean = false;



    status: Status[];
    team: Team[];
    teamTargets1: TeamTarget[];
    teamTargets2: TeamTarget[];
    teamTargets3: TeamTarget[];


    branch: Branch[];
    isTeamTarget: boolean;
    isSalesmanTarget: boolean;
    isCustomerTarget: boolean;
    branch_id: number;
    branchIdView: number;
    teamIdView: number;
    staffIdView: number;
    staffNoView: string;
    staffNameView: string;
    customerIdView: number;
    customerNameView: string;
    teamTarget = new TeamTarget();
    constructor(private serverService: ServerService, private http: Http) { }

    ngOnInit(): void {
        this.isTeamTarget = true;
        this.isSalesmanTarget = false;
        this.isCustomerTarget = false;
        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;
                this.teamTarget.branch_id = 0;
            });

        this.serverService.getStatusDataFromServers(0, 1)

            .subscribe(Data => {
                this.status = Data;
            });


        if (this.user_Name == 'ADMIN') {
            this.showMyContainer = true;
            //   this.showMyDownload =true;
        }
    }



    getTeamData(branchId) {
        this.serverService.getTeamDataFromServers(branchId, 0, 0, 0)
            .subscribe(Data => {
                this.team = Data;
            });
    }
    getTeamTargetData(branchId, teamId) {
        this.serverService.getTeamTargetDataFromServers(branchId, teamId)
            .subscribe(Data => {
                this.teamTargets1 = Data;
            });
        this.isTeamTarget = true;
        this.isSalesmanTarget = false;
        this.isCustomerTarget = false;
        this.branchIdView = branchId;
        this.teamIdView = teamId;
    }



    getEmolpoyeeTargetData(staffId, staffNo, staffName) {
        this.serverService.getEmployeeTargetDataFromServers(staffId)
            .subscribe(Data => {
                this.teamTargets2 = Data;
            });
        this.isTeamTarget = false;
        this.isSalesmanTarget = true;
        this.isCustomerTarget = false;
        this.staffIdView = staffId;
        this.staffNoView = staffNo;
        this.staffNameView = staffName;
    }
    getCustomerWiseTargetData(customerId, customerName) {
        this.serverService.getCustomerWiseTargetDataFromServers(customerId)
            .subscribe(Data => {
                this.teamTargets3 = Data;
            });
        this.customerIdView = customerId;
        this.customerNameView = customerName;
        this.isTeamTarget = false;
        this.isSalesmanTarget = false;
        this.isCustomerTarget = true;
    }
    backToEmolyeeData() {
        this.isTeamTarget = false;
        this.isSalesmanTarget = true;
        this.isCustomerTarget = false;
    }
    backToTeamData() {
        this.isTeamTarget = true;
        this.isSalesmanTarget = false;
        this.isCustomerTarget = false;
    }
    ngAfterViewInit() {

    }


    fileuploaderFileChange3(event) {
        // if(branchId==undefined){
        //    swal("Select Branch");
        // }
        // else{
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
                let apiUrl1 = "http://localhost:57509/api/TargetExcellUpload/ExcelUploadtargetmaster";

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
                                )
                                this.ngOnInit();

                            } else {

                                swal(

                                    'Please Check Excel.',

                                )
                                //   new Angular2Csv(Data, 'My Report');
                                this.ngOnInit();
                                this.notepadtest(Data)
                            }
                        }




                    })
                // data => console.log('success'),  
                // error => console.log(error)  )

            }

        });

    }





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












}
