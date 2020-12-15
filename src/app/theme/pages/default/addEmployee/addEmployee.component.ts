import { Component, ViewChild, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { Helpers } from '../../../../helpers';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AddEmployee, EmployeeStatus, currency, Employee, Role, Bloodgroup, Department, Branch, Team } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { EmployeeComponent } from '../employee/employee.component';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';
import { ElementRef } from '@angular/core';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
declare var $;


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addEmployee.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent implements OnInit, AfterViewInit {
    @ViewChild('f') detailsForm: NgForm;
    @ViewChild('f1') addressForm: NgForm;
    bloodgroup: Bloodgroup[];

    readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    // readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;
    path: string;


    Adhar: boolean;
    driving: boolean;
    voter: boolean;
    pan: boolean;
    other: boolean;

    Adhar1: boolean;
    driving1: boolean;
    voter1: boolean;
    pan1: boolean;
    other1: boolean;



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

    empstatus: EmployeeStatus[];

    isEdited = false;
    role: Role[];
    department: Department[];
    branch: Branch[];
    team: Team[];
    staff: Employee[];
    employees: AddEmployee[];
    errorMessage: String;
    ResponseStatus: string;

    employeeId: number;
    AddEmployee: number;
    getStaffId: any;

    comp_Id: number;
    status: number;
    staff_Id: number;
    first_Name: string;
    last_Name: string;
    staff_No: string;
    designation_Id: number;
    department_Id: number;
    date_Of_Birth: string;
    joining_Date: string;
    blood_Group: string;
    yrs_Exp: Float32Array;
    mob_No: string;
    email_Id: string;
    approver_id: number;
    branch_id: number;
    team_Id: number;
    gender: string;
    isMarried: number;
    father_Name: string;
    mother_Name: string;
    spouse_Name: string;
    nationality: string;
    emergency_Name: string;
    emergency_No: string;
    esi_No: string;
    pf_No: string;
    eid_No: string;
    current_Address: string;
    permnt_Address: string;
    division_Id: number;
    user_name: string;
    IP_address: string;
    device_Id: string;
    login_Id: number;
    //token: string;
    mode: string;
    adhar_Upload: string;
    dl_Upload: string;
    other_Upload: string;
    pan_Upload: string;
    vo_Upload: string;
    photo: string;
    employee = new AddEmployee();

    ResponseCode: any;

    constructor(private serverService: ServerService, private router: Router, private element: ElementRef,
        private _script: ScriptLoaderService, private http: Http) { }

    onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }



    fileuploaderFileChange(event, staffid, doctype) {
        let file = event[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        // headers.append('Content-Type', 'json');  
        // headers.append('Accept', 'application/json');  
        headers.append('compId', this.compId);
        headers.append('staffId', staffid);
        headers.append('loginid', this.loginId);
        headers.append('token', this.token);
        headers.append('documentType', doctype);
        headers.append('filepath', 'Group/Staff');
        headers.append('filename', file.name);
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:57509/api/Employee/DocumentUpdate", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            Data => {
                this.ResponseCode = Data.ResponseCode;
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




    changeListner(event, staffid, doctype) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = (event: any) => {
            var src = event.target.result;
            image.src = src;
        };

        reader.readAsDataURL(event.target.files[0]);

        let file = event.target.files[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        // headers.append('Content-Type', 'json');  
        // headers.append('Accept', 'application/json');  
        headers.append('compId', this.compId);
        headers.append('staffId', staffid);
        headers.append('loginid', this.loginId);
        headers.append('token', this.token);
        headers.append('documentType', doctype);
        headers.append('filepath', 'Group/Staff');
        headers.append('filename', file.name);
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:57509/api/Employee/DocumentUpdate", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            Data => {
                // this.ResponseCode=Data.ResponseCode;
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


    StudentPhoto: any
    DOBs: any;
    JoinDate: any;
    today: any;
    onSubmit(dob, joindate): void {
        this.DOBs = new Date(dob);
        this.JoinDate = new Date(joindate);
        this.today = new Date();

        if (this.DOBs > this.today) {
            swal("Please select valid DOB")
        }
        else if (this.JoinDate > this.today) {
            swal("Please select valid Joining Date")
        }
        else if (this.DOBs >= this.JoinDate) {
            swal("Please select valid Joining Date")
        }
        else {
            this.serverService.saveEmployeeDetails(this.employee, 'INSERT_STAFF')
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
                    this.getStaffId = data[0].Id;
                    myGlobals.setValue(this.getStaffId);
                    this.employee.staff_Id = this.getStaffId;
                    this.isEdited = true;
                },
                error => this.errorMessage = <any>error);
        }
    }
    getTeamData(branchId) {
        this.serverService.getTeamDataFromServers(branchId, 0, 0, 0)
            .subscribe(Data => {
                this.team = Data;
            });
    }

    onCancel(): void {
        myGlobals.setValue(0);
        this.employee.staff_Id = 0;
        this.router.navigate(['./employee']);

    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    upload1: string;
    upload2: string;
    upload3: string;
    upload4: string;
    upload5: string;
    ngOnInit() {

        this.serverService.getBloodGroupDataFromServers()

            .subscribe(Data => {
                this.bloodgroup = Data;
            });

        if (myGlobals.staffId > 0) {
            this.isEdited = true;
            this.serverService.getEmployeeStatusDataFromServers(0, 1)
                .subscribe(Data => {
                    this.empstatus = Data;
                });
            this.serverService.getRoleDataFromServers(0, 0, 0)
                .subscribe(Data => {
                    this.role = Data;
                });
            this.serverService.getDepartmentDataFromServers(0, 0)
                .subscribe(Data => {
                    this.department = Data;
                });
            this.serverService.getEmployeeDataFromServers(0, 0)
                .subscribe(Data => {
                    this.staff = Data;
                });
            this.serverService.getBranchDataFromServers(0, 0)
                .subscribe(Data => {
                    this.branch = Data;
                });
            this.serverService.getTeamDataFromServers(0, 0, 0, 0)
                .subscribe(Data => {
                    this.team = Data;
                });
            this.serverService.getDepartmentDataFromServers(0, 0)
                .subscribe(Data => {
                    this.department = Data;
                });
            this.serverService.getCustomerPath('GET_STAFF_DOCUMENT_PATH')
                .subscribe(Data => {
                    this.path = Data[0].Name;
                });


            // this.serverService.getTeamDataFromServers(0,0,0,0)
            // .subscribe(Data => {
            //     this.team = Data;
            // });

            this.serverService.getEmployeeDataFromServers(myGlobals.staffId, 0)
                .subscribe(Data => {
                    this.employee.staff_Id = Data[0].staff_Id;
                    this.employee.first_Name = Data[0].first_Name;
                    this.employee.last_Name = Data[0].last_Name;
                    this.employee.staff_No = Data[0].staff_No;
                    this.employee.designation_Id = Data[0].designation_Id;
                    this.employee.department_Id = Data[0].department_Id;
                    this.employee.date_Of_Birth = Data[0].date_Of_Birth;
                    this.employee.joining_Date = Data[0].joining_Date;
                    this.employee.blood_Group = Data[0].blood_Group;
                    this.employee.yrs_Exp = Data[0].yrs_Exp;
                    this.employee.mob_No = Data[0].mob_No;
                    this.employee.email_Id = Data[0].email_Id;
                    this.employee.approver_id = Data[0].approver_id;
                    this.employee.branch_id = Data[0].branch_Id;
                    this.employee.team_Id = Data[0].team_Id;
                    this.employee.gender = Data[0].gender;
                    this.employee.isMarried = Data[0].isMarried;
                    this.employee.father_Name = Data[0].father_Name;
                    this.employee.mother_Name = Data[0].mother_Name;
                    this.employee.spouse_Name = Data[0].spouse_Name;
                    this.employee.nationality = Data[0].nationality;
                    this.employee.emergency_Name = Data[0].emergency_Name;
                    this.employee.emergency_No = Data[0].emergency_No;
                    this.employee.esi_No = Data[0].esi_No;
                    this.employee.pf_No = Data[0].pf_No;
                    this.employee.eid_No = Data[0].eid_No;
                    this.employee.status = Data[0].status;
                    this.employee.current_Address = Data[0].current_Address;
                    this.employee.permnt_Address = Data[0].permnt_Address;
                    this.employee.division_Id = Data[0].division_Id;

                    this.upload1 = Data[0].dl_Upload;
                    this.upload2 = Data[0].adhar_Upload;
                    this.upload3 = Data[0].pan_Upload;
                    this.upload4 = Data[0].other_Upload;
                    this.upload5 = Data[0].vo_Upload;

                    this.employee.dl_Upload = this.path + Data[0].dl_Upload;
                    this.employee.adhar_Upload = this.path + Data[0].adhar_Upload;
                    this.employee.pan_Upload = this.path + Data[0].pan_Upload;
                    this.employee.other_Upload = this.path + Data[0].other_Upload;
                    this.employee.vo_Upload = this.path + Data[0].vo_Upload;
                    this.employee.photo = this.path + Data[0].photo;

                    if (this.upload1 == undefined || this.upload1 == "" || this.employee.dl_Upload == undefined || this.path == undefined) {
                        this.driving = true;
                        this.driving1 = false;
                    }
                    if (this.upload2 == undefined || this.upload2 == "" || this.employee.adhar_Upload == undefined || this.path == undefined) {
                        this.Adhar = true;
                        this.Adhar1 = false;
                    }
                    if (this.upload3 == undefined || this.upload3 == "" || this.employee.pan_Upload == undefined || this.path == undefined) {
                        this.pan = true;
                        this.pan1 = false;
                    }
                    if (this.upload4 == undefined || this.upload4 == "" || this.employee.other_Upload == undefined || this.path == undefined) {
                        this.other = true;
                        this.other1 = false;
                    }
                    if (this.upload5 == undefined || this.upload5 == "" || this.employee.vo_Upload == undefined || this.path == undefined) {
                        this.voter = true;
                        this.voter1 = false;
                    }

                    this.StudentPhoto = this.employee.photo;
                    this.isEdited = true;
                });


        }
        else {
            this.serverService.getEmployeeStatusDataFromServers(0, 1)
                .subscribe(Data => {
                    this.empstatus = Data;
                    this.employee.status = 1;
                });
            this.serverService.getRoleDataFromServers(0, 0, 0)
                .subscribe(Data => {
                    this.role = Data;
                });
            this.serverService.getBranchDataFromServers(0, 0)
                .subscribe(Data => {
                    this.branch = Data;
                });
            this.serverService.getTeamDataFromServers(0, 0, 0, 0)
                .subscribe(Data => {
                    this.team = Data;
                });
            this.serverService.getDepartmentDataFromServers(0, 0)
                .subscribe(Data => {
                    this.department = Data;
                });
            this.serverService.getEmployeeDataFromServers(0, 0)
                .subscribe(Data => {
                    this.staff = Data;
                    this.employee.staff_Id = 0;
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