import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { LoginDetails, Empmail, Password } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../../../../Global';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./loginDetails.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class LoginDetailsComponent implements OnInit, AfterViewInit {
    empmail: Empmail[];
    passwo: Password[];
    //comp_Id:number;

    length: number;
    token: string;
    login_Id: number;
    password = new Password();


    errorMessage: String;
    comp_Id: number;
    ResponseStatus: number;
    loginDetail: any;
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

    onreset(loginid) {
        this.serverService.ResetPasswordDetails(this.password, loginid)
            .subscribe(password => {
                this.ResponseStatus = password.length;
                if (this.ResponseStatus === 0) {
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'PASSWORD Reset Succesful!!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            },
            error => this.errorMessage = <any>error);
    }
    ngOnInit(): void {

        // this.loginDetail = [{'employee_No':'1234','employee_Name':'Rahul',
        // 'employee_Username':'Demo','employee_Password':'Demo'}]

        this.serverService.getLoginDetails()
            .subscribe(Data => {
                this.empmail = Data;
            });

        //this.Email= myGlobals.EmailId
        // this.serverService.getStatusDataFromServers(0,1)

        // .subscribe(Data => {
        // this.status = Data;
        // });

        // this.serverService.getRoleDataFromServers(1,0,0)

        // .subscribe(Data => {
        // this.role = Data;
        // });

    }


    redirectToRole(roleId) {
        this.router.navigate(['./addRole']);
        myGlobals.setRoleIDValue(roleId)
    }




    //  deleteRole(roleId){
    //      swal({
    //          title: 'Are you sure?',
    //          text: "You won't be able to revert this!",
    //          type: 'warning',
    //          showCancelButton: true,
    //          confirmButtonColor: '#3085d6',
    //          cancelButtonColor: '#d33',
    //          confirmButtonText: 'Yes, delete it!'
    //        }).then((result) => {
    //          if (result.value) {
    //              this.addRole.id=roleId;
    //              this.serverService.AddRoleDataToServers(this.addRole,"UPDATE")
    //                  .subscribe(desId => {
    //                     this.ResponseStatus=desId[0].errorCode;
    //                     if(this.ResponseStatus=="0"){ 
    //                     swal(
    //                         'Deleted!',
    //                         'Your file has been deleted.',
    //                         'success'
    //                       )
    //                     }
    //                      this.getData();
    //                  },
    //                  error => this.errorMessage = <any>error);

    //          }
    //        })   
    //     }

    //  getData(){
    //      this.serverService.getRoleDataFromServers(1,0,0)
    //         .subscribe(Data => {
    //             this.role = Data;
    //         });
    //  }


    ngAfterViewInit() {

    }
}


