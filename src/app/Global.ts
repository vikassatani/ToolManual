'use strict';

export var staffId = 0;

export function setValue(newValue: number) {
    staffId = newValue;
}

export var customersId = 0;
export var statusId = 0;

export function setCustomerIDValue(newValue: number, statusvalue: number) {
    customersId = newValue;
    statusId = statusvalue
}



export var id = 0;
export function setBranchIDValue(newValue: number) {
    id = newValue;
}

export var suppliersId = 0;
export function setSupplierIDValue(newValue: number) {
    suppliersId = newValue;
}

export var departmentId = 0;
export function setDepartmentIDValue(newValue: number) {
    departmentId = newValue;
}

export var roleId = 0;
export function setRoleIDValue(newValue: number) {
    roleId = newValue;
}

export var leaveTypesId = 0;
export function setLeaveTypeIDValue(newValue: number) {
    leaveTypesId = newValue;
}
export var TaxId = 0;
export function setTaxIDValue(newValue: number) {
    TaxId = newValue;
}

export var teamId = 0;
export var tbranchId = 0;
export var teamManagerId = 0;
export function setTeamIDValue(branch: number, team: number, manager: number) {
    teamId = team;
    tbranchId = branch;
    teamManagerId = manager;
}

export var expenseCategoryId = 0;
export function setExpenseCategoryIdValue(newValue: number) {
    expenseCategoryId = newValue;
}

export var CatalogId = 0;
export function setCatalogIDValue(newValue: number) {
    CatalogId = newValue;
}

export var clusterId = 0;
export function setClusterIDValue(newValue: number) {
    clusterId = newValue;
}

export var categoryId = 0;
export function setCategoryIDValue(newValue: number) {
    categoryId = newValue;
}

export var ExpenseId = 0;

export function setExpenseIDValue(newValue: number) {
    ExpenseId = newValue;
}
export var RedirectId = 0;

export function setRedirectExpenseIDValue(newValue: number) {
    RedirectId = newValue;
}

export var StaffId = 0;
export function setApproveLeaveIDValue(newValue: number) {
    StaffId = newValue;
}

// export var EmailId = '';
// export function setEmailValue(newValue: string) {
//     EmailId= newValue;
// }
