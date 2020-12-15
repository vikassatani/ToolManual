import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "index",
                "loadChildren": ".\/pages\/aside-left-display-disabled\/index\/index.module#IndexModule"
            },
            {
                "path": "settings",
                "loadChildren": ".\/pages\/default\/settings\/settings.module#SettingsModule"
            },
            {
                "path": "customer",
                "loadChildren": ".\/pages\/default\/customer\/customer.module#CustomerModule"
            },
            {
                "path": "addCustomer",
                "loadChildren": ".\/pages\/default\/addCustomer\/addCustomer.module#AddCustomerModule"
            },
            {
                "path": "approveCustomer",
                "loadChildren": ".\/pages\/default\/approveCustomer\/approveCustomer.module#ApproveCustomerModule"
            },
            // {
            //     "path": "addApproveCustomer",
            //     "loadChildren": ".\/pages\/default\/addApproveCustomer\/addApproveCustomer.module#AddApproveCustomerModule"
            // },
            {
                "path": "company",
                "loadChildren": ".\/pages\/default\/company\/company.module#CompanyModule"
            },

            {
                "path": "branch",
                "loadChildren": ".\/pages\/default\/branch\/branch.module#BranchModule"
            },
            {
                "path": "addBranch",
                "loadChildren": ".\/pages\/default\/addBranch\/addBranch.module#AddBranchModule"
            },


            {
                "path": "addExpenseCategory",
                "loadChildren": ".\/pages\/default\/addExpenseCategory\/addExpenseCategory.module#AddExpenseCategoryModule"
            },
            {
                "path": "addDepartments",
                "loadChildren": ".\/pages\/default\/addDepartments\/addDepartments.module#AddDepartmentsModule"
            },
            {
                "path": "addLeaveTypes",
                "loadChildren": ".\/pages\/default\/addLeaveTypes\/addLeaveTypes.module#AddLeaveTypesModule"
            },
            {
                "path": "addDivision",
                "loadChildren": ".\/pages\/default\/addDivision\/addDivision.module#AddDivisionModule"
            },
            {
                "path": "addTeam",
                "loadChildren": ".\/pages\/default\/addTeam\/addTeam.module#AddTeamModule"
            },
            {
                "path": "employee",
                "loadChildren": ".\/pages\/default\/employee\/employee.module#EmployeeModule"
            },
            {
                "path": "assignBranch",
                "loadChildren": ".\/pages\/default\/assignBranch\/assignBranch.module#AssignBranchModule"
            },

            {
                "path": "addEmployee",
                "loadChildren": ".\/pages\/default\/addEmployee\/addEmployee.module#AddEmployeeModule"
            },

            {
                "path": "addCluster",
                "loadChildren": ".\/pages\/default\/addcluster\/addcluster.module#AddClusterModule"
            },

            {
                "path": "addCategory",
                "loadChildren": ".\/pages\/default\/addCategory\/addCategory.module#AddCategoryModule"
            },
            // {
            //     "path": "brand",
            //     "loadChildren": ".\/pages\/default\/brand\/brand.module#BrandModule"
            // },
            // {
            //     "path": "addBrand",
            //     "loadChildren": ".\/pages\/default\/addBrand\/addBrand.module#AddBrandModule"
            // },
            {
                "path": "catalog",
                "loadChildren": ".\/pages\/default\/catalog\/catalog.module#CatalogModule"
            },
            {
                "path": "addCatalog",
                "loadChildren": ".\/pages\/default\/addCatalog\/addCatalog.module#AddCatalogModule"
            },
            {
                "path": "inventoryUpload",
                "loadChildren": ".\/pages\/default\/inventoryUpload\/inventoryUpload.module#InventoryUploadModule"
            },
            {
                "path": "suppliers",
                "loadChildren": ".\/pages\/default\/suppliers\/suppliers.module#SuppliersModule"
            },
            {
                "path": "addSuppliers",
                "loadChildren": ".\/pages\/default\/addSuppliers\/addSuppliers.module#AddSuppliersModule"
            },
            {
                "path": "product",
                "loadChildren": ".\/pages\/default\/product\/product.module#ProductModule"
            },

            {
                "path": "profile",
                "loadChildren": ".\/pages\/default\/profile\/profile.module#ProfileModule"
            },
            {
                "path": "claimExpense",
                "loadChildren": ".\/pages\/default\/claimExpense\/claimExpense.module#ClaimExpenseModule"
            },
            {
                "path": "addClaimExpense",
                "loadChildren": ".\/pages\/default\/addClaimExpense\/addClaimExpense.module#AddClaimExpenseModule"
            },
            {
                "path": "redirectExpense",
                "loadChildren": ".\/pages\/default\/redirectExpense\/redirectExpense.module#RedirectComponentModule"
            },
            {
                "path": "approveExpense",
                "loadChildren": ".\/pages\/default\/approveExpense\/approveExpense.module#ApproveExpenseModule"
            },
            {
                "path": "addApproveExpense",
                "loadChildren": ".\/pages\/default\/addApproveExpense\/addApproveExpense.module#AddApproveExpenseModule"
            },
            {
                "path": "teamTarget",
                "loadChildren": ".\/pages\/default\/teamTarget\/teamTarget.module#TeamTargetModule"
            },
            {
                "path": "applyLeave",
                "loadChildren": ".\/pages\/default\/applyLeave\/applyLeave.module#ApplyLeaveModule"
            },

            {
                "path": "approveLeave",
                "loadChildren": ".\/pages\/default\/approveLeave\/approveLeave.module#ApproveLeaveModule"
            },
            // {

            //     "path": "addApproveLeave",
            //     "loadChildren": ".\/pages\/default\/addApproveLeave\/addApproveLeave.module#AddApproveLeaveModule"
            // },
            {
                "path": "role",
                "loadChildren": ".\/pages\/default\/role\/role.module#RoleModule"
            },
            {
                "path": "addRole",
                "loadChildren": ".\/pages\/default\/addRole\/addRole.module#AddRoleModule"
            },
            {
                "path": "holidayUpload",
                "loadChildren": ".\/pages\/default\/holidayUpload\/holidayUpload.module#HolidayUploadModule"
            },
            {
                "path": "finishedGoods",
                "loadChildren": ".\/pages\/default\/finishedGoods\/finishedGoods.module#FinishedGoodsModule"
            },
            {
                "path": "orderApproval",
                "loadChildren": ".\/pages\/default\/orderApproval\/orderApproval.module#OrderApprovalModule"
            },
            {
                "path": "accountantOrderApproval",
                "loadChildren": ".\/pages\/default\/accountantOrderApproval\/accountantOrderApproval.module#AccountantOrderApprovalModule"
            },
            {
                "path": "dispatchOrderApproval",
                "loadChildren": ".\/pages\/default\/dispatchOrderApproval\/dispatchOrderApproval.module#DispatchOrderApprovalModule"
            },
            {
                "path": "placeOrder",
                "loadChildren": ".\/pages\/default\/placeOrder\/placeOrder.module#PlaceOrderModule"
            },
            {
                "path": "placeOrderView",
                "loadChildren": ".\/pages\/default\/placeOrderView\/placeOrderView.module#PlaceOrderViewModule"
            },
            {
                "path": "menuAssign",
                "loadChildren": ".\/pages\/default\/menuAssign\/menuAssign.module#MenuAssignModule"
            },
            {
                "path": "addTax",
                "loadChildren": ".\/pages\/default\/addTax\/addTax.module#AddTaxModule"
            },

            {
                "path": "salesmanReport",
                "loadChildren": ".\/pages\/default\/salesmanReport\/salesmanReport.module#GenerateSalesmanReportModule"
            },
            {
                "path": "salesReport",
                "loadChildren": ".\/pages\/default\/salesReport\/salesReport.module#GenerateSalesReportModule"
            },
            {
                "path": "CustomerReport",
                "loadChildren": ".\/pages\/default\/CustomerReport\/CustomerReport.module#GenerateCustomerReportModule"
            },
            {
                "path": "expenseReport",
                "loadChildren": ".\/pages\/default\/expenseReport\/expenseReport.module#GenerateExpenseReportModule"
            },

            {
                "path": "attendanceReport",
                "loadChildren": ".\/pages\/default\/attendanceReport\/attendanceReport.module#GenerateAttendanceReportModule"
            },
            {
                "path": "leaveReport",
                "loadChildren": ".\/pages\/default\/leaveReport\/leaveReport.module#GenerateLeaveReportModule"
            },
            {
                "path": "addSalesReport",
                "loadChildren": ".\/pages\/default\/addSalesReport\/addSalesReport.module#AddSalesReportModule"
            },

            {
                "path": "loginDetails",
                "loadChildren": ".\/pages\/default\/loginDetails\/loginDetails.module#LoginDetailsModule"
            },
            {
                "path": "changePassword",
                "loadChildren": ".\/pages\/default\/changePassword\/changePassword.module#ChangePasswordModule"
            },
            {
                "path": "addApproveCustomer",
                "loadChildren": ".\/pages\/default\/addApproveCustomer\/addApproveCustomer.module#AddApproveCustomerModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }