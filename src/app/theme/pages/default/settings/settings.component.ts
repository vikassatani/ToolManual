import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Department, Division, Status, Branch, Employee, LeaveTypes, Tax, ExpenseCategory, AddDepartment, AddExpenseCategory, AddLeaveTypes, Team, AddTeam } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import * as myGlobals from '../../../../Global';
import swal from 'sweetalert2';
declare var jquery: any;
declare var $: any;
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./Settings.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, AfterViewInit {
    status: Status[];
    department: Department[];
    errorMessage: String;
    departments = new AddDepartment();
    comp_Id: number;
    branch: Branch[];
    employee: Employee[];
    division: Division[];

    ResponseStatus: string;

    leaveType: LeaveTypes[];
    leaveTypes = new AddLeaveTypes();

    team: Team[];
    teams = new AddTeam();
    tax: Tax[];
    taxes = new Tax();

    expenseCategory: ExpenseCategory[];
    expenseCategories = new AddExpenseCategory();

    taxid: number;
    //sorting
    key: string = '';
    reverse: boolean = false;

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    itemsPerPage1 = 10
    itemsPerPage2 = 10
    itemsPerPage3 = 10
    itemsPerPage4 = 10
    itemsPerPage5 = 10

    //pagination

    p: number = 1;
    itemsPerPage: number = 10;
    rowsPerPage1: number = 10;
    rowsPerPage2: number = 10;
    rowsPerPage3: number = 10;
    rowsPerPage4: number = 10;
    rowsPerPage5: number = 10;

    setPageSize1(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage1 = 10;

        } else {
            this.itemsPerPage1 = itemsPerPage;
        }
    }

    setPageSize2(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage2 = 10;
        } else {
            this.itemsPerPage2 = itemsPerPage;
        }
    }

    setPageSize3(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage3 = 10;
        } else {
            this.itemsPerPage3 = itemsPerPage;
        }
    }

    setPageSize4(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage4 = 10;
        } else {
            this.itemsPerPage4 = itemsPerPage;
        }
    }

    setPageSize5(itemsPerPage) {
        if (itemsPerPage == "") {
            this.itemsPerPage5 = 10;
        } else {
            this.itemsPerPage5 = itemsPerPage;
        }
    }




    onDepartmentStatusChange(deptId) {
        this.departments.is_Active = deptId;
        this.serverService.getDepartmentDataFromServers(0, this.departments.is_Active)
            .subscribe(Data => {
                this.department = Data;
            });
    }

    onLeaveTypesStatusChange(leaveId) {
        this.leaveTypes.is_Active = leaveId;
        this.serverService.getLeaveTypesDataFromServers(0, this.leaveTypes.is_Active)
            .subscribe(Data => {
                this.leaveType = Data;
            });
    }
    isActive: number;
    onTaxStatusChange(taxId) {
        this.taxes.status = taxId;
        this.tax = [];
        this.serverService.getTaxDataFromServers(0, taxId)
            .subscribe(Data => {
                this.tax = Data;
            });
    }

    onTeamStatusChange(teamid) {
        this.teams.status = teamid;
        this.serverService.getTeamDataFromServers(0, 0, 0, this.teams.status)
            .subscribe(Data => {
                this.team = Data;
            });
    }
    onBranchStatusChange(brnchId) {
        this.serverService.getTeamDataFromServers(brnchId, 0, 0, 0)
            .subscribe(Data => {
                this.team = Data;
            });
    }
    onManagerStatusChange(ManagerId) {
        this.serverService.getTeamDataFromServers(0, 0, ManagerId, 0)
            .subscribe(Data => {
                this.team = Data;
            });
    }

    onExpenseCategoryStatusChange(ExpenseId) {
        this.expenseCategories.is_Active = ExpenseId;
        this.serverService.getExpenseCategoryDataFromServers(0, this.expenseCategories.is_Active)
            .subscribe(Data => {
                this.expenseCategory = Data;
            });
    }
    constructor(private serverService: ServerService, private router: Router) { }
    setTaxId(taxId) {
        this.taxid = taxId
        this.router.navigate(['./addTax']);
        myGlobals.setTaxIDValue(this.taxid);
    }
    rowsPerPage: number;
    ngOnInit(): void {

        this.rowsPerPage = 10;

        this.serverService.getDepartmentDataFromServers(0, 0)
            .subscribe(Data => {
                this.department = Data;
            });

        this.serverService.getStatusDataFromServers(0, 1)
            .subscribe(Data => {
                this.status = Data;
                //new code status all below
                this.departments.is_Active = 0;
                this.leaveTypes.is_Active = 0;
                this.isActive = 0;
                this.teams.status = 0;
                this.expenseCategories.is_Active = 0;
            });

        this.serverService.getExpenseCategoryDataFromServers(0, 0)
            .subscribe(Data => {
                this.expenseCategory = Data;
            });

        this.serverService.getTeamDataFromServers(0, 0, 0, 0)
            .subscribe(Data => {
                this.team = Data;
            });

        this.serverService.getLeaveTypesDataFromServers(0, 0)
            .subscribe(Data => {
                this.leaveType = Data;
            });

        this.serverService.getTaxDataFromServers(0, 0)
            .subscribe(Data => {
                this.tax = Data;
            });

        this.serverService.getDivisionDataFromServers(0)
            .subscribe(Data => {
                this.division = Data;
            });
        this.serverService.getEmployeeDataFromServers(0, 0)

            .subscribe(Data => {
                this.employee = Data;

            });
        this.serverService.getBranchDataFromServers(0, 0)
            .subscribe(Data => {
                this.branch = Data;

            });

    }

    redirectToDepartment(departmentId) {
        this.router.navigate(['./addDepartments']);
        myGlobals.setDepartmentIDValue(departmentId);
    }

    redirectToLeaveTypes(leaveTypesId) {
        this.router.navigate(['./addLeaveTypes']);
        myGlobals.setLeaveTypeIDValue(leaveTypesId);
    }

    redirectToAddTax(taxId) {
        this.router.navigate(['./addTax']);
        myGlobals.setTaxIDValue(taxId);
    }

    redirectToAddTeam(branchId, teamId, managerId) {
        this.router.navigate(['./addTeam']);
        myGlobals.setTeamIDValue(branchId, teamId, managerId);
    }

    redirectToExpenseCategory(expenseCategoryId) {
        this.router.navigate(['./addExpenseCategory']);
        myGlobals.setExpenseCategoryIdValue(expenseCategoryId);
    }



    deleteDepartment(departmentId) {
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
                this.departments.id = departmentId;
                this.serverService.AddDepartmentDataToServers(this.departments, 'DELETE_DEPARTMENT')
                    .subscribe(deptId => {
                        this.ResponseStatus = deptId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getDepartmentData();
                    },
                    error => this.errorMessage = <any>error);


            }
        })


    }
    getDepartmentData() {
        this.serverService.getDepartmentDataFromServers(0, 0)
            .subscribe(Data => {
                this.department = Data;
            });
    }





    deleteLeaveType(LeaveTypeId) {
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
                this.leaveTypes.id = LeaveTypeId;
                this.serverService.AddLeaveTypeDataToServers(this.leaveTypes, "DELETE_LEAVE")
                    .subscribe(leaveId => {
                        this.ResponseStatus = leaveId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getLeaveTypeData();
                    },
                    error => this.errorMessage = <any>error);

            }
        })



    }
    getLeaveTypeData() {
        this.serverService.getLeaveTypesDataFromServers(0, 0)
            .subscribe(Data => {
                this.leaveType = Data;
            });
    }

    deleteTax(TaxId) {
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
                this.taxes.tax_Id = TaxId;
                this.serverService.AddTaxDataToServers(this.taxes, "DELETETAX")
                    .subscribe(Data => {
                        this.ResponseStatus = Data[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getTaxData();
                    },
                    error => this.errorMessage = <any>error);

            }
        })



    }
    getTaxData() {
        this.serverService.getTaxDataFromServers(0, 0)
            .subscribe(Data => {
                this.tax = Data;
            });
    }

    deleteTeam(BranchId, TeamId) {
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
                this.teams.team_Id = TeamId;
                this.teams.branch_Id = BranchId;
                this.serverService.AddTeamDataToServers(this.teams, "DELETE_TEAM")
                    .subscribe(teamId => {
                        this.ResponseStatus = teamId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getTeamData();
                    },
                    error => this.errorMessage = <any>error);


            }
        })


    }
    getTeamData() {
        this.serverService.getTeamDataFromServers(0, 0, 0, 0)
            .subscribe(Data => {
                this.team = Data;
            });
    }


    deleteExpenseCategory(ExpenseCategoryId) {
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
                this.expenseCategories.id = ExpenseCategoryId;
                this.serverService.AddExpenseCategoryDataToServers(this.expenseCategories, "DELETE_EXPENSETYPE")
                    .subscribe(categoryId => {
                        this.ResponseStatus = categoryId[0].errorCode;
                        if (this.ResponseStatus == "0") {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        this.getExpenseCategoryData();
                    },
                    error => this.errorMessage = <any>error);


            }
        })


    }

    getExpenseCategoryData() {
        this.serverService.getExpenseCategoryDataFromServers(0, 0)
            .subscribe(Data => {
                this.expenseCategory = Data;
            });
    }


    ngAfterViewInit() {

    }
}


