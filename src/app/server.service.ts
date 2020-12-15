import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
import { AssignBranch, TeamTarget, salesReport, Customerreport } from './componentDetails';
import { Branch } from './componentDetails';
import { Brand } from './componentDetails';
import { Company, AddCompany, TimeZone } from './componentDetails';
import { Catalog, AddCatalog } from './componentDetails';
import { Addpaymode, AddCuscategoty, Customer, AppCustomer, CutomerApproval, AddCustomer, Customerstatus, CustomerTarget, TargetCustomerTarget, Country, City, State, ModeOfPayment, CustomerType } from './componentDetails';
import { AddEmployee } from './componentDetails';
import { Employee } from './componentDetails';
import { MainMenu, SubMenu } from './componentDetails';
import { Expense, ExpenseStatus, AddExpense, ApproverExpense, ApproverExpenseDetails } from './componentDetails';
import { ClaimExpenseDetails, AddClaimExpenseDetails } from './componentDetails';
import { AddApproverExpense } from './componentDetails';
import { InventoryUpload, Docmentupload, InventoryClassificationLevelWise, InventoryCategoryLevelWise } from './componentDetails';
import { Cluster, AddCluster } from './componentDetails';
import { ProductCategory, AddProductCategory } from './componentDetails';
import { Department, AddDepartment, Status, EmployeeStatus } from './componentDetails';
import { Role, AddRole, CompanyRole, RoleHomePage, UserType, UserRoleAssign } from './componentDetails';
import { Team, AddTeam } from './componentDetails';
import { LeaveCount, DownloadPDF, StaffLeave, LeaveStatus, currency, LeaveDropDown, AddLeaveType, UpdateLeave, AddLeaveApplication } from './componentDetails';
import { Division } from './componentDetails';
import { Supplier, AddSupplier } from './componentDetails';
import { LeaveTypes, AddLeaveTypes, LeaveTypeMode, TotalStaffLeaveTaken, TotalStaffLeaveLeft, StaffLeaveDetails, LeaveType, StaffLeaveStatus } from './componentDetails';
import { ExpenseCategory, AddExpenseCategory, Tax } from './componentDetails';
import { AddBranch, HolidayUpload, AddSalesReport, FinishedGoods, UOM, PlaceOrder, OrderApproval, AccountantOrderApproval, SalesmenReportDetails } from './componentDetails';
import { SaleseTrakcer, Empmail, Bloodgroup, Dashboard, CustomerPath, DuplicateLeave, Password, ChangePassword, ExpenseTrakcer, LeaveTrakcer, AttendanceTrakcer } from './componentDetails';

@Injectable()
export class ServerService {
    // readonly compId: string = JSON.parse(localStorage.getItem('currentUser')).comp_Id;
    // readonly roleId: string = JSON.parse(localStorage.getItem('currentUser')).role_Id;
    // readonly token: string = JSON.parse(localStorage.getItem('currentUser')).token;
    // readonly loginId: string = JSON.parse(localStorage.getItem('currentUser')).login_Id;
    // readonly staff_Id: string = JSON.parse(localStorage.getItem('currentUser')).staff_Id;
    // readonly branch_Id: string = JSON.parse(localStorage.getItem('currentUser')).branch_Id;
    // readonly reporting_Manager: string = JSON.parse(localStorage.getItem('currentUser')).reporting_Manager;
    // readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;
    // readonly email_Id: string = JSON.parse(localStorage.getItem('currentUser')).email_Id;
    // readonly user_Name: string = JSON.parse(localStorage.getItem('currentUser')).user_Name;

    headers: Headers;
    options: RequestOptions;
    postResponse: any
    compId: any;
    staff_Id: any;
    token: any;
    loginId: any;
    user_Name: any;
    branch_Id: any;

    constructor(private httpService: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', });
        this.options = new RequestOptions({ headers: this.headers });
    }



    // http://localhost:57509

    ResetPasswordDetails(password: Password, loginid: number): Observable<Password> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Data = {
            // "comp_Id": password.comp_Id != undefined ? password.comp_Id : this.compId,
            // "token": password.token != undefined ? password.token : this.token,
            // "login_Id": password.login_Id != undefined ? password.login_Id : this.loginId,
            // "user_login_Id": password.user_login_Id != undefined ? password.user_login_Id : loginid,
        }
        return this.httpService.post(" http://localhost:57509/api/Login/resetPassword", Data, options)
            .map((response: Response) => <Password[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    ChangePasswordDetails(pa: ChangePassword, old_password: string, password: string): Observable<ChangePassword> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Data = {
            // "comp_Id": pa.comp_Id != undefined ? pa.comp_Id : this.compId,
            // "token": pa.token != undefined ? pa.token : this.token,
            // "login_Id": pa.login_Id != undefined ? pa.login_Id : this.loginId,
            // "password": pa.password != undefined ? pa.password : password,
            // "old_password": pa.old_password != undefined ? pa.old_password : old_password,
        }
        return this.httpService.post(" http://localhost:57509/api/Login/ChangePassword", Data, options)
            .map((response: Response) => <ChangePassword[]>response.json().data)
            .catch(this.handleErrorObservable);
    }
    getLoginDetails(): Observable<Empmail[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Login/getStaffLoginDet', {
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'comp_Id': this.compId,

            })

            .map((response: Response) => <Empmail[]>response.json().data)
    }

    getMainMenu(): Observable<MainMenu[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Sidebar/getSidebarMenu', {
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'comp_Id': this.compId,
                // 'role_Id': this.roleId
            })

            .map((response: Response) => <MainMenu[]>response.json().data)
    }

    getDashBoardDetails(): Observable<Dashboard[]> {
        return this.httpService
            .post(' http://localhost:57509/api/DailyUpload/getDashboardBranchCluster', {
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'comp_Id': this.compId,
                // 'staff_Id': this.staff_Id,
                // 'mode': "GETCLUSTERQUANTITY",
            })

            .map((response: Response) => <Dashboard[]>response.json().data)
    }






    getSubMenu(): Observable<SubMenu[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Sidebar/getSidebarSubMenu', {
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'comp_Id': this.compId,
                // 'role_Id': this.roleId
            })
            .map((response: Response) => <SubMenu[]>response.json().data)
    }


    getTeamTargetDataFromServers(branchId, teamId): Observable<TeamTarget[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Team/getTeamTarget', {
                // 'comp_Id': this.compId,
                // 'branch_Id': branchId,
                // 'team_Id': teamId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'mode': "GET_TEAM_MEMBER"

            })
            .map((response: Response) => <TeamTarget[]>response.json().data)
    }
    getEmployeeTargetDataFromServers(staffId): Observable<TeamTarget[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Team/getTeamTarget', {
                // 'comp_Id': this.compId,
                // 'staff_Id': staffId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'mode': "GET_SALESMAN_DETAILS"

            })
            .map((response: Response) => <TeamTarget[]>response.json().data)
    }
    getCustomerWiseTargetDataFromServers(customerId): Observable<TeamTarget[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Team/getTeamTarget', {
                // 'comp_Id': this.compId,
                // 'customer_id': customerId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'mode': "GET_CUSTOMER_DETAILS"

            })
            .map((response: Response) => <TeamTarget[]>response.json().data)
    }

    getAssignedBranchDataFromServers(staff_Id): Observable<AssignBranch[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffBranch', {
                // 'comp_Id': this.compId,
                // 'staff_Id': staff_Id,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'mode': "GET_STAFF_ASSIGNED_BRANCH"

            })
            .map((response: Response) => <AssignBranch[]>response.json().data)
    }


    getAssignBranchDataFromServers(staffNo): Observable<AssignBranch[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffDetails', {
                // 'comp_Id': this.compId,
                // 'staff_No': staffNo,
                // 'login_Id': this.loginId,
                // 'token': this.token,
            })
            .map((response: Response) => <AssignBranch[]>response.json().data)
    }

    saveAssignBranchDetails(assignBranch: AssignBranch, staffId: number, branchid: number,
        mode: string): Observable<AssignBranch> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let BranchAssignData = {
            // "comp_Id": assignBranch.comp_Id != undefined ? assignBranch.comp_Id : this.compId,
            // "branch_id": branchid != undefined ? branchid : this.branch_Id,
            // "staff_Id": staffId != undefined ? staffId : this.staff_Id,
            // "division_Id": 0,
            // "login_Id": assignBranch.login_Id != undefined ? assignBranch.login_Id : this.loginId,
            // "token": assignBranch.token != undefined ? assignBranch.token : this.token,
            // "user_name": assignBranch.userName != undefined ? assignBranch.userName : this.user_Name,
            // "IP_address": assignBranch.ip_Address != undefined ? assignBranch.ip_Address : "asd",
            // "device_Id": assignBranch.device_Id != undefined ? assignBranch.device_Id : "123",
            // "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Employee/insertUpdateEmployeeBranch", BranchAssignData, options)
            .map((response: Response) => <AssignBranch[]>response.json().data)
            .catch(this.handleErrorObservable);
    }




    //new code below 2 method 
    GetSalesreportdatewise(visited_date_from: Date, visited_date_to: Date, branchId: number, mode: string): Observable<salesReport[]> {
        return this.httpService
            .post(' http://localhost:57509/api/CustomerReport/getorderreport', {
                // "comp_id": this.compId,
                //    "staff_id":this.staff_Id,
                "branchId": branchId,
                //    "teamId":TeamId,
                "monthId": 1,
                "created_Date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "created_Date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                //    "login_Id":this.loginId,
                //    "token":this.token,
                "mode": mode

            })
            .map((response: Response) => <salesReport[]>response.json().data)
    }

    Getcustomerreport(monthId: number, mode: string): Observable<Customerreport[]> {
        return this.httpService
            .post('http://localhost:57509/api/CustomerReport/getcustomerreport', {
                // "comp_id": this.compId,
                // "staff_id": this.staff_Id,
                // "monthId": monthId,
                // "customer_Id":customer_id!=undefined ? customer_id:customer_id,
                "created_Date_From": "",
                "created_Date_TO": "",
                // "login_Id":this.loginId,
                // "token":this.token,
                "mode": mode

            })
            .map((response: Response) => <Customerreport[]>response.json().data)
    }


    //new code for customer report date filter

    Getcusdatefilter(visited_date_from: Date, visited_date_to: Date, mode: string): Observable<Customerreport[]> {
        return this.httpService
            .post('http://localhost:57509/api/CustomerReport/getcustomerreport', {
                // "comp_id": this.compId,
                // "staff_id": this.staff_Id,
                //  "monthId":1,
                "created_Date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "created_Date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                //  "login_Id":this.loginId,
                //  "token":this.token,
                "mode": mode

            })
            .map((response: Response) => <Customerreport[]>response.json().data)
    }





    GetSalesReportdetails_branch(branchId: number, monthId: number, mode: string): Observable<salesReport[]> {
        return this.httpService
            .post(' http://localhost:57509/api/CustomerReport/getorderreport', {
                // "comp_id": this.compId,
                //"staff_id":this.staff_Id,
                "branchId": branchId,
                //   "teamId":TeamId,
                "monthId": monthId != undefined ? monthId : 0,
                //   "visited_date_from": visited_date_from!=undefined ? visited_date_from:visited_date_from,
                //    "visited_date_to":visited_date_to!=undefined ? visited_date_to:visited_date_to,
                // "login_Id":this.loginId,
                // "token":this.token,
                "mode": mode

            })
            .map((response: Response) => <salesReport[]>response.json().data)
    }













    getBranchDataFromServers(branch_Id, is_Active): Observable<Branch[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Branch/getBranch', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'is_Active': is_Active,
                // 'token': this.token,
                'branch_Id': branch_Id
            })

            // //) 
            .map((response: Response) => <Branch[]>response.json().data)
    }



    addBranchData(branch: AddBranch, mode: string): Observable<AddBranch> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            // "comp_Id": branch.comp_Id != undefined ? branch.comp_Id : this.compId,
            // "branch_Id": branch.branch_Id != undefined ? branch.branch_Id : this.branch_Id,
            // "is_Active": branch.is_Active != undefined ? branch.is_Active : 0,
            // "login_Id": branch.login_Id != undefined ? branch.login_Id : this.loginId,
            // "userName": branch.userName != undefined ? branch.userName : this.user_Name,
            // "ip_Address": branch.ip_Address != undefined ? branch.ip_Address : "",
            // "device_Id": branch.device_Id != undefined ? branch.device_Id : "",
            // "mode": mode,
            // "token": branch.token != undefined ? branch.token : this.token,
            // "branch_Location": branch.branch_Location != undefined ? branch.branch_Location : "",
            "branch_Address": branch.branch_Address != undefined ? branch.branch_Address : "",
            "branch_Manager": branch.branch_Manager != undefined ? branch.branch_Manager : 0,
            "branch_Name": branch.branch_Name != undefined ? branch.branch_Name : ""
        }
        return this.httpService.post(" http://localhost:57509/api/Branch/insertUpdateBranch", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    getCompanyDataFromServer(comp_Id): Observable<Company[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Company/getCompany', {
                // 'comp_Id': comp_Id,
                // 'login_Id': this.loginId,
                // 'token': this.token,

            })

            .map((response: Response) => <Company[]>response.json().data)
    }

    updateCompanyDataTOServer(comapnyAddress: AddCompany): Observable<AddCompany> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Companybody = {
            // "comp_Id": comapnyAddress.comp_Id != undefined ? comapnyAddress.comp_Id : this.compId,
            // "comp_name": comapnyAddress.comp_name != undefined ? comapnyAddress.comp_name : "",
            // "registration_number": comapnyAddress.registration_number != undefined ? comapnyAddress.registration_number : "",
            // "tin_Number": comapnyAddress.tin_Number != undefined ? comapnyAddress.tin_Number : "",
            // "pan_Number": comapnyAddress.pan_Number != undefined ? comapnyAddress.pan_Number : "",
            // "reg_Office1": comapnyAddress.reg_Office1 != undefined ? comapnyAddress.reg_Office1 : "",
            // "telephone_Number": comapnyAddress.telephone_Number != undefined ? comapnyAddress.telephone_Number : "",
            // "mode": "UPDATE_COMPANY",
            // "token": comapnyAddress.token != undefined ? comapnyAddress.token : this.token,
            // "fax_Number": comapnyAddress.fax_Number != undefined ? comapnyAddress.fax_Number : "",
            // "website": comapnyAddress.website != undefined ? comapnyAddress.website : "",
            // "currency": comapnyAddress.currency != undefined ? comapnyAddress.currency : "",
            // "userTimeZone": comapnyAddress.userTimeZone != undefined ? comapnyAddress.userTimeZone : "",
            // "copy_Right": comapnyAddress.copy_Right != undefined ? comapnyAddress.copy_Right : "",
            // "login_Id": comapnyAddress.login_Id != undefined ? comapnyAddress.login_Id : this.loginId,
            // "userName": comapnyAddress.userName != undefined ? comapnyAddress.userName : this.user_Name,
            // "ip_Address": comapnyAddress.ip_Address != undefined ? comapnyAddress.ip_Address : "234",
            "device_Id": comapnyAddress.device_Id != undefined ? comapnyAddress.device_Id : "",
        }
        return this.httpService.post(" http://localhost:57509/api/Company/UpdateCompany", Companybody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    getBrandDataFromServers(category, brand): Observable<Brand[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Brand/getBrand', {
                // 'comp_Id': this.compId,
                // 'inventory_classification_id': category != undefined ? category : 0,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                'brand_Id': brand != undefined ? brand : 0,
            })
            .map((response: Response) => <Brand[]>response.json().data)
    }



    getCatalogDataFromServers(parentId, categoryId, brandId, item_Id, is_Active): Observable<Catalog[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Item/getItem', {
                // 'comp_Id': this.compId,
                // 'parent_Id': parentId != undefined ? parentId : 0,
                // 'inventory_classification_id': categoryId != undefined ? categoryId : 0,
                // 'brand_Id': brandId != undefined ? brandId : 0,
                // 'item_Id': item_Id != undefined ? item_Id : 0,
                // 'login_Id': this.loginId,
                // 'is_Active': is_Active != undefined ? is_Active : 0,
                // 'token': this.token
            })
            .map((response: Response) => <Catalog[]>response.json().data)
    }





    addCatalogData(catalog: AddCatalog, mode: string): Observable<AddCatalog> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Catalogbody = {
            // "comp_Id": catalog.comp_Id != undefined ? catalog.comp_Id : this.compId,
            // "parent_Id": catalog.parent_Id != undefined ? catalog.parent_Id : 0,
            // "inventory_classification_id": catalog.inventory_classification_id != undefined ? catalog.inventory_classification_id : 0,
            // "brand_Id": catalog.brand_Id != undefined ? catalog.brand_Id : 1,
            // "item_Id": catalog.item_Id != undefined ? catalog.item_Id : 0,
            // "item_Name": catalog.item_Name != undefined ? catalog.item_Name : "",
            // "pcs_Per_Weight": catalog.pcs_Per_Weight != undefined ? catalog.pcs_Per_Weight : 1,
            // "item_Code": catalog.item_Code != undefined ? catalog.item_Code : "",
            // "item_Category": catalog.item_Category != undefined ? catalog.item_Category : 1,
            // "item_Type": catalog.item_Type != undefined ? catalog.item_Type : 1,
            // "item_price": catalog.item_price != undefined ? catalog.item_price : 1,
            // "is_Active": catalog.is_Active != undefined ? catalog.is_Active : 1,
            // "login_Id": catalog.login_Id != undefined ? catalog.login_Id : this.loginId,
            // "token": catalog.token != undefined ? catalog.token : this.token,
            // "userName": catalog.userName != undefined ? catalog.userName : this.user_Name,
            // "ip_Address": catalog.ip_Address != undefined ? catalog.ip_Address : "123",
            "device_Id": catalog.device_Id != undefined ? catalog.device_Id : "324",
            "mode": mode,
        }
        return this.httpService.post(" http://localhost:57509/api/Item/InsertUpdateItem", Catalogbody, options)
            .map((response: Response) => <AddCatalog[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    addDailyInventoryData(itemId: number, branchId: number, quantity: number): Observable<InventoryUpload> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Inventorybody = {
            // "comp_Id": this.compId,
            // "item_Id": itemId != undefined ? itemId : 0,
            // "branch_Id": branchId != undefined ? branchId : this.branch_Id,
            // "quantityMT": quantity != undefined ? quantity : 0,
            // "login_Id": this.loginId,
            // "token": this.token,
            // "user_name": this.user_Name,
            // "ip_Address": "123",
            // "device_Id": "324"
        }
        return this.httpService.post(" http://localhost:57509/api/Item/UpdateDailyInventory", Inventorybody, options)
            .map((response: Response) => <InventoryUpload[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    getCustomerDataFromServers(customer_Id, status): Observable<Customer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Customer/getCustomer', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'status': status,
                // 'token': this.token,
                'customer_Id': customer_Id,

            })
            .map((response: Response) => <Customer[]>response.json().data)
    }


    //new code for customer caetgory list
    getvalueforcategorylist(): Observable<AddCuscategoty[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.httpService
            .post(' http://localhost:57509/api/Customer/getcategory', {
                options
            })
            .map((response: Response) => <AddCuscategoty[]>response.json().data
            )

        // JSON.parse(JSON.stringify(map((response: Response) => <AddCuscategoty[]>response.json().data) ))


    }

    //new code for customer paymode list
    getvalueforpaymentmode(): Observable<Addpaymode[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.httpService
            .post(' http://localhost:57509/api/Customer/getmodepay', {
                options
            })
            .map((response: Response) => <Addpaymode[]>response.json().data
            )

        // JSON.parse(JSON.stringify(map((response: Response) => <AddCuscategoty[]>response.json().data) ))


    }





    getCustomerPath(mode): Observable<CustomerPath[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {
                // 'login_Id': this.loginId,
                // 'comp_Id': this.compId,
                // //'id':pathid,
                // 'token': this.token,
                // 'mode': mode,

            })
            .map((response: Response) => <CustomerPath[]>response.json().data)
    }
    getCountryDataFromServers(): Observable<Country[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getCountry', {
                // 'login_Id': this.loginId,
                // 'token': this.token,
            })


            .map((response: Response) => <Country[]>response.json().data)
    }
    getStateDataFromServers(Countyid): Observable<State[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getState', {
                'country_Id': Countyid,
                // 'login_Id': this.loginId,
                // 'token': this.token,


            })


            .map((response: Response) => <State[]>response.json().data)
    }
    getCityDataFromServers(Countyid, StateId): Observable<City[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getCity', {
                // 'country_Id': Countyid,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                'state_Id': StateId,

            })


            .map((response: Response) => <City[]>response.json().data)
    }

    // getCustomerApprovalData(customer_Id,status): Observable<CutomerApproval[]> {
    //     return this.httpService
    //         .post(' http://localhost:57509/api/Customer/getCustomer', {
    //             'comp_Id':this.compId,
    //             'customer_Id':customer_Id,
    //             'status':status,
    //             'token':this.token,
    //             'login_Id':this.loginId
    //         })


    //         .map((response: Response) => <CutomerApproval[]>response.json().data)
    // }

    getCustomerApprovalData(customer_Id, status): Observable<CutomerApproval[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Customer/getUnapprovedCustomer', {
                // 'comp_Id': this.compId,
                // 'customer_Id': customer_Id,
                // 'status': status,
                // 'token': this.token,
                // 'login_Id': this.loginId,
                // 'staff_Id': this.staff_Id
            })


            .map((response: Response) => <CutomerApproval[]>response.json().data)
    }


    ApproveAndRejectCustomerApprovalData(cus: AppCustomer, customer_Id, status: number, mode: string): Observable<AppCustomer> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Data = {
            // "comp_Id": cus.comp_Id != undefined ? cus.comp_Id : this.compId,
            // "customer_Id": cus.customer_Id != undefined ? cus.customer_Id : customer_Id,
            // "status": cus.status != undefined ? cus.status : status,
            // "login_Id": cus.login_Id != undefined ? cus.login_Id : this.loginId,
            // "token": cus.token != undefined ? cus.token : this.token,
            "mode": mode

        }

        return this.httpService
            .post(' http://localhost:57509/api/Customer/insertUpdateCustomer', Data, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    addCustomerData(customer: AddCustomer, mode: string): Observable<AddCustomer> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {
            // "comp_Id": customer.comp_Id != undefined ? customer.comp_Id : this.compId,
            // "customer_Id": customer.customer_Id != undefined ? customer.customer_Id : 0,
            // "salesman": customer.salesman != undefined ? customer.salesman : 1,
            // "reffered_By": customer.reffered_By != undefined ? customer.reffered_By : "",
            // "contact_Person_Name": customer.contact_Person_Name != undefined ? customer.contact_Person_Name : "",
            // "customer_Type": customer.customer_Type != undefined ? customer.customer_Type : 0,
            // "contact_Person_designation": customer.contact_Person_designation != undefined ? customer.contact_Person_designation : "",
            // "customer_Name": customer.customer_Name != undefined ? customer.customer_Name : "",
            // "customer_Phone_Number": customer.customer_Phone_Number != undefined ? customer.customer_Phone_Number : "",
            // "contact_Person_Mobile_Number": customer.contact_Person_Mobile_Number != undefined ? customer.contact_Person_Mobile_Number : "",
            // "customer_Email": customer.customer_Email != undefined ? customer.customer_Email : "",
            // "contact_Person_Email": customer.contact_Person_Email != undefined ? customer.contact_Person_Email : "",
            // "nature_Of_Buisness": customer.nature_Of_Buisness != undefined ? customer.nature_Of_Buisness : "",
            // "annual_Turnover": customer.annual_Turnover != undefined ? customer.annual_Turnover : 5,
            // "credit_Limit": customer.credit_Limit != undefined ? customer.credit_Limit : 4,
            // "credit_days": customer.credit_days != undefined ? customer.credit_days : 2,
            // "mode_Of_Payment": customer.mode_Of_Payment != undefined ? customer.mode_Of_Payment : 0,
            // "current_Address": customer.current_Address != undefined ? customer.current_Address : "",
            // "current_State": customer.current_State != undefined ? customer.current_State : 1,
            // "current_City": customer.current_City != undefined ? customer.current_City : 1,
            // "current_Country": customer.current_Country != undefined ? customer.current_Country : 1,
            // "shipping_Address": customer.shipping_Address != undefined ? customer.shipping_Address : "",
            // "shipping_City": customer.shipping_City != undefined ? customer.shipping_City : 1,
            // "shipping_State": customer.shipping_State != undefined ? customer.shipping_State : 1,
            // "shipping_Country": customer.shipping_Country != undefined ? customer.shipping_Country : 1,
            // "current_Zipcode": customer.current_Zipcode != undefined ? customer.current_Zipcode : "",
            // "shipping_Zipcode": customer.shipping_Zipcode != undefined ? customer.shipping_Zipcode : "",
            // "pan_Number": customer.pan_Number != undefined ? customer.pan_Number : "",
            // "tin_Number": customer.tin_Number != undefined ? customer.tin_Number : "",
            // "gst_Number": customer.gst_Number != undefined ? customer.gst_Number : "",
            // "status": customer.status != undefined ? customer.status : 0,
            // "userId": customer.userId != undefined ? customer.userId : "123",
            // "buisness_Start_Date": customer.buisness_Start_Date != undefined ? customer.buisness_Start_Date : "",
            // "login_Id": customer.login_Id != undefined ? customer.login_Id : this.loginId,
            // "token": customer.token != undefined ? customer.token : this.token,
            "cust_code": customer.cust_code != undefined ? customer.cust_code : "",
            "sub_code": customer.sub_code != undefined ? customer.sub_code : "",
            "customer_category": customer.customer_category != undefined ? customer.customer_category : 0,
            "whatssup": customer.whatssup != undefined ? customer.whatssup : "",
            "mode": mode,
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/insertUpdateCustomer", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    //new code for category list 30-12-2019

    addCustomecategorylist(customercat: AddCuscategoty): Observable<AddCuscategoty> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {

            "category_name": customercat.category_name != undefined ? customercat.category_name : "",
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/insertcategory", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    //add payment mode
    addpaymentmode(paymode: Addpaymode): Observable<Addpaymode> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {

            "paymode_textname": paymode.paymode_textname != undefined ? paymode.paymode_textname : "",
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/insertmodepayment", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    // update category list
    updateCustomecategorylist(customercat: AddCuscategoty): Observable<AddCuscategoty> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {

            "cust_category_id1": customercat.cust_category_id1 != undefined ? customercat.cust_category_id1 : "",
            "category_name": customercat.category_name != undefined ? customercat.category_name : ""
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/update", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    // update category list
    updatepaymode(paymode: Addpaymode): Observable<Addpaymode> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {

            "paymode_id1": paymode.paymode_id1 != undefined ? paymode.paymode_id1 : "",
            "paymode_textname": paymode.paymode_textname != undefined ? paymode.paymode_textname : ""
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/updatemodepay", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }






    // for category list delete

    delCustomecategorylist(customercat: AddCuscategoty): Observable<AddCuscategoty> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {

            "cust_category_id": customercat.cust_category_id != undefined ? customercat.cust_category_id : "",
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/delete", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    // for category list delete

    deletepaymode(paymode: Addpaymode): Observable<Addpaymode> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let customerBody = {

            "paymode_id": paymode.paymode_id != undefined ? paymode.paymode_id : "",
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/deletemodepay", customerBody, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }





    getCustomerFileUploadDataFromServers(): Observable<CustomerTarget[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Customer/getCustomerTarget', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'customer_Id': 1,
                // 'cluster_Id': 1,

            })
            .map((response: Response) => <CustomerTarget[]>response.json().data)
    }


    getCustomerTargetDataFromServers(customerId): Observable<CustomerTarget[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Customer/getCustomerTarget', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                // 'customer_Id': customerId != undefined ? customerId : 0,
                // 'cluster_Id': 0,

            })


            .map((response: Response) => <CustomerTarget[]>response.json().data)
    }


    getTargetCustomerDataFromServers(target: TargetCustomerTarget): Observable<TargetCustomerTarget> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let targetData = {
            // "comp_Id": target.comp_Id != undefined ? target.comp_Id : this.compId,
            // "customer_Id": target.customer_Id != undefined ? target.customer_Id : 1,
            // "cluster_Id": target.cluster_Id != undefined ? target.cluster_Id : 1,
            // "target_Quantity": target.target_Quantity != undefined ? target.target_Quantity : "",
            // "status": target.status != undefined ? target.status : 1,
            // "login_Id": target.login_Id != undefined ? target.login_Id : this.loginId,
            // "token": target.token != undefined ? target.token : this.token,
            // "userName": target.userName != undefined ? target.userName : this.user_Name,
            // "ipAdress": target.ipAdress != undefined ? target.ipAdress : "",
            // "device_Id": target.device_Id != undefined ? target.device_Id : "23",

        }

        return this.httpService
            .post(' http://localhost:57509/api/Customer/insertUpdateCustomerTarget', targetData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    getEmployeeDataFromServers(staff_Id, status): Observable<Employee[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaff', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'status': status != undefined ? status : 0,
                // 'token': this.token,
                // 'staff_Id': staff_Id,

            })


            .map((response: Response) => <Employee[]>response.json().data)
    }



    saveEmployeeDetails(employee: AddEmployee, mode: string): Observable<AddEmployee> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let EmployeeData = {
            // "comp_Id": employee.comp_Id != undefined ? employee.comp_Id : this.compId,
            // "staff_Id": employee.staff_Id != undefined ? employee.staff_Id : this.staff_Id,
            // "first_Name": employee.first_Name != undefined ? employee.first_Name : "",
            // "last_Name": employee.last_Name != undefined ? employee.last_Name : "",
            // "staff_No": employee.staff_No != undefined ? employee.staff_No : "",
            // "designation_Id": employee.designation_Id != undefined ? employee.designation_Id : 0,
            // "department_Id": employee.department_Id != undefined ? employee.department_Id : 0,
            // "yrs_Exp": employee.yrs_Exp != undefined ? employee.yrs_Exp : 0,
            // "isMarried": employee.isMarried != undefined ? employee.isMarried : 0,
            // "date_Of_Birth": employee.date_Of_Birth != undefined ? employee.date_Of_Birth : "",
            // "gender": employee.gender != undefined ? employee.gender : "",
            // "blood_Group": employee.blood_Group != undefined ? employee.blood_Group : "",
            // "nationality": employee.nationality != undefined ? employee.nationality : "",
            // "father_Name": employee.father_Name != undefined ? employee.father_Name : "",
            // "mother_Name": employee.mother_Name != undefined ? employee.mother_Name : "",
            // "spouse_Name": employee.spouse_Name != undefined ? employee.spouse_Name : "",
            // "permnt_Address": employee.permnt_Address != undefined ? employee.permnt_Address : "",
            // "mob_No": employee.mob_No != undefined ? employee.mob_No : "",
            // "emergency_Name": employee.emergency_Name != undefined ? employee.emergency_Name : "",
            // "emergency_No": employee.emergency_No != undefined ? employee.emergency_No : "",
            // "email_Id": employee.email_Id != undefined ? employee.email_Id : "",
            // "current_Address": employee.current_Address != undefined ? employee.current_Address : "",
            // "esi_No": employee.esi_No != undefined ? employee.esi_No : "",
            // "pf_No": employee.pf_No != undefined ? employee.pf_No : "",
            // "eid_No": employee.eid_No != undefined ? employee.eid_No : "",
            // "status": employee.status != undefined ? employee.status : 0,
            // "user_name": employee.user_name != undefined ? employee.user_name : this.user_Name,
            // "IP_address": employee.IP_address != undefined ? employee.IP_address : "",
            // "device_Id": employee.device_Id != undefined ? employee.device_Id : "123",
            // "joining_Date": employee.joining_Date != undefined ? employee.joining_Date : "",
            // "approver_id": employee.approver_id != undefined ? employee.approver_id : 1,
            // "branch_id": employee.branch_id != undefined ? employee.branch_id : this.branch_Id,
            // "team_Id": employee.team_Id != undefined ? employee.team_Id : 0,
            // "division_Id": employee.division_Id != undefined ? employee.division_Id : 0,
            // "login_Id": employee.login_Id != undefined ? employee.login_Id : this.loginId,
            // "token": employee.token != undefined ? employee.token : this.token,
            // "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Employee/insertUpdateEmployee", EmployeeData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    getInventoryUploadDataFromServers(cluster, category, branch): Observable<InventoryUpload[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Item/getItemInventory', {
                // 'comp_Id': this.compId,
                // 'parent_Id': cluster != undefined ? cluster : 0,
                // 'inventory_classification_id': category != undefined ? category : 0,
                // 'branch_Id': branch != undefined ? branch : this.branch_Id,
                // 'item_Id': 0,
                // 'login_Id': this.loginId,
                // 'token': this.token

            })


            .map((response: Response) => <InventoryUpload[]>response.json().data)
    }



    // getInventoryClassificationOnLevelWiseFromServers(): Observable<InventoryClassificationLevelWise[]> {
    //     return this.httpService
    //         .post(' http://localhost:57509/api/InventoryClassification/getInventoryClassificationLevelWise', {
    //             'comp_Id':this.compId ,
    //             'parent_Id':0,                          
    //             'login_Id':this.loginId,
    //             'token':this.token  

    //         })


    //         .map((response: Response) => <InventoryClassificationLevelWise[]>response.json().data)
    // }

    // getInventoryCategoryOnLevelWiseFromServers(): Observable<InventoryCategoryLevelWise[]> {
    //     return this.httpService
    //         .post(' http://localhost:57509/api/InventoryClassification/getInventoryClassificationLevelWise', {
    //             'comp_Id':this.compId ,
    //             'parent_Id':1,                          
    //             'login_Id':this.loginId,
    //             'token':this.token  

    //         })


    //         .map((response: Response) => <InventoryCategoryLevelWise[]>response.json().data)
    // }


    // getClusterDataFromServers(): Observable<Cluster[]> {
    //     return this.httpService
    //         .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

    //             'comp_Id':this.compId ,
    //             'id':0,
    //             'login_Id':this.loginId,
    //             'token':this.token,
    //             'mode':"GET_CLUSTER"


    //         })


    //         .map((response: Response) => <Cluster[]>response.json())
    // }

    getClusterDataFromServers(Id, is_Active, mode): Observable<Cluster[]> {
        return this.httpService
            .post(' http://localhost:57509/api/InventoryClassification/getInventoryClassification', {

                // 'comp_Id': this.compId,
                // 'Id': Id,
                // 'is_Active': is_Active,
                // 'parent_Id': 0,
                // 'mode': mode,
                // 'login_Id': this.loginId,
                // 'token': this.token
            })


            .map((response: Response) => <Cluster[]>response.json().data)
    }

    addClusterData(product: AddCluster, mode: string): Observable<AddCluster> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Clusterbody = {
            // "comp_Id": product.comp_Id != undefined ? product.comp_Id : this.compId,
            // "parent_Id": product.parent_Id != undefined ? product.parent_Id : 0,
            // "Id": product.Id != undefined ? product.Id : 0,
            // "Name": product.Name != undefined ? product.Name : "",
            // "is_Active": product.is_Active != undefined ? product.is_Active : 1,
            // "login_Id": product.login_Id != undefined ? product.login_Id : this.loginId,
            // "token": product.token != undefined ? product.token : this.token,
            // "userName": product.userName != undefined ? product.userName : this.user_Name,
            // "ip_Address": product.ip_Address != undefined ? product.ip_Address : "123",
            // "device_Id": product.device_Id != undefined ? product.device_Id : "324",
            "mode": mode,
        }
        return this.httpService.post(" http://localhost:57509/api/InventoryClassification/insertUpdateInventoryClassification", Clusterbody, options)
            .map((response: Response) => <AddCluster[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    getProductCategoryDataFromServers(Id, is_Active, parent_Id, mode): Observable<ProductCategory[]> {
        return this.httpService
            .post(' http://localhost:57509/api/InventoryClassification/getInventoryClassification', {

                // 'comp_Id': this.compId,
                // 'Id': Id,
                // 'is_Active': is_Active,
                // 'parent_Id': parent_Id,
                // 'mode': mode,
                // 'login_Id': this.loginId,
                // 'token': this.token
            })


            .map((response: Response) => <ProductCategory[]>response.json().data)
    }

    addProductCategoryData(product: AddProductCategory, mode: string): Observable<AddProductCategory> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let productbody = {
            // "comp_Id": product.comp_Id != undefined ? product.comp_Id : this.compId,
            // "parent_Id": product.parent_Id != undefined ? product.parent_Id : 1,
            // "Id": product.Id != undefined ? product.Id : 0,
            // "Name": product.Name != undefined ? product.Name : "",
            // "is_Active": product.is_Active != undefined ? product.is_Active : 1,
            // "login_Id": product.login_Id != undefined ? product.login_Id : this.loginId,
            // "token": product.token != undefined ? product.token : this.token,
            // "userName": product.userName != undefined ? product.userName : this.user_Name,
            // "ip_Address": product.ip_Address != undefined ? product.ip_Address : "123",
            // "device_Id": product.device_Id != undefined ? product.device_Id : "324",
            "mode": mode,
        }
        return this.httpService.post(" http://localhost:57509/api/InventoryClassification/insertUpdateInventoryClassification", productbody, options)
            .map((response: Response) => <AddProductCategory[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    getSupplierDataFromServers(supplier_Id, status): Observable<Supplier[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Supplier/getSupplier', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'status': status,
                // 'token': this.token,
                // 'supplier_Id': supplier_Id,

            })


            .map((response: Response) => <Supplier[]>response.json().data)
    }



    saveSupplierDetails(supplier: AddSupplier, mode: string): Observable<AddSupplier> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let SupplierData = {
            // "comp_Id": supplier.comp_Id != undefined ? supplier.comp_Id : this.compId,
            // "supplier_Id": supplier.supplier_Id != undefined ? supplier.supplier_Id : 0,
            // "country_Id": supplier.country_Id != undefined ? supplier.country_Id : 1,
            // "state_Id": supplier.state_Id != undefined ? supplier.state_Id : 1,
            // "city_Id": supplier.city_Id != undefined ? supplier.city_Id : 1,
            // "status": supplier.status != undefined ? supplier.status : 1,
            // "billing_Rate": supplier.billing_Rate != undefined ? supplier.billing_Rate : 0,
            // "credit_Limit": supplier.credit_Limit != undefined ? supplier.credit_Limit : 0,
            // "registration_Number": supplier.registration_Number != undefined ? supplier.registration_Number : "",
            // "supplier_Code": supplier.supplier_Code != undefined ? supplier.supplier_Code : "",
            // "contact_Person_Name": supplier.contact_Person_Name != undefined ? supplier.contact_Person_Name : "",
            // "contact_Person_Email_Id": supplier.contact_Person_Email_Id != undefined ? supplier.contact_Person_Email_Id : "",
            // "contact_Person_Mobile_No": supplier.contact_Person_Mobile_No != undefined ? supplier.contact_Person_Mobile_No : "",
            // "address": supplier.address != undefined ? supplier.address : "",
            // "company_Name": supplier.company_Name != undefined ? supplier.company_Name : "",
            // "pincode": supplier.pincode != undefined ? supplier.pincode : "",
            // "phone_No": supplier.phone_No != undefined ? supplier.phone_No : "",
            // "website": supplier.website != undefined ? supplier.website : "",
            // "account_No": supplier.account_No != undefined ? supplier.account_No : "",
            // "pan_No": supplier.pan_No != undefined ? supplier.pan_No : "",
            // "fax": supplier.fax != undefined ? supplier.fax : "",
            // "gst_Number": supplier.gst_Number != undefined ? supplier.gst_Number : "",
            // "id_Card": supplier.id_Card != undefined ? supplier.id_Card : "",
            // "gst_certificate": supplier.gst_certificate != undefined ? supplier.gst_certificate : "",
            // "address_Proof": supplier.address_Proof != undefined ? supplier.address_Proof : "",
            // "visiting_Card": supplier.visiting_Card != undefined ? supplier.visiting_Card : "",
            // "supplier_Email_Id": supplier.supplier_Email_Id != undefined ? supplier.supplier_Email_Id : "",
            // "userName": supplier.userName != undefined ? supplier.userName : this.user_Name,
            // "ipAddress": supplier.ipAddress != undefined ? supplier.ipAddress : "212",
            // "device_Id": supplier.device_Id != undefined ? supplier.device_Id : "122",
            // "login_Id": supplier.login_Id != undefined ? supplier.login_Id : this.loginId,
            // "token": supplier.token != undefined ? supplier.token : this.token,
            // "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Supplier/insertUpdateSupplier", SupplierData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }



    getDepartmentDataFromServers(departmentId, is_Active): Observable<Department[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                // 'comp_Id': this.compId,
                // 'id': departmentId,
                // 'login_Id': this.loginId,
                // 'is_Active': is_Active,
                // 'token': this.token,
                // 'mode': "GET_DEPARTMENT"


            })


            .map((response: Response) => <Department[]>response.json().data)
    }


    AddDepartmentDataToServers(department: AddDepartment, mode: string): Observable<AddDepartment> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let departmentData = {
            // "comp_Id": department.comp_Id != undefined ? department.comp_Id : this.compId,
            // "id": department.id != undefined ? department.id : 0,
            // "Name": department.Name != undefined ? department.Name : "",
            // "userName": department.userName != undefined ? department.userName : this.user_Name,
            // "ipAddress": department.ipAddress != undefined ? department.ipAddress : "122",
            // "login_Id": department.login_Id != undefined ? department.login_Id : this.loginId,
            // "deviceId": department.deviceId != undefined ? department.deviceId : "",
            // "token": department.token != undefined ? department.token : this.token,
            // "mode": mode,
            // "is_Active": department.is_Active != undefined ? department.is_Active : 1,


        }

        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/insertUpdateMasterData', departmentData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }




    getRoleDataFromServers(role_Type_Id, role_Id, is_Active): Observable<Role[]> {
        return this.httpService
            .post(' http://localhost:57509/api/RoleCreation/getDetails', {
                // 'comp_Id': this.compId,
                // 'role_Type_Id': role_Type_Id != undefined ? role_Type_Id : 1,
                // 'is_Active': is_Active,
                // 'login_Id': this.loginId,
                // 'role_Id': role_Id,
                // 'token': this.token,
            })


            .map((response: Response) => <Role[]>response.json().data)
    }

    AddRoleDataToServers(addRole: AddRole, mode: string): Observable<AddRole> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let RoleData = {
            // "comp_Id": addRole.comp_Id != undefined ? addRole.comp_Id : this.compId,
            // "role_Id": addRole.role_Id != undefined ? addRole.role_Id : 0,
            // "sub_Menu_Id": addRole.sub_Menu_Id != undefined ? addRole.sub_Menu_Id : 0,
            // "role_Type_Id": addRole.role_Type_Id != undefined ? addRole.role_Type_Id : 0,
            // "role_Name": addRole.role_Name != undefined ? addRole.role_Name : "",
            // "role_Display_Name": addRole.role_Display_Name != undefined ? addRole.role_Display_Name : "",
            // "role_Description": addRole.role_Description != undefined ? addRole.role_Description : "",
            // "role_Home_Page": addRole.role_Home_Page != undefined ? addRole.role_Home_Page : "",
            // "is_Active": addRole.is_Active != undefined ? addRole.is_Active : 1,
            // "user_Name": addRole.user_Name != undefined ? addRole.user_Name : this.user_Name,
            // "ip_Address": addRole.ip_Address != undefined ? addRole.ip_Address : "122",
            // "login_Id": addRole.login_Id != undefined ? addRole.login_Id : this.loginId,
            // "token": addRole.token != undefined ? addRole.token : this.token,
            // "mode": mode,
        }

        return this.httpService
            .post(' http://localhost:57509/api/RoleCreation/insertRoleCreation', RoleData, options)
            .map((response: Response) => <AddRole[]>response.json())
            .catch(this.handleErrorObservable);
    }



    getRoleCompanyDropDownDataFromServers(): Observable<CompanyRole[]> {
        return this.httpService
            .post(' http://localhost:57509/api/RoleCreation/getCompName', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
            })
            .map((response: Response) => <CompanyRole[]>response.json().data)
    }

    getHomePageDropDownDataFromServers(): Observable<RoleHomePage[]> {
        return this.httpService
            .post(' http://localhost:57509/api/RoleCreation/gethomePage', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                //'mode'              
            })

            .map((response: Response) => <RoleHomePage[]>response.json().data)
    }
    getUserTypeDropDownDataFromServers(): Observable<UserType[]> {
        return this.httpService
            .post(' http://localhost:57509/api/RoleCreation/getUserType', {
                // 'comp_Id': this.compId,
                // 'login_Id': this.loginId,
                // 'token': this.token,
                //'mode'              
            })

            .map((response: Response) => <UserType[]>response.json().data)
    }
    // Menu Assign
    geMainMenuDropDownDataFromServers(): Observable<MainMenu[]> {
        return this.httpService
            .post(' http://localhost:57509/api/UserRoleAssign/getMainMenuName', {
                // 'comp_Id': this.compId,
                // 'nature_Id': 1,
                // 'module_Id': 1,
                // 'login_Id': this.loginId,
                // 'token': this.token,
            })
            .map((response: Response) => <MainMenu[]>response.json().data)
    }

    getMenuAssignDataFromServers(role, mainmenu): Observable<UserRoleAssign[]> {
        return this.httpService
            .post(' http://localhost:57509/api/UserRoleAssign/getDetail', {
                // 'comp_Id': this.compId,
                // 'nature_Id': 1,
                // 'module_Id': 1,
                // 'role_Id': role,
                // 'main_Menu_Id': mainmenu,
                // 'login_Id': this.loginId,
                // 'token': this.token,
            })
            .map((response: Response) => <UserRoleAssign[]>response.json().data)
    }

    updateRoleAssignDataToServers(roleId, mainMenuId, userAssign: UserRoleAssign, mode: string): Observable<UserRoleAssign> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let RoleData = {
            // 'comp_Id': userAssign.comp_Id != undefined ? userAssign.comp_Id : this.compId,
            // 'nature_Id': 1,
            // 'module_Id': 1,
            // 'role_Id': roleId != undefined ? roleId : 0,
            // 'main_Menu_Id': mainMenuId != undefined ? mainMenuId : 0,
            // "sub_Menu_Id": userAssign.sub_Menu_Id != undefined ? userAssign.sub_Menu_Id : 0,
            // "read_Flag": userAssign.read_Flag != undefined ? userAssign.read_Flag : 1,
            // "insert_Flag": userAssign.insert_Flag != undefined ? userAssign.insert_Flag : 1,
            // "update_Flag": userAssign.update_Flag != undefined ? userAssign.update_Flag : 1,
            // "delete_Flag": userAssign.delete_Flag != undefined ? userAssign.delete_Flag : 1,
            // "is_Active": userAssign.is_Active != undefined ? userAssign.is_Active : 1,
            // "login_Id": this.loginId,
            // "token": this.token,
            // "mode": mode,
        }

        return this.httpService
            .post(' http://localhost:57509/api/UserRoleAssign/updatedetail', RoleData, options)
            .map((response: Response) => <UserRoleAssign[]>response.json())
            .catch(this.handleErrorObservable);
    }

    exportSubMenuDataToServers(): Observable<UserRoleAssign> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let RoleData = {
            // 'comp_Id': this.compId,
            // "login_Id": this.loginId,
            // "token": this.token
        }
        return this.httpService
            .post(' http://localhost:57509/api/UserRoleAssign/exportMenu', RoleData, options)
            .map((response: Response) => <UserRoleAssign[]>response.json())
            .catch(this.handleErrorObservable);
    }

    getExpenseCategoryDataFromServers(CategoryId, is_Active): Observable<ExpenseCategory[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {
                // 'comp_Id': this.compId,
                // 'id': CategoryId,
                // 'login_Id': this.loginId,
                // 'is_Active': is_Active,
                // 'token': this.token,
                'mode': "GET_EXPENSETYPE "


            })


            .map((response: Response) => <ExpenseCategory[]>response.json().data)
    }

    AddExpenseCategoryDataToServers(expenseCategory: AddExpenseCategory, mode: string): Observable<AddExpenseCategory> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let expanseCategoryData = {
            "comp_Id": expenseCategory.comp_Id != undefined ? expenseCategory.comp_Id : this.compId,
            "id": expenseCategory.id != undefined ? expenseCategory.id : 0,
            "Name": expenseCategory.Name != undefined ? expenseCategory.Name : "",
            "userName": expenseCategory.userName != undefined ? expenseCategory.userName : this.user_Name,
            "ipAddress": expenseCategory.ipAddress != undefined ? expenseCategory.ipAddress : "122",
            "login_Id": expenseCategory.login_Id != undefined ? expenseCategory.login_Id : this.loginId,
            "deviceId": expenseCategory.deviceId != undefined ? expenseCategory.deviceId : "",
            "token": expenseCategory.token != undefined ? expenseCategory.token : this.token,
            "mode": mode,
            "is_Active": expenseCategory.is_Active != undefined ? expenseCategory.is_Active : 1,

        }

        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/insertUpdateMasterData', expanseCategoryData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    getLeaveTypesDataFromServers(LeaveId, is_Active): Observable<LeaveTypes[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {
                'comp_Id': this.compId,
                'id': LeaveId,
                'login_Id': this.loginId,
                'is_Active': is_Active,
                'token': this.token,
                'mode': "GET_LEAVE"
            })
            .map((response: Response) => <LeaveTypes[]>response.json().data)
    }

    getTaxDataFromServers(tax_Id, is_Active): Observable<Tax[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Tax/getTax', {
                'comp_Id': this.compId,
                'tax_Id': tax_Id,
                'login_Id': this.loginId,
                'is_Active': is_Active != undefined ? is_Active : 0,
                'token': this.token,
            })
            .map((response: Response) => <Tax[]>response.json().data)
    }

    AddTaxDataToServers(tax: Tax, mode: string): Observable<Tax> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let taxData = {
            "comp_Id": tax.comp_Id != undefined ? tax.comp_Id : this.compId,
            "tax_Id": tax.tax_Id != undefined ? tax.tax_Id : 0,
            "tax_Name": tax.tax_Name != undefined ? tax.tax_Name : "",
            "percentage": tax.percentage != undefined ? tax.percentage : 0,
            "user_Name": tax.user_Name != undefined ? tax.user_Name : this.user_Name,
            "ip_Address": tax.ip_Address != undefined ? tax.ip_Address : "122",
            "login_Id": this.loginId,
            "device_Id": "1991",
            "token": this.token,
            "mode": mode,
            "status": tax.status != undefined ? tax.status : 1,
        }

        return this.httpService
            .post(' http://localhost:57509/api/Tax/insertUpdateTax', taxData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    AddLeaveTypeDataToServers(leaveType: AddLeaveTypes, mode: string): Observable<AddLeaveTypes> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let leaveTypeData = {
            "comp_Id": leaveType.comp_Id != undefined ? leaveType.comp_Id : this.compId,
            "id": leaveType.id != undefined ? leaveType.id : 0,
            "Name": leaveType.Name != undefined ? leaveType.Name : "",
            "no_Of_Days": leaveType.no_Of_Days != undefined ? leaveType.no_Of_Days : 0,
            "userName": leaveType.userName != undefined ? leaveType.userName : this.user_Name,
            "ipAddress": leaveType.ipAddress != undefined ? leaveType.ipAddress : "122",
            "login_Id": leaveType.login_Id != undefined ? leaveType.login_Id : this.loginId,
            "deviceId": leaveType.deviceId != undefined ? leaveType.deviceId : "",
            "token": leaveType.token != undefined ? leaveType.token : this.token,
            "mode": mode,
            "is_Active": leaveType.is_Active != undefined ? leaveType.is_Active : 1,
        }

        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/insertUpdateMasterData', leaveTypeData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    getTeamDataFromServers(BranchId, TeamId, TeamManager, status): Observable<Team[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Team/getTeam', {
                'comp_Id': this.compId,
                'branch_Id': BranchId != undefined ? BranchId : this.branch_Id,
                'team_Id': TeamId != undefined ? TeamId : 0,
                'team_Manager': TeamManager != undefined ? TeamManager : 0,
                'login_Id': this.loginId,
                'status': status,
                'token': this.token
            })
            .map((response: Response) => <Team[]>response.json().data)
    }

    AddTeamDataToServers(addTeam: AddTeam, mode: string): Observable<AddTeam> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let addTeamData = {
            "comp_Id": addTeam.comp_Id != undefined ? addTeam.comp_Id : this.compId,
            "branch_Id": addTeam.branch_Id != undefined ? addTeam.branch_Id : this.branch_Id,
            "team_Id": addTeam.team_Id != undefined ? addTeam.team_Id : 0,
            "team_Manager": addTeam.team_Manager != undefined ? addTeam.team_Manager : 0,
            "login_Id": addTeam.login_Id != undefined ? addTeam.login_Id : this.loginId,
            "status": addTeam.status != undefined ? addTeam.status : 1,
            'token': this.token,
            "team_Name": addTeam.team_Name != undefined ? addTeam.team_Name : '',
            "userName": addTeam.userName != undefined ? addTeam.userName : this.user_Name,
            "ipAddress": addTeam.ipAddress != undefined ? addTeam.ipAddress : '',
            "device_Id": addTeam.device_Id != undefined ? addTeam.device_Id : '123',
            "mode": mode
        }

        return this.httpService
            .post(' http://localhost:57509/api/Team/insertUpdateTeam', addTeamData, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    getStatusDataFromServers(id, is_Active): Observable<Status[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': id,
                'mode': "GET_STATUS",
                'is_Active': is_Active,
                'login_Id': this.loginId,
                'token': this.token,
            })
            .map((response: Response) => <Status[]>response.json().data)
    }

    getEmployeeStatusDataFromServers(id, is_Active): Observable<EmployeeStatus[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': id,
                'mode': "GET_EMPLOYEE_STATUS",
                'is_Active': is_Active,
                'login_Id': this.loginId,
                'token': this.token,
            })
            .map((response: Response) => <EmployeeStatus[]>response.json().data)
    }

    getDivisionDataFromServers(division_id): Observable<Division[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Branch/getBranchDivision', {
                'comp_Id': this.compId,
                'login_Id': this.loginId,
                'token': this.token,
                'branch_Id': this.branch_Id,
                'division_id': division_id
            })

            .map((response: Response) => <Division[]>response.json().data)
    }


    getItemTypeDataFromServers(): Observable<Department[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': 0,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': "GET_ITEM_CATEGORY"


            })


            .map((response: Response) => <Department[]>response.json().data)
    }

    getItemCategoryDataFromServers(): Observable<Department[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': 0,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': "GET_ITEM_TYPE"


            })


            .map((response: Response) => <Department[]>response.json().data)
    }


    getCustomerTypeDataFromServers(): Observable<CustomerType[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': 0,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': "GET_CUSTOMER_TYPE"


            })


            .map((response: Response) => <CustomerType[]>response.json().data)
    }

    getModeOfPaymentDataFromServers(): Observable<ModeOfPayment[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': 0,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': "GET_MODE_OF_PAYMENT"


            })


            .map((response: Response) => <ModeOfPayment[]>response.json().data)
    }
    getcustomerStatusDataFromServers(): Observable<Customerstatus[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': 0,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': "GET_STATUS"


            })


            .map((response: Response) => <Customerstatus[]>response.json().data)
    }

    getTimeZoneDataDataFromServers(): Observable<TimeZone[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getTimezone', {

                'comp_Id': this.compId,
                'login_Id': this.loginId,
                'token': this.token
            })
            .map((response: Response) => <TimeZone[]>response.json().data)
    }

    // ------------------ExpenseDetails----------------------


    getExpenseDataFromServers(expense_id, status): Observable<Expense[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Expense/getExpense', {
                'comp_id': this.compId,
                'staff_id': this.staff_Id,
                'login_Id': this.loginId,
                'expense_id': expense_id,
                'token': this.token,
                'mode': 'GET_STAFF_EXPENSE',
                'status': status,
            })
            .map((response: Response) => <Expense[]>response.json().data)

    }
    getExpenseStatusDataFromServers(id, is_Active): Observable<ExpenseStatus[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': id,
                'mode': "GET_Expense_Status",
                'is_Active': is_Active,
                'login_Id': this.loginId,
                'token': this.token
            })
            .map((response: Response) => <ExpenseStatus[]>response.json().data)
    }



    SaveExpenseDataToServers(addExpense: AddExpense, expense_id: number, mode: string): Observable<AddExpense> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ExpenseData = {
            "comp_id": addExpense.comp_id != undefined ? addExpense.comp_id : this.compId,
            "expense_id": expense_id,
            "staff_id": addExpense.staff_id != undefined ? addExpense.staff_id : this.staff_Id,
            "name": addExpense.name != undefined ? addExpense.name : "",
            "userName": addExpense.userName != undefined ? addExpense.userName : this.user_Name,
            "ip_address": addExpense.ip_address != undefined ? addExpense.ip_address : "123",
            "device_Id": addExpense.device_Id != undefined ? addExpense.device_Id : "23",
            "staff_remarks": addExpense.staff_remarks != undefined ? addExpense.staff_remarks : "",
            "mode": mode,
            "login_Id": addExpense.login_Id != undefined ? addExpense.login_Id : this.loginId,
            'token': this.token,
        }

        return this.httpService
            .post(' http://localhost:57509/api/Expense/InsertUpdateExpense', ExpenseData, options)
            .map((response: Response) => <AddExpense[]>response.json().data[0])
            .catch(this.handleErrorObservable);
    }


    SaveSubmitForApprovalClaimExpense(addApprovalExpense: AddExpense, expense_id: number, mode: string): Observable<AddExpense> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ExpenseData = {
            "comp_id": addApprovalExpense.comp_id != undefined ? addApprovalExpense.comp_id : this.compId,
            "expense_id": expense_id,
            "ip_address": addApprovalExpense.ip_address != undefined ? addApprovalExpense.ip_address : "123",
            "device_Id": addApprovalExpense.device_Id != undefined ? addApprovalExpense.device_Id : "23",
            "login_Id": addApprovalExpense.login_Id != undefined ? addApprovalExpense.login_Id : this.loginId,
            'token': this.token,
            "mode": mode
        }

        return this.httpService
            .post(' http://localhost:57509/api/Expense/InsertUpdateExpense', ExpenseData, options)
            .map((response: Response) => <AddExpense[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    getClaimExpenseDetailsDataFromServers(expense_id, expense_type, expense_detail_id): Observable<ClaimExpenseDetails[]> {
        return this.httpService.post(' http://localhost:57509/api/Expense/getExpense', {
            'comp_id': this.compId,
            'expense_id': expense_id,
            'expense_type': expense_type,
            'expense_detail_id': expense_detail_id,
            'login_Id': this.loginId,
            'token': this.token,
            'mode': 'GET_STAFF_EXPENSE_DETAIL'
        })


            .map((response: Response) => <ClaimExpenseDetails[]>response.json().data)
    }


    SaveClaimExpenseDetailsDataToServers(addClaimExpenseDetails: AddClaimExpenseDetails, expenseType: number, expense_id: number, expense_detail_id: number, mode: string): Observable<AddClaimExpenseDetails> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {
            "comp_id": addClaimExpenseDetails.comp_id != undefined ? addClaimExpenseDetails.comp_id : this.compId,
            "expense_id": expense_id,
            "expense_detail_id": expense_detail_id,
            "from_Date": addClaimExpenseDetails.from_Date != undefined ? addClaimExpenseDetails.from_Date : "",
            "to_Date": addClaimExpenseDetails.to_Date != undefined ? addClaimExpenseDetails.to_Date : "",
            "from_location": addClaimExpenseDetails.from_location != undefined ? addClaimExpenseDetails.from_location : "",
            "to_location": addClaimExpenseDetails.to_location != undefined ? addClaimExpenseDetails.to_location : "",
            "bill_amount": addClaimExpenseDetails.bill_amount != undefined ? addClaimExpenseDetails.bill_amount : 1,
            "remarks": addClaimExpenseDetails.remarks != undefined ? addClaimExpenseDetails.remarks : "",
            "userName": addClaimExpenseDetails.userName != undefined ? addClaimExpenseDetails.userName : this.user_Name,
            "ip_address": addClaimExpenseDetails.ip_address != undefined ? addClaimExpenseDetails.ip_address : "123",
            "device_Id": addClaimExpenseDetails.device_Id != undefined ? addClaimExpenseDetails.device_Id : "23",
            "expense_type": expenseType != undefined ? expenseType : 0,
            "token": this.token,
            "mode": mode,
            "login_Id": addClaimExpenseDetails.login_Id != undefined ? addClaimExpenseDetails.login_Id : this.loginId,
        }
        return this.httpService
            .post(' http://localhost:57509/api/Expense/InsertUpdateExpense', ClaimExpenseData, options)
            .map((response: Response) => <AddClaimExpenseDetails[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    // ------------------Approve Expense----------------------

    getApproveExpenseDataFromServers(approver_id, expense_id, status, mode): Observable<ApproverExpense[]> {
        return this.httpService.post(' http://localhost:57509/api/Expense/getExpense', {
            'comp_id': this.compId,
            'approver_id': this.staff_Id,
            'expense_id': expense_id,
            'login_Id': this.loginId,
            'token': this.token,
            'mode': mode,
            'status': status
        })


            .map((response: Response) => <ApproverExpense[]>response.json().data)
    }

    // getApproveExpenseName(approver_id,expense_id): Observable<ApproverExpense[]> {
    //     return this.httpService.post(' http://localhost:57509/api/Expense/getExpense', {
    //             'comp_id':this.compId,
    //             'approver_id':approver_id,
    //             'expense_id':expense_id,
    //             'login_Id':this.loginId,
    //             'token':this.token,
    //             'mode': 'GET_APPROVER_EXPENSE'
    //         })


    //         .map((response: Response) => <ApproverExpense[]>response.json().data[0].name)
    // }

    SaveApproverExpenseDataToServers(addApproverExpense: AddApproverExpense, expense_id: number, status: number, mode: string): Observable<AddApproverExpense> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ApproveExpenseData = {
            "approver_remarks": addApproverExpense.approver_remarks != undefined ? addApproverExpense.approver_remarks : "",
            "status": status,
            "userName": addApproverExpense.userName != undefined ? addApproverExpense.userName : this.user_Name,
            "ip_address": addApproverExpense.ip_address != undefined ? addApproverExpense.ip_address : "123",
            "device_Id": addApproverExpense.device_Id != undefined ? addApproverExpense.device_Id : "23",
            "expense_id": expense_id,
            'token': this.token,
            "mode": mode,
            "login_Id": addApproverExpense.login_Id != undefined ? addApproverExpense.login_Id : this.loginId,
        }
        return this.httpService
            .post(' http://localhost:57509/api/Expense/InsertUpdateExpense', ApproveExpenseData, options)
            .map((response: Response) => <AddApproverExpense[]>response.json().data)
            .catch(this.handleErrorObservable);
    }


    getApproveExpenseDetailsDataFromServers(expense_id): Observable<ApproverExpenseDetails[]> {
        return this.httpService.post(' http://localhost:57509/api/Expense/getExpense', {
            'comp_id': this.compId,
            'expense_id': expense_id,
            'login_Id': this.loginId,
            'token': this.token,
            'mode': 'GET_APPROVER_EXPENSE_DETAIL'
        })


            .map((response: Response) => <ApproverExpenseDetails[]>response.json().data)
    }

    // SaveApproverExpenseDetailsDataToServers(addApproverExpenseDetails:AddApproverExpenseDetails,expense_id:number,status:number, mode:string):Observable<ApproverExpenseDetails> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     let ClaimExpenseData={

    //         "status":status,              
    //         "userName" : addApproverExpenseDetails.userName != undefined ? addApproverExpenseDetails.userName :"test",
    //         "ip_address" : addApproverExpenseDetails.ip_address != undefined ? addApproverExpenseDetails.ip_address :"123",
    //         "device_Id" : addApproverExpenseDetails.device_Id != undefined ? addApproverExpenseDetails.device_Id :"23",
    //         "expense_id" :expense_id,
    //         "expense_detail_id" : addApproverExpenseDetails.expense_detail_id != undefined ? addApproverExpenseDetails.expense_detail_id :1,
    //         'token': this.token,  
    //         "mode" : mode,
    //         "login_Id" : addApproverExpenseDetails.login_Id != undefined ? addApproverExpenseDetails.login_Id:this.loginId,
    //     }
    //     return this.httpService
    //     .post(' http://localhost:57509/api/Expense/InsertUpdateExpense',ClaimExpenseData,options)
    //     .map((response: Response) => <AddApproverExpenseDetails[]>response.json().data)
    //         .catch(this.handleErrorObservable);
    // }

    // ------------------Apply Leave ----------------------


    PostLeaveCountData(leaveCount: LeaveCount): Observable<LeaveCount> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {

            "comp_id": leaveCount.comp_id != undefined ? leaveCount.comp_id : this.compId,
            "year_Id": leaveCount.year_Id != undefined ? leaveCount.year_Id : "test",
            "designation_Id": leaveCount.designation_Id != undefined ? leaveCount.designation_Id : "123",
            "leave_Id": leaveCount.leave_Id != undefined ? leaveCount.leave_Id : 0,
            "login_Id": leaveCount.login_Id != undefined ? leaveCount.login_Id : this.loginId,
            'token': this.token,

        }
        return this.httpService
            .post(' http://localhost:57509/api/Expense/InsertUpdateExpense', ClaimExpenseData, options)
            .map((response: Response) => <LeaveCount[]>response.json().data)
            .catch(this.handleErrorObservable);
    }
    getLeaveDropDownDataFromServers(): Observable<LeaveDropDown[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/getLeave', {
            'comp_id': this.compId,
            'login_Id': this.loginId,
            'token': this.token,
            'mode': "GETLEAVEDRP",

        })


            .map((response: Response) => <LeaveDropDown[]>response.json().data)
    }

    getLeaveTypeModeDataFromServers(): Observable<LeaveTypeMode[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/getLeaveTypeMode', {
            'login_Id': this.loginId,
            'token': this.token,
        })


            .map((response: Response) => <LeaveTypeMode[]>response.json().data)
    }

    getTotalStaffLeaveTakenFromServers(): Observable<TotalStaffLeaveTaken[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/getTotalLeaveTaken', {
            'comp_id': this.compId,
            'year_Id': 1,
            'leave_Id': 0,
            'staffId': this.staff_Id,
            'designation_Id': 1,
            'login_Id': this.loginId,
            'token': this.token,
        })


            .map((response: Response) => <TotalStaffLeaveTaken[]>response.json().data)
    }
    getTotalStaffLeaveLeftFromServers(): Observable<ApproverExpenseDetails[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/getTotalLeaveLeft', {
            'comp_id': this.compId,
            'year_Id': 1,
            'leave_Id': 0,
            'staffId': this.staff_Id,
            'designation_Id': 1,
            'no_Of_Day': 1,
            'login_Id': this.loginId,
            'token': this.token,
        })


            .map((response: Response) => <ApproverExpenseDetails[]>response.json().data)
    }

    getStaffLeaveDetailsFromServers(status_Of_Leave): Observable<StaffLeaveDetails[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/getStaffLeaveDetails', {
            'comp_id': this.compId,
            'year_Id': (new Date()).getFullYear(),
            'login_Id': this.loginId,
            'token': this.token,
            'status_Of_Leave': status_Of_Leave
        })


            .map((response: Response) => <StaffLeaveDetails[]>response.json().data)
    }
    getApproveLeaveStatusDataFromServers(id, is_Active): Observable<LeaveStatus[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': id,
                'mode': "GET_LEAVE_STATUS",
                'is_Active': is_Active,
                'login_Id': this.loginId,
                'token': this.token
            })
            .map((response: Response) => <LeaveStatus[]>response.json().data)
    }

    geCurrencyDataFromServers(id, is_Active): Observable<currency[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {

                'comp_Id': this.compId,
                'id': id,
                'mode': "GET_CURRENCY",
                'is_Active': is_Active,
                'login_Id': this.loginId,
                'token': this.token
            })
            .map((response: Response) => <currency[]>response.json().data)
    }


    getBloodGroupDataFromServers(): Observable<Bloodgroup[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {
                'comp_Id': this.compId,
                'mode': "GET_BLOOD_GROUP",
                'login_Id': this.loginId,
                'token': this.token
            })
            .map((response: Response) => <Bloodgroup[]>response.json().data)
    }


    getLeaveTypeFromServers(): Observable<LeaveType[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/getLeaveTypeDec', {
            'comp_id': this.compId,
            'year_Id': (new Date()).getFullYear(),
            'login_Id': this.loginId,
            'token': this.token,
        })


            .map((response: Response) => <LeaveType[]>response.json().data)
    }

    getStaffLeaveStatusFromServers(status_Of_Leave, application_Id, mode): Observable<StaffLeaveStatus[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/GetStaffLeaveStatus', {
            'comp_Id': this.compId,
            'application_Id': application_Id,
            'year_Id': (new Date()).getFullYear(),
            'staffId': this.staff_Id,
            'status_Of_Leave': status_Of_Leave,
            'login_Id': this.loginId,
            'token': this.token,
            'mode': mode,
            // 'leaveTypeId':leaveTypeId
        })


            .map((response: Response) => <StaffLeaveStatus[]>response.json().data)
    }


    getStaffApproveLeaveFromServers(status_Id, mode): Observable<StaffLeave[]> {
        return this.httpService.post(' http://localhost:57509/api/Leave/GetStaffLeaveStatus', {
            'comp_Id': this.compId,
            'application_Id': 0,
            'year_Id': (new Date()).getFullYear(),
            'staffId': this.staff_Id,
            'status_Of_Leave': status_Id,
            'login_Id': this.loginId,
            'token': this.token,
            'mode': mode,
            // 'leaveTypeId':leaveTypeId
        })


            .map((response: Response) => <StaffLeave[]>response.json().data)
    }

    SaveLeaveTypeApplicationDataTOServers(leaveCount: LeaveCount): Observable<LeaveCount> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {

            "comp_id": leaveCount.comp_id != undefined ? leaveCount.comp_id : this.compId,
            "year_Id": leaveCount.year_Id != undefined ? leaveCount.year_Id : "test",
            "designation_Id": leaveCount.designation_Id != undefined ? leaveCount.designation_Id : "123",
            "leave_Id": leaveCount.leave_Id != undefined ? leaveCount.leave_Id : 0,
            "login_Id": leaveCount.login_Id != undefined ? leaveCount.login_Id : this.loginId,
            'token': this.token,

        }
        return this.httpService
            .post(' http://localhost:57509/api/Expense/InsertUpdateExpense', ClaimExpenseData, options)
            .map((response: Response) => <LeaveCount[]>response.json().data)
            .catch(this.handleErrorObservable);
    }


    SaveLeaveTypeDataToServers(leaveType: AddLeaveType): Observable<AddLeaveType> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {

            "comp_Id": leaveType.comp_Id != undefined ? leaveType.comp_Id : this.compId,
            "year_Id": leaveType.year_Id != undefined ? leaveType.year_Id : 0,
            "designation_Id": leaveType.designation_Id != undefined ? leaveType.designation_Id : 0,
            "leavetype_Id": leaveType.leavetype_Id != undefined ? leaveType.leavetype_Id : 0,
            "leavetypemaster_Id": leaveType.leavetypemaster_Id != undefined ? leaveType.leavetypemaster_Id : 0,
            "leave_entitlement": leaveType.leave_entitlement != undefined ? leaveType.leave_entitlement : 0,
            "leaveTypeCount": leaveType.leaveTypeCount != undefined ? leaveType.leaveTypeCount : 0,
            "document_Need": leaveType.document_Need != undefined ? leaveType.document_Need : 0,
            "leavetype_mode": leaveType.leavetype_mode != undefined ? leaveType.leavetype_mode : 0,
            "login_Id": leaveType.login_Id != undefined ? leaveType.login_Id : this.loginId,
            "ipAddress": leaveType.ipAddress != undefined ? leaveType.ipAddress : "123",
            "userNameUpdate": leaveType.userNameUpdate != undefined ? leaveType.userNameUpdate : 0,
            "mode": leaveType.mode != undefined ? leaveType.mode : "",
            'token': this.token,

        }
        return this.httpService
            .post(' http://localhost:57509/api/Leave/InsertLeaveData', ClaimExpenseData, options)
            .map((response: Response) => <AddLeaveType[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    SaveLeaveApplicationDataToServers(addLeaveApplication: AddLeaveApplication, leave_Id: number, application_Id: number, mode: string): Observable<AddLeaveApplication> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {

            "comp_Id": addLeaveApplication.comp_Id != undefined ? addLeaveApplication.comp_Id : this.compId,
            "year_Id": addLeaveApplication.year_Id != undefined ? addLeaveApplication.year_Id : new Date().getFullYear(),
            "leave_Id": leave_Id,
            "staffId": addLeaveApplication.staffId != undefined ? addLeaveApplication.staffId : this.staff_Id,
            "application_Id": application_Id,
            "noOfDay": addLeaveApplication.noOfDay != undefined ? addLeaveApplication.noOfDay : 0,
            "TotalLeave": addLeaveApplication.TotalLeave != undefined ? addLeaveApplication.TotalLeave : 0,
            "leaveTaken": addLeaveApplication.leaveTaken != undefined ? addLeaveApplication.leaveTaken : 0,
            "login_Id": addLeaveApplication.login_Id != undefined ? addLeaveApplication.login_Id : this.loginId,
            "designation_Id": addLeaveApplication.designation_Id != undefined ? addLeaveApplication.designation_Id : 0,
            "from_Date": addLeaveApplication.from_Date != undefined ? addLeaveApplication.from_Date : "",
            "to_Date": addLeaveApplication.to_Date != undefined ? addLeaveApplication.to_Date : "",
            "document_Need": addLeaveApplication.document_Need != undefined ? addLeaveApplication.document_Need : "test",
            "addressOnLeave": addLeaveApplication.addressOnLeave != undefined ? addLeaveApplication.addressOnLeave : "123",
            "remarks": addLeaveApplication.remarks != undefined ? addLeaveApplication.remarks : "",
            "device_Id": addLeaveApplication.device_Id != undefined ? addLeaveApplication.device_Id : "123",
            "ipAddress": addLeaveApplication.ipAddress != undefined ? addLeaveApplication.ipAddress : "23",
            "userNameUpdate": addLeaveApplication.userNameUpdate != undefined ? addLeaveApplication.userNameUpdate : "",
            "mode": mode,
            'token': this.token,

        }
        return this.httpService
            .post(' http://localhost:57509/api/Leave/InsertUpdateLeaveApplication', ClaimExpenseData, options)
            .map((response: Response) => <AddLeaveApplication[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    getDuplicateLeaveData(duplicateLeave: DuplicateLeave, fromDate: string, Todate: string, mode: string): Observable<DuplicateLeave> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {

            "comp_Id": duplicateLeave.comp_Id != undefined ? duplicateLeave.comp_Id : this.compId,
            "year_Id": duplicateLeave.year_Id != undefined ? duplicateLeave.year_Id : new Date().getFullYear(),
            "staffId": duplicateLeave.staffId != undefined ? duplicateLeave.staffId : this.staff_Id,
            "from_Date": duplicateLeave.from_Date != undefined ? duplicateLeave.from_Date : fromDate,
            "to_Date": duplicateLeave.to_Date != undefined ? duplicateLeave.to_Date : Todate,
            "mode": mode,
            "login_Id": duplicateLeave.login_Id != undefined ? duplicateLeave.login_Id : this.loginId,
            "token": this.token,

        }
        return this.httpService
            .post(' http://localhost:57509/api/Leave/InsertUpdateLeaveApplication', ClaimExpenseData, options)
            .map((response: Response) => <DuplicateLeave[]>response.json().data)
            .catch(this.handleErrorObservable);
    }

    SaveLeaveUpdateDataToServers(updateLeave: UpdateLeave, status_Of_Leave: number, application_Id: number, staffId: number, LeaveId: number, manager_Remarks: string, daycount, date: string): Observable<UpdateLeave> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let ClaimExpenseData = {

            "comp_Id": updateLeave.comp_Id != undefined ? updateLeave.comp_Id : this.compId,
            "year_Id": updateLeave.year_Id != undefined ? updateLeave.year_Id : new Date().getFullYear(),
            "staffId": staffId,
            "noOfDay": updateLeave.noOfDay != undefined ? updateLeave.noOfDay : daycount,
            "status_Of_Leave": status_Of_Leave,
            "leave_Id": LeaveId,
            "application_Id": application_Id,
            "login_Id": updateLeave.login_Id != undefined ? updateLeave.login_Id : this.loginId,
            "to_Date": date != undefined ? date : "30/12/2020",
            "device_Id": updateLeave.device_Id != undefined ? updateLeave.device_Id : "123",
            "ipAddress": updateLeave.ipAddress != undefined ? updateLeave.ipAddress : "12",
            "userNameUpdate": updateLeave.userNameUpdate != undefined ? updateLeave.userNameUpdate : "123",
            "manager_Remarks": updateLeave.manager_Remarks != undefined ? updateLeave.manager_Remarks : manager_Remarks,

            'token': this.token,
            // 'mode':"UPDATELEAVESTATUS"

        }
        return this.httpService
            .post(' http://localhost:57509/api/Leave/UpdateLeaveStatus', ClaimExpenseData, options)
            .map((response: Response) => <UpdateLeave[]>response.json().data)
            .catch(this.handleErrorObservable);
    }
    // Holiday List
    getHolidayListFromServers(year): Observable<HolidayUpload[]> {
        return this.httpService
            .post(' http://localhost:57509/api/HolidayUploads/getHolidayList', {
                'comp_Id': this.compId,
                'year_Id': year,
                'login_Id': this.loginId,
                'token': this.token,
            })

            // //) 
            .map((response: Response) => <HolidayUpload[]>response.json().data)
    }

    getFinishedGoodsFromServers(finishedGood_Id, itemId, raw_Material_Id, mode): Observable<FinishedGoods[]> {
        return this.httpService
            .post(' http://localhost:57509/api/FinishedGoods/GetFinishedGoodsDetails', {
                'comp_Id': this.compId,
                'item_Id': itemId,
                "finished_Good": finishedGood_Id != undefined ? finishedGood_Id : 0,
                'raw_Material_Id': raw_Material_Id,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': mode
            })
            .map((response: Response) => <FinishedGoods[]>response.json().data)
    }

    getUOMDataFromServers(): Observable<UOM[]> {
        return this.httpService
            .post(' http://localhost:57509/api/MasterSetting/getMasterData', {
                'comp_Id': this.compId,
                'login_Id': this.loginId,
                'token': this.token,
                'mode': "GET_UOM"


            })
            .map((response: Response) => <UOM[]>response.json().data)
    }
    saveFinishedGoods(fdGoods: FinishedGoods, finishedGood_Id: number, mode: string): Observable<FinishedGoods> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let FinishedGoodsData = {
            "comp_Id": this.compId,
            "item_Id": fdGoods.item_Id != undefined ? fdGoods.item_Id : 0,
            "raw_Material_Id": fdGoods.raw_Material_Id != undefined ? fdGoods.raw_Material_Id : 0,
            "finished_Good": finishedGood_Id != undefined ? finishedGood_Id : 0,
            "uom": fdGoods.uom != undefined ? fdGoods.uom : 0,
            "quantity": fdGoods.quantity != undefined ? fdGoods.quantity : 0,
            "user_Name": this.user_Name,
            "ip_Address": "demo",
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/FinishedGoods/GetFinishedGoodsDetails", FinishedGoodsData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    getRateAndQuantityDataFromServers(branch: number, category: number, item: number): Observable<PlaceOrder[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Order/getQuantityAndRate', {
                "comp_Id": this.compId,
                "branch_Id": branch != undefined ? branch : this.branch_Id,
                "category_Id": category,
                "item_Id": item,
                "device_Id": "123",
                "login_Id": this.loginId,
                "token": this.token
            })
            .map((response: Response) => <PlaceOrder[]>response.json().data)
    }
    getOrderApprovalDataByDateFromServers(date: Date, mode: string): Observable<OrderApproval[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Order/getOrders', {
                "comp_Id": this.compId,
                "staff_Id": this.staff_Id,
                // "customer_Id":0,
                "order_Date": date,
                "device_Id": "123",
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode
            })
            .map((response: Response) => <OrderApproval[]>response.json().data)
    }
    getOrderApprovalDataFromServers(branch: number, order: number, customerId: number, status: number, mode: string, customer_id: number): Observable<OrderApproval[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Order/getOrders', {
                "comp_Id": this.compId,
                "branch_Id": branch != undefined ? branch : this.branch_Id,
                "staff_Id": this.staff_Id,
                "customer_Id": customerId,
                "order_Id": order != undefined ? order : 0,
                "status": status != undefined ? status : 0,
                "customer_id": customer_id,
                "device_Id": "123",
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode
            })
            .map((response: Response) => <OrderApproval[]>response.json().data)
    }
    updateOrderApproval(order: number, approve: number, remarks: string, mode: string): Observable<OrderApproval> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let OrderApprovalData = {
            "comp_Id": this.compId,
            "staff_Id": this.staff_Id,
            "order_Id": order != undefined ? order : 0,
            "manager_Approved": approve != undefined ? approve : 0,
            "manager_remarks": remarks != undefined ? remarks : "",
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Order/InsertUpdateItem", OrderApprovalData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    getAccountantOrderApprovalDataFromServers(branch: number, order: number, customerId: number, status: number, mode: string): Observable<AccountantOrderApproval[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Order/getOrders', {
                "comp_Id": this.compId,
                "branch_Id": branch != undefined ? branch : this.branch_Id,
                "staff_Id": this.staff_Id,
                "customer_Id": customerId,
                "order_Id": order != undefined ? order : 0,
                "status": status != undefined ? status : 0,
                "device_Id": "123",
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode
            })
            .map((response: Response) => <AccountantOrderApproval[]>response.json().data)
    }
    updateAccountantOrderApproval(order: number, approve: number, remarks: string, mode: string): Observable<AccountantOrderApproval> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let AccountantOrderApprovalData = {
            "comp_Id": this.compId,
            "Accounts_Approver_Id": 1,
            "order_Id": order != undefined ? order : 0,
            "Accounts_Approved": approve != undefined ? approve : 0,
            "Accounts_remark": remarks != undefined ? remarks : "",
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Order/InsertUpdateItem", AccountantOrderApprovalData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    updateDispatchOrderApproval(order: number, approve: number, remarks: string, mode: string): Observable<AccountantOrderApproval> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let AccountantOrderApprovalData = {
            "comp_Id": this.compId,
            "Dispatch_Approver_Id": 1,
            "order_Id": order != undefined ? order : 0,
            "Dispatch_Approved": approve != undefined ? approve : 0,
            "Dispatch_Remarks": remarks != undefined ? remarks : "",
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Order/InsertUpdateItem", AccountantOrderApprovalData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    savePlaceOrderDataToServer(customerId: number, branchId: number, refNum: string, remarks: string, mode: string): Observable<PlaceOrder> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let PlaceOrderData = {
            "comp_Id": this.compId,
            "order_Id": 1,
            "customer_Id": customerId != undefined ? customerId : 0,
            "staff_Id": this.staff_Id,
            "branch_Id": branchId != undefined ? branchId : this.branch_Id,
            "order_Ref_Number": refNum != undefined ? refNum : '',
            "staff_Remarks": remarks != undefined ? remarks : '',
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Order/InsertUpdateItem", PlaceOrderData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    savePlaceOrderTaxDataToServer(orderId: number, taxId: number, amount: any, mode: string): Observable<PlaceOrder> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let PlaceOrderData = {
            "comp_Id": this.compId,
            "order_Id": orderId != undefined ? orderId : 0,
            "tax_Id": taxId != undefined ? taxId : 0,
            "amount": amount != undefined ? amount : 0,
            "user_Name": this.user_Name,
            "ip_Address": "demo",
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Order/InsertUpdateItem", PlaceOrderData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    savePlaceOrderDetailDataToServer(orderId: number, itemId: number,
        quantity: Float32Array, uom: number, price: Float32Array, mode: string): Observable<PlaceOrder> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let PlaceOrderData = {
            "comp_Id": this.compId,
            "order_Id": orderId != undefined ? orderId : 0,
            "item_id": itemId != undefined ? itemId : 0,
            "quantity": quantity != undefined ? quantity : 0,
            "uom": uom != undefined ? uom : 0,
            "price": price != undefined ? price : 0,
            "user_Name": this.user_Name,
            "ip_Address": "demo",
            "device_Id": "123",
            "login_Id": this.loginId,
            "token": this.token,
            "mode": mode
        }
        return this.httpService.post(" http://localhost:57509/api/Order/InsertUpdateItem", PlaceOrderData, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    downloadOrderReceipt(): Observable<PlaceOrder[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Order/generateBill', {
                'comp_Id': this.compId,
                "login_Id": this.loginId,
                "token": this.token,
            })
            .map((response: Response) => <PlaceOrder[]>response.json().data)
    }



    CustomerDocumentUpload(doc: Docmentupload): Observable<Docmentupload> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Body = {
            "compId": doc.compId != undefined ? doc.compId : this.compId,
            "customerId": doc.customerId != undefined ? doc.customerId : 0,
            "loginid": doc.loginid != undefined ? doc.loginid : this.loginId,
            "token": doc.token != undefined ? doc.token : this.token,
            "documentType": doc.documentType != undefined ? doc.documentType : "idCard",
        }
        return this.httpService.post(" http://localhost:57509/api/Customer/DocumentUpdate", Body, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }


    GetSalesmenreportDetails(customer_id: number, visited_date_from: Date, visited_date_to: Date, mode: string): Observable<SalesmenReportDetails[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffDailyTracker', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "customer_Id": customer_id != undefined ? customer_id : customer_id,
                "visited_date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "visited_date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                "mode": mode
            })
            .map((response: Response) => <SalesmenReportDetails[]>response.json().data)
    }


    // @compId", SqlDbType.Int).Value = t.comp_id;
    //                 cmd.Parameters.Add("@staffId", SqlDbType.Int).Value = t.staff_id;
    //                 cmd.Parameters.Add("@visitedDate", SqlDbType.Date).Value = t.visited_date;
    //                 cmd.Parameters.Add("@reportId", SqlDbType.Int).Value = t.report_id;
    //                 cmd.Parameters.Add("@customerName", SqlDbType.NVarChar).Value = t.customer_name;
    //                 cmd.Parameters.Add("@locationName", SqlDbType.NVarChar).Value = t.location_name;
    //                 cmd.Parameters.Add("@modeOfCommunication", SqlDbType.Int).Value = t.mode_of_communication;
    //                 cmd.Parameters.Add("@purposeOfVisit", SqlDbType.NVarChar).Value = t.purpose_of_visit;
    //                 cmd.Parameters.Add("@pendingOrder", SqlDbType.Decimal).Value = t.pending_Orders;
    //                 cmd.Parameters.Add("@pendingOrderUom", SqlDbType.Int).Value = t.pending_Order_Uom;
    //                 cmd.Parameters.Add("@sales", SqlDbType.Decimal).Value = t.sales;
    //                 cmd.Parameters.Add("@salesUom", SqlDbType.Int).Value = t.sales_Uom;
    //                 cmd.Parameters.Add("@collection", SqlDbType.Decimal).Value = t.collection_in_rs;
    //                 cmd.Parameters.Add("@remarks", SqlDbType.NVarChar).Value = t.remarks;
    //                 cmd.Parameters.Add("@userName", SqlDbType.NVarChar).Value = t.userName;
    //                 cmd.Parameters.Add("@ipAddress", SqlDbType.NVarChar).Value = t.ip_address;
    //                 cmd.Parameters.Add("@mode", SqlDbType.NVarChar).Value = t.mode;
    //                 cmd.Parameters.Add("@customerId", SqlDbType.Int).Value = t.customer_Id;
    //                 cmd.Parameters.Add("@contactNo", SqlDbType.NVarChar).Value = t.contact_Number;
    //                 cmd.Parameters.Add("@managerRemark"






    saveSalesmenreportDetails(Sales: AddSalesReport): Observable<AddSalesReport> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let Body = {
            "comp_id": Sales.comp_id != undefined ? Sales.comp_id : this.compId,
            "staff_id": Sales.staff_id != undefined ? Sales.staff_id : 0,
            "visited_date": Sales.visited_date != undefined ? Sales.visited_date : 0,
            "report_id": Sales.report_id != undefined ? Sales.report_id : 0,
            "customer_name": Sales.customer_name != undefined ? Sales.customer_name : 0,
            "location_name": Sales.location_name != undefined ? Sales.location_name : 0,
            "mode_of_communication": Sales.mode_of_communication != undefined ? Sales.mode_of_communication : 0,
            "purpose_of_visit": Sales.purpose_of_visit != undefined ? Sales.purpose_of_visit : 0,
            "pending_Orders": Sales.pending_Orders != undefined ? Sales.pending_Orders : 0,
            "pending_Order_Uom": Sales.pending_Order_Uom != undefined ? Sales.pending_Order_Uom : 0,
            "sales": Sales.sales != undefined ? Sales.sales : 0,
            "sales_Uom": Sales.sales_Uom != undefined ? Sales.sales_Uom : 0,
            "collection_in_rs": Sales.collection_in_rs != undefined ? Sales.collection_in_rs : 0,
            "remarks": Sales.remarks != undefined ? Sales.remarks : 0,
            "userName": Sales.userName != undefined ? Sales.userName : 0,
            "ip_address": Sales.ip_address != undefined ? Sales.ip_address : 0,
            "mode": Sales.mode != undefined ? Sales.mode : 0,
            "customer_Id": Sales.customer_Id != undefined ? Sales.customer_Id : 0,
            "contact_Number": Sales.contact_Number != undefined ? Sales.contact_Number : 0,
            "manager_Remarks": Sales.manager_Remarks != undefined ? Sales.manager_Remarks : 0,
            "login_Id": this.loginId,
            "token": this.token,
        }
        return this.httpService.post(" http://localhost:57509/api/Employee/insertUpdateEmployeDailyStatus", Body, options)
            // .map((response: Response) => <AddEmployee[]>response.json().data)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    /////////////////////////MIS Reports /////////////////////////////////////////////
    /////// -----Report-1----------- //////////



    GetSalesTrackerDetails(visited_date_from: Date, visited_date_to: Date, branchId: number, TeamId: number, mode: string): Observable<SaleseTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffDailyTrackerReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": 1,
                "visited_date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "visited_date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <SaleseTrakcer[]>response.json().data)
    }
    GetSalesTrackerMonthlyDetails(monthId: number, branchId: number, TeamId: number, mode: string): Observable<SaleseTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffDailyTrackerReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": monthId,
                // "customer_Id":customer_id!=undefined ? customer_id:customer_id,
                "visited_date_from": "",
                "visited_date_to": "",
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <SaleseTrakcer[]>response.json().data)
    }

    GetExpenseTrackerDetails(visited_date_from: Date, visited_date_to: Date, branchId: number, TeamId: number, mode: string): Observable<ExpenseTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffExpenseReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": 1,
                // "customer_Id":customer_id!=undefined ? customer_id:customer_id,
                "visited_date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "visited_date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <ExpenseTrakcer[]>response.json().data)
    }

    GetMonthlyExpenseTrackerDetails(monthId: number, branchId: number, TeamId: number, mode: string): Observable<ExpenseTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffExpenseReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": monthId,
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode,
                "visited_date_from": "",
                "visited_date_to": "",

            })
            .map((response: Response) => <ExpenseTrakcer[]>response.json().data)
    }

    //GETREPORT_MONTH
    //GETREPORT

    GetAttendanceTrackerDetails(visited_date_from: Date, visited_date_to: Date, branchId: number, TeamId: number, mode: string): Observable<AttendanceTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffAttendanceReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": 1,
                "visited_date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "visited_date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <AttendanceTrakcer[]>response.json().data)
    }




    GetMonthlyAttendanceTrackerDetails(monthId: number, branchId: number, TeamId: number, mode: string): Observable<AttendanceTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffAttendanceReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": monthId,
                "visited_date_from": "",
                "visited_date_to": "",
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <AttendanceTrakcer[]>response.json().data)
    }

    GetLeaveTrackerDetails(visited_date_from: Date, visited_date_to: Date, branchId: number, TeamId: number, mode: string): Observable<LeaveTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffLeaveReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": 1,
                "visited_date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "visited_date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <LeaveTrakcer[]>response.json().data)
    }




    GetMonthlyLeaveTrackerDetails(monthId: number, branchId: number, TeamId: number, mode: string): Observable<LeaveTrakcer[]> {
        return this.httpService
            .post(' http://localhost:57509/api/Employee/getStaffLeaveReport', {
                "comp_id": this.compId,
                "staff_id": this.staff_Id,
                "branchId": branchId,
                "teamId": TeamId,
                "monthId": monthId,
                "visited_date_from": "",
                "visited_date_to": "",
                "login_Id": this.loginId,
                "token": this.token,
                "mode": mode

            })
            .map((response: Response) => <LeaveTrakcer[]>response.json().data)
    }

    DownloadSalesmenPDFDetails(visited_date_from: string, visited_date_to: string): Observable<DownloadPDF[]> {
        return this.httpService
            .post(' http://localhost:57509/api/SalesReport/GetSalesMenDailyTrackerPDF', {
                "comp_Id": this.compId,
                "staff_id": this.staff_Id,
                "customer_Id": 0,
                "visited_date": visited_date_from,
                "visited_date_from": visited_date_from != undefined ? visited_date_from : visited_date_from,
                "visited_date_to": visited_date_to != undefined ? visited_date_to : visited_date_to,
                "login_Id": this.loginId,
                "token": this.token,
                "id": 1,
                "is_Active": 1,

            })
            .map((response: Response) => <DownloadPDF[]>response.json().data)
    }



    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


