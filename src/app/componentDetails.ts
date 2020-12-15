

export class MainMenu {
    main_Menu_Id: number;
    main_Menu_Name: string;
    main_Menu_Display_Name: string;
    main_Menu_Icon: string;
    main_Menu_Order_Id: number;
    constructor() { }
}



export class Dashboard {
    branch_Name: string

    constructor() { }
}


export class Password {
    comp_Id: number;
    login_Id: number;
    token: string;

    length: number;
    user_login_Id: number;
    constructor() { }
}


export class ChangePassword {
    comp_Id: number;
    login_Id: number;
    token: string;
    password: string;
    old_password: string;
    constructor() { }
}

export class Bloodgroup {
    comp_Id: number;
    login_Id: number;
    token: string;

    constructor() { }
}


export class Empmail {
    comp_Id: number;
    login_Id: number;
    token: string;
    constructor() { }
}

export class SubMenu {
    sub_Menu_Id: number;
    main_Menu_Id: number;
    main_Menu_Display_Name: string;
    sub_Menu_Display_Name: string;
    sub_Menu_Url: string;
    main_Menu_Icon: string;
    sub_Menu_Icon: string;
    main_Menu_Order_Id: number;
    sub_Menu_Order_Id: number;
    constructor() { }
}

export class UserRoleAssign {
    comp_Id: number;
    role_Id: number;
    nature_Id: number;
    module_Id: number;
    main_Menu_Id: number;
    is_Active: number;
    read_Flag: number;
    insert_Flag: number;
    update_Flag: number;
    delete_Flag: number;
    sub_Menu_Id: number;
    sub_Menu_Name: string;
    ResponseCode: string;
    errorMessage: string;
    errorCode: string;
    constructor() { }
}

export class AssignBranch {
    comp_Id: number;
    staff_Id: number;
    checked_Branch: number;
    staff_No: string;
    staff_Name: string;
    branch_Name: string;
    Manager: string;
    department: string;
    branch_id: number;
    status: number;
    is_primary: number;
    login_Id: number;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    token: string;
    constructor() {
    }
}
export class Customerreport {
    Date_of_creation: string;
    manager_Name: string;
    customer_Name: string;
    approver_Date: string;
    customer_code: string;
    sub_Cus_Code: string;
    team_name: string
    SalesManName: string
    contact_Person_Name: string
    contact_Person_designation: string
    contact_Person_Mobile_Number: string
    whatssup: string
    customer_Email: string
    current_Address: string
    city_Name: string
    state_Name: string
    current_Zipcode: string
    credit_Limit: string
    credit_Days: string
    annual_Turnover: string
    reffered_By: string
    nature_Of_Buisness: string
    buisness_Start_Date: string
    modeOdPaymentName: string
    id_Card_Proof: string
    gst_Number: string
    address_Proof: string
    pan_Number: string
    visiting_card: string
    visiting_card_back: string
    customer_category: string
    customerTypeName: string


    Welding_Electrodes: string;
    HR_PIPE: string;
    Binding_Wire: string;
    PPGI_Coil: string;
    PPGL_Coil: string;
    CR_SHEET: string;
    HR_SHEET: string;
    CHQ_COIL: string;
    CR_COIL: string;
    HR_COIL: string;
    GP_SHEET: string;
    GC_Sheet: string;
    MS_PLATE: string;
    CHQ_Plate: string;
    Roofing_Sheet: string;
    Profile_Sheet_Accessories: string;
    BABY_COIL: string;
    CR_PIPE: string;
    GI_PIPE: string;
    GP_PIPE_APLBHUSHAN: string;
    GP_PIPE_LAKSHMIOTHERS: string;
    MS_ANGLE: string;
    MS_BEAM: string;
    MS_CHANNEL: string;
    MS_FLAT: string;
    MS_ROUND: string;
    MS_SQUARE: string;
    MS_WIRE_ROD: string;
    MS_BILLET: string;
    HEXAGONAL: string;
    DURASTRONG_TMT: string;
    BMM_TMT: string;
    JSPL_TMT: string;
    JSW_TMT: string;
    SAIL_VIZAG: string;
    TMT_ROLLING: string;
    TMT_COIL: string;
    MS_Welded_Wiremesh: string;
    GI_Welded_Wiremesh: string;
    Profile_Sheet: string;
    steel_data1: string;
    Product1: string;
    Product2: string;
    Product3: string;
    Product4: string;
    Product5: string;

    constructor() {

    }
}

export class salesReport {

    order_Ref_Number: string;

    order_date_time: string;
    branch_Name: string;
    Manager_approved_Date: string;
    manager_name: string;
    manager_remarks: string;
    Dispatch_approved_Date: string;
    dispatchStatus: string;
    customer_Name: string;
    clusterName: string;
    categoryName: string;
    Item_Name: string;
    Uom: string;
    quantity: string;
    amount: string;
    itemTotal: string;
    discount: string;
    pl_Postive_Discount: string;
    pl_Negative_discount: string;
    for_Discount: string;
    sub_Total: string;
    cgst: string;
    sgst: string;
    igst: string;
    Total: string;

    // visited_date_from:string;
    // visited_date_to:string;



    constructor() {

    }
}







export class TeamTarget {
    comp_Id: number;
    staff_Id: number;
    branch_id: number;
    staff_No: number;
    staff_Name: string;
    customer_Name: string;

}
export class Branch {
    branch_Id: number;
    branch_Name: string;
    branch_Address: string;
    branch_Location: string;
    branch_Manager: number;
    branch_Manager_Name: string;
    is_Active: number;
    constructor() { }

}

export class AddBranch {
    comp_Id: number;
    ResponseStatus: string;
    errorMessage: string;
    branch_Id: number;
    division_id: number;
    is_Active: number;
    login_Id: number;
    branch_Manager: number;
    branch_Name: string;
    branch_Address: string;
    branch_Location: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    token: string;

    constructor() {

    }
}


export class Brand {
    brand_Id: number;
    parent_Id: number;
    inventory_classification_id: number;
    brand_Name: string;
    is_Active: number;
    parent_Name: string;
    Name: string;

    constructor() {
    }
}



export class Company {
    comp_Id: number;
    comp_name: string;
    pan_Number: string;
    reg_Office1: string;
    telephone_Number: string;
    fax_Number: string;
    website: string;
    currency: string;
    is_Active: number;
    registration_number: string;
    tin_Number: string;
    copy_Right: string;
    userTimeZone: string;
    comp_Logo: string;

    constructor() {
    }
}


export class AddCompany {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    comp_name: string;
    registration_number: string;
    tin_Number: string;
    pan_Number: string;
    reg_Office1: string;
    telephone_Number: string;
    fax_Number: string;
    website: string;
    currency: string;
    userTimeZone: string;
    copy_Right: string;
    login_Id: number;
    token: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    comp_Logo: string;
    constructor() {
    }
}


export class Catalog {

    parent_Id: number;
    parent_Name: string;
    inventory_classification_id: number;
    Name: string;
    brand_Id: number;
    brand_Name: string;
    item_Id: number;
    item_Name: string;
    is_Active: number;
    pcs_Per_Weight: number;
    item_Code: string;
    item_Category: number;
    item_Type: number;
    item_price: number;
    order_Flag: number;
    constructor() {
    }
}


export class AddCatalog {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    parent_Id: number;
    inventory_classification_id: number;
    brand_Id: number;
    item_Id: number;
    item_Name: string;
    pcs_Per_Weight: number;
    item_Code: string;
    item_Category: number;
    item_Type: number;
    item_price: number;
    is_Active: number;
    order_Flag: number;
    login_Id: number;
    token: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    constructor() {
    }
}


export class Customer {
    visiting_card: string;
    visiting_card_back: string
    id_Card_Proof: string;
    gst_Certificate: string;
    address_Proof: string;
    errorMessage: string;
    comp_Id: number;
    customer_Id: number;
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
    annual_Turnover: number;
    credit_Limit: number;
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
    checkdelete: number;
    buisness_Start_Date: string;
    salesman: number;
    salesman_Name: string;
    // status123:number

    //new code for customer code
    cust_code: String;
    sub_code: String;
    customer_category: number;

    whatssup: string;



    constructor() {
    }

}

export class CustomerPath {
    Name: string;
    constructor() {
    }
}

export class Country {
    country_Id: number;
    country_Name: string;
    constructor() {
    }
}


export class State {
    state_Id: number;
    state_Name: string;
    constructor() {
    }
}

export class City {
    city_Id: number;
    city_Name: string;

    constructor() {
    }
}



export class AddCustomer {
    errorMessage: string;
    ResponseStatus: string;
    ResponseCode1: string;
    Id: number;
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
    annual_Turnover: number;
    credit_Limit: number;
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
    token: string;
    mode: string;
    visiting_card: string;
    visiting_card_back: string
    id_Card_Proof: string;
    gst_Certificate: string;
    address_Proof: string;

    //new code for customer code
    cust_code: String;
    sub_code: String;
    customer_category: number;

    whatssup: string;

    constructor() {
    }

}


export class AddCuscategoty {
    errorMessage: string;
    ResponseStatus: string;
    ResponseCode: string;
    cust_category_id: number;
    category_name: string;
    customer_category_name: string;
    cust_category_id1: number;
    // errorMessage:string;
    // ResponseStatus:string;

    constructor() {
    }

}
export class Addpaymode {
    errorMessage: string;
    ResponseStatus: string;
    ResponseCode: string;
    paymode_id: number;
    paymode_textname: string;
    paymode_tablecol: string;
    paymode_id1: number;

    constructor() {
    }

}






export class CustomerTarget {
    customer_Id: number;
    cluster_Id: number;
    cluster_Name: string;
    target_Quantity: string;
    constructor() {
    }
}




export class TargetCustomerTarget {
    comp_Id: number;
    customer_Id: number;
    cluster_Id: number;
    target_Quantity: string;
    status: number;
    login_Id: number;
    token: string;
    userName: string;
    ipAdress: string;
    device_Id: string;

    constructor() {
    }
}


export class CustomerFileUpload {
    customer_Id: number;
    cluster_Id: number;
    cluster_Name: string;
    target_Quantity: string;
    status: number;
    constructor() {
    }
}


export class Employee {
    i: any;
    comp_Id: number;
    staff_Id: number;
    first_Name: string;
    last_Name: string;
    staff_No: string;
    designation_Id: number;
    department_Id: number;
    date_Of_Birth: string;
    joining_Date: string;
    blood_Group: string;
    yrs_Exp: number;
    status: number;
    mob_No: string;
    email_Id: string;
    approver_id: number;
    approver: string;
    branch_Id: number;
    branch_id: number;
    branch_Name: string;
    team_Id: number;
    team_Name: string;
    gender: string;
    // isMarried: string;
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
    // division_id: number;
    division_Id: number;
    division_name: string;
    designation: string;
    user_name: string;
    IP_address: string;
    device_Id: string;
    login_Id: number;
    token: string;
    mode: string;

    adhar_Upload: string;
    dl_Upload: string;
    other_Upload: string;
    pan_Upload: string;
    vo_Upload: string;
    photo: string;

    empiddelete: number;
    constructor() {
    }
}


export class AddEmployee {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    staff_Id: number;
    Id: number;
    first_Name: string;
    last_Name: string;
    staff_No: string;
    designation_Id: number;
    department_Id: number;
    status: number;
    date_Of_Birth: string;
    joining_Date: string;
    blood_Group: string;
    yrs_Exp: number;
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
    token: string;
    mode: string;
    adhar_Upload: string;
    dl_Upload: string;
    other_Upload: string;
    pan_Upload: string;
    vo_Upload: string;
    photo: string;
    constructor() {
    }
}



export class InventoryUpload {
    comp_Id: number;
    cluster_Id: number;
    cluster_Name: string;
    product_category_id: number;
    product_category_Name: string;
    brand_Id: number;
    branch_Id: number;
    brand_Name: string;
    branch_Name: string;
    item_Id: number;
    item_Name: number;
    priceMT: number;
    pricePCS: number;
    quantityMT: number;
    quantityPCS: number;
    user_name: string;
    ip_Address: string;
    device_Id: string;
    login_Id: number;
    token: string;
    constructor() {
    }
}


export class InventoryClassificationLevelWise {
    Id: number;
    Name: string;
    parent_Id: number;

    constructor() {
    }
}


export class InventoryCategoryLevelWise {
    Id: number;
    Name: string;
    parent_Id: number;
    parent_Name: string;
    constructor() {
    }
}




export class Cluster {
    parent_Id: number;
    Id: number;
    Name: string;
    is_Active: number;
    parent_Name: string;
    constructor() {
    }
}

export class AddCluster {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    parent_Id: number;
    Id: number;
    Name: string;
    is_Active: number;
    login_Id: number;
    token: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    constructor() {
    }
}



export class ProductCategory {
    parent_Id: number;
    errorMessage: string;
    Id: number;
    Name: string;
    is_Active: number;
    parent_Name: string;
    constructor() {
    }
}

export class AddProductCategory {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    parent_Id: number;
    Id: number;
    Name: string;
    is_Active: number;
    login_Id: number;
    token: string;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    constructor() {
    }
}



export class Supplier {
    comp_Id: number;
    supplier_Id: number;
    supplier_Email_Id: string;
    registration_Number: string;
    supplier_Code: string;
    contact_Person_Name: string;
    contact_Person_Email_Id: string;
    contact_Person_Mobile_No: string;
    address: string;
    company_Name: string;
    country_Id: number;
    state_Id: number;
    city_Id: number;
    pincode: string;
    phone_No: string;
    gst_Number: string;
    fax: string;
    website: string;
    billing_Rate: Float32Array;
    credit_Limit: Float32Array;
    account_No: string;
    pan_No: string;
    id_Card: string;
    gst_certificate: string;
    address_Proof: string;
    visiting_Card: string;
    status: number;
    constructor() {
    }
}


export class AddSupplier {
    errorMessage: string;
    ResponseStatus: string;
    Id: number;
    comp_Id: number;
    supplier_Id: number;
    country_Id: number;
    state_Id: number;
    city_Id: number;
    status: number;
    billing_Rate: Float32Array;
    credit_Limit: Float32Array;
    registration_Number: string;
    supplier_Code: string;
    contact_Person_Name: string;
    contact_Person_Email_Id: string;
    contact_Person_Mobile_No: string;
    address: string;
    supplier_Email_Id: string;
    company_Name: string;
    pincode: string;
    phone_No: string;
    website: string;
    account_No: string;
    pan_No: string;
    fax: string;
    gst_Number: string;
    id_Card: string;
    gst_certificate: string;
    address_Proof: string;
    visiting_Card: string;
    userName: string;
    ipAddress: string;
    device_Id: string;
    login_Id: number;
    token: string;
    mode: string;
    constructor() {
    }
}


export class Department {
    comp_Id: number;
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}

export class AddDepartment {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    id: number;
    Name: string;
    userName: string;
    ipAddress: string;
    deviceId: string;
    login_Id: number;
    token: string;
    mode: string;
    is_Active: number;
    constructor() {

    }
}



export class Role {

    comp_Id: number;
    role_Id: number;
    sub_Menu_Id: number;
    role_Name: string;
    role_Display_Name: string;
    role_Description: string;
    role_Home_Page: string;
    role_Type_Id: number;
    is_Active: number;
    errorMessage: string;
    errorCode: number;

    constructor() {

    }
}


export class AddRole {
    id: number;
    errorMessage: string;
    ResponseStatus: string;
    ResponseCode: string;
    comp_Id: number;
    role_Id: number;
    sub_Menu_Id: number;
    role_Type_Id: number;
    role_Name: string;
    role_Display_Name: string;
    role_Description: string;
    role_Home_Page: string;
    is_Active: number;
    ip_Address: string;
    user_Name: string;
    token: string;
    mode: string;
    login_Id: number;
    constructor() {

    }
}

export class CompanyRole {
    comp_Id: number;
    comp_Name: string;
    errorMessage: string;
    errorCode: string;

    constructor() {

    }
}

export class RoleHomePage {
    sub_Menu_Id: number;
    sub_Menu_Url: string;
    sub_Menu_Name: string;
    errorMessage: string;
    errorCode: string;

    constructor() {

    }
}
export class ExpenseCategory {
    comp_Id: number;
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}


export class AddExpenseCategory {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    id: number;
    Name: string;
    userName: string;
    ipAddress: string;
    deviceId: string;
    login_Id: number;
    token: string;
    mode: string;
    is_Active: number;
    constructor() {

    }
}


export class LeaveTypes {
    errorMessage: string;
    comp_Id: number;
    id: number;
    Name: string;
    is_Active: number;
    no_Of_Days: number;
    constructor() {

    }
}


export class AddLeaveTypes {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    no_Of_Days: number;
    id: number;
    Name: string;
    userName: string;
    ipAddress: string;
    deviceId: string;
    login_Id: number;
    token: string;
    mode: string;
    is_Active: number;
    constructor() {

    }
}

export class DuplicateLeave {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    year_Id: number;
    staffId: number
    login_Id: number;
    from_Date: string;
    to_Date: string;
    token: string;
    mode: string;

    constructor() {

    }
}



export class Status {

    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}

export class EmployeeStatus {

    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}


export class Team {
    comp_Id: number;
    branch_Id: number;
    team_Id: number;
    team_Manager: number;
    login_Id: number;
    status: number;
    token: string;
    branch_Name: string;
    team_Name: string;
    team_Manager_Name: string;
    userName: string;
    ipAddress: string;
    device_Id: string;
    mode: string;
    constructor() {

    }
}


export class AddTeam {
    errorMessage: string;
    ResponseStatus: string;
    comp_Id: number;
    branch_Id: number;
    team_Id: number;
    team_Manager: number;
    login_Id: number;
    status: number;
    token: string;
    team_Name: string;
    userName: string;
    ipAddress: string;
    device_Id: string;
    mode: string;
    constructor() {

    }
}



export class Division {
    comp_Id: number;
    branch_Id: number;
    branch_Name: string;
    branch_Address: string;
    branch_Location: string;
    is_Active: number;
    constructor() {

    }

}

export class ItemType {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}

export class ItemCategory {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }

}

export class CustomerType {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}


export class Customercategoryselect {
    id: number;
    Name: string;
    // is_Active:number;
    constructor() {

    }
}







export class ModeOfPayment {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}

export class Customerstatus {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {

    }
}


export class TimeZone {

    timezone_Id: number;
    timezone_Name: string;
    timezone_Value: Float32Array;
    constructor() {

    }
}


export class Expense {
    expense_id: number;
    staff_No: number;
    staff_Name: string;
    submitted_Date: string;
    name: string;
    total_Amount: number;
    approver_remarks: string;
    status: number;
    staff_remarks: string;
    constructor() {
    }
}

export class ExpenseStatus {
    expense_id: number;
    name: string;
    total_Amount: number;
    approver_remarks: string;

    constructor() {
    }
}
export class AddExpense {
    ResponseStatus: string;
    errorMessage: string;
    errorCode: string;
    data: any;
    Id: number;
    comp_id: number;
    expense_id: number;
    staff_id: number;
    name: string;
    userName: string;
    ip_address: string;
    device_Id: string;
    token: string;
    mode: string;
    approver_remarks: string;
    staff_remarks: string;
    login_Id: number;
    constructor() {
    }
}

export class ClaimExpenseDetails {

    expense_id: number;
    expense_type: number;
    expense_detail_id: number;
    from_Date: string;
    to_Date: string;
    from_location: string;
    to_location: string;
    bill_amount: number;
    expense_Category_Name: string;
    remarks: string;
    status: number;
    name: string;
    total_Amount: number;
    image_Name: String;
    image_id: string;
    constructor() {
    }
}
export class AddClaimExpenseDetails {
    errorMessage: string;
    ResponseStatus: string;
    name: string;
    Id: number;
    comp_id: number;
    expense_id: number;
    expense_detail_id: number
    from_Date: string;
    to_Date: string;
    from_location: string;
    to_location: string;
    bill_amount: number;
    remarks: string;
    userName: string;
    ip_address: string;
    device_Id: string;
    expense_type: number;
    mode: string;
    login_Id: number;
    token: string;
    image_Name: string;

    constructor() {
    }
}

export class ApproverExpense {
    expense_id: number;
    name: string;
    staff_No: number;
    staff_Name: string;
    total_Amount: number
    approver_remarks: string;
    status: number;
    staff_remarks: string;
    submitted_Date: string;
    constructor() {
    }
}


export class AddApproverExpense {
    errorMessage: string;
    name: String;
    ResponseStatus: string;
    approver_remarks: string;
    status: number;
    userName: string;
    ip_address: string;
    device_Id: string;
    expense_id: string;
    mode: string;
    login_Id: number;
    token: string;
    image_Name: String;
    constructor() {
    }
}

export class ApproverExpenseDetails {
    expense_id: number;
    expense_detail_id: number;
    from_Date: string;
    to_Date: string;
    from_location: string;
    to_location: string
    bill_amount: number;
    expense_Category_Name: string;
    status: number;
    image_Name: String;

    constructor() {
    }
}
// export class AddApproverExpenseDetails {
//     errorMessage:string;
//     ResponseStatus:string;
//     name:string;
//     status:number;
//     userName:string;
//     ip_address:string;
//     device_Id:string;
//     expense_id:number;
//     expense_detail_id:number;
//     mode:string;
//     login_Id:number;
//     token:string; 

//     constructor() {
//     }
// }
export class LeaveCount {
    comp_id: number;
    year_Id: number;
    designation_Id: number;
    leave_Id: number;
    login_Id: number;
    token: string;

    constructor() {
    }
}

export class LeaveDropDown {
    leave_Id: number;
    leave_Name: string;
    is_Active: number;

    constructor() {
    }
}

export class LeaveTypeMode {
    typeMode_Id: number;
    typeMode_Name: string;
    constructor() {
    }
}
export class TotalStaffLeaveTaken {
    TotalLeave: number;
    leaveTaken: string;
    document_Nee: string
    constructor() {
    }
}
export class TotalStaffLeaveLeft {

    Leftdays: number;
    Counter: string;
    constructor() {
    }
}
export class StaffLeaveDetails {
    leave_Name: string;
    day_Count: number;
    leave_Avail: number;
    remarks: string;
    status_Of_Leave: number;
    staff_Id: number;
    leaveTaken: number;
    from_Date: string;
    to_Date: string;
    name: string;
    staff_No: number;
    constructor() {
    }
}

export class LeaveType {
    leave_Id: number;
    leave_Name: string;
    designation_Name: string;
    document_Need: string;
    typeMode_Name: string;
    Name: string;
    leave_entitlement: string;
    experience_level: string;
    encashmentdays: number;
    leavetypemaster_Id: number;
    encashment_month: string;
    leavetype_Id: number;
    designation_Id: number;
    typeMode_Id: number;
    constructor() {
    }
}

export class StaffLeaveStatus {
    application_Id: number;
    from_Date: string;
    to_Date: string;
    remarks: string;
    addressOnLeave: string;
    no_Of_Day: number;
    leave_Name: string;
    status_Of_Leave: string;
    staff_No: number;
    name: string;
    document: string;
    compoff_Leave: string;
    staff_Id: number;
    day_Count: number;
    leave_Avail: number;
    TotalLeave: number;
    mode: string;
    leaveType_Id: number;
    constructor() {
    }
}

export class StaffLeave {
    application_Id: number;
    from_Date: string;
    to_Date: string;
    remarks: string;
    addressOnLeave: string;
    no_Of_Day: number;
    leave_Name: string;
    status_Of_Leave: string;
    staff_No: number;
    name: string;
    document: string;
    compoff_Leave: string;
    staff_Id: number;
    day_Count: number;
    leave_Avail: number;
    TotalLeave: number;
    mode: string;
    constructor() {
    }
}

export class LeaveStatus {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {
    }
}

export class currency {
    id: number;
    Name: string;
    is_Active: number;
    constructor() {
    }
}

export class AddLeaveType {
    comp_Id: number;
    year_Id: number;
    designation_Id: number;
    leavetype_Id: number;
    leavetypemaster_Id: number;
    leave_entitlement: number;
    leaveTypeCount: number;
    document_Need: number;
    leavetype_mode: number;
    login_Id: number;
    token: string;
    ipAddress: string;
    userNameUpdate: string;
    mode: string;
    constructor() {
    }
}

export class AddLeaveApplication {
    comp_Id: number;
    year_Id: number;
    leave_Id: number;
    staffId: number;
    noOfDay: number;
    TotalLeave: number;
    leaveTaken: number;
    login_Id: number;
    designation_Id: number;
    from_Date: string;
    to_Date: string;
    document_Need: string;
    token: string;
    addressOnLeave: string;
    remarks: string;
    device_Id: string;
    ipAddress: string;
    userNameUpdate: string;
    application_Id: number;
    mode: string;
    constructor() {
    }
}

export class UpdateLeave {
    comp_Id: number;
    year_Id: number;
    leave_Id: number;
    staffId: number;
    noOfDay: number;
    manager_Remarks: string;
    status_Of_Leave: number;
    application_Id: number;
    login_Id: number;
    to_Date: string;
    token: string;
    device_Id: string;
    ipAddress: string;
    userNameUpdate: string;

    constructor() {
    }
}

export class HolidayUpload {
    comp_Id: number;
    year_Id: number;
    holiday_Date: string;
    holiday_Name: string;
    login_Id: number;
    token: string;
    device_Id: string;
    ipAddress: string;
    userName: string;
    constructor() {
    }
}
export class FinishedGoods {
    comp_Id: number;
    item_Id: number;
    raw_Material_Id: number;
    finished_Good: number;
    uom: number;
    edit: number;
    quantity: Float32Array;
    login_Id: number;
    uom_Name: string;
    Item_Name: string;
    errorMessage: string;
    errorCode: string;
    token: string;
    device_Id: string;
    ip_Address: string;
    user_Name: string;
    constructor() {
    }
}
export class UOM {
    comp_Id: number;
    id: number;
    Name: string;
    constructor() {

    }
}
export class OrderApproval {
    comp_Id: number;
    branch_Id: number;
    customer_Id: number;
    staff_Id: number;
    order_Id: number;
    Manager_Id: number;
    manager_Approved: number;
    status: number;

    amount: Float32Array;
    //  total_tax_Amount:Float32Array;
    // total_Amount:Float32Array;
    manager_remarks: string;
    order_Ref_Number: string;
    customer_Name: string;
    staff_Remarks: string;
    staff_Name: string;
    errorMessage: string;
    errorCode: string;
    token: string;
    device_Id: string;
    ip_Address: string;
    user_Name: string;




    //order_Date:Date;
    //  total_tax_Amount:Float32Array;
    // previous code above
    order_Date: string;
    total_tax_Amount: string
    uom_Name: string
    quantity: string
    Item_Name: string
    price: string
    total_Amount: string
    constructor() {

    }
}
export class AccountantOrderApproval {
    comp_Id: number;
    branch_Id: number;
    customer_Id: number;
    staff_Id: number;
    order_Id: number;
    Manager_Id: number;
    manager_Approved: number;
    Accounts_Approved: number;
    Dispatch_Approved: number;
    status: number;
    order_Date: Date;
    amount: Float32Array;
    total_tax_Amount: Float32Array;
    total_Amount: Float32Array;
    manager_remarks: string;
    order_Ref_Number: string;
    customer_Name: string;
    staff_Remarks: string;
    staff_Name: string;
    errorMessage: string;
    errorCode: string;
    token: string;
    device_Id: string;
    ip_Address: string;
    user_Name: string;
    constructor() {

    }
}
export class UserType {
    comp_Id: number;
    userType_Id: number;
    userType_Name: string;
    errorMessage: string;
    errorCode: string;
    constructor() {

    }
}

export class PlaceOrder {
    comp_Id: number;
    pcs_Per_Weight: Float32Array;
    quantityMT: Float32Array;
    quantityPCS: Float32Array;
    priceMT: Float32Array;
    pricePCS: Float32Array;
    userType_Name: string;
    errorMessage: string;
    errorCode: string;
    order_Ref_Number: string;
    order_Id: number;
    customer_Id: number;
    staff_Id: number;
    branch_Id: number;
    manager_Approved: number;
    Manager_Id: number;
    manager_remarks: string;
    Accounts_Approved: number;
    Accounts_Approver_Id: number;
    Accounts_remark: string;
    Dispatch_Approved: number;
    Dispatch_Approver_Id: number;
    Dispatch_Remarks: string;
    for_Discount: any;
    pl_Negative_discount: any;
    pl_Positive_discount: any;
    discount: any;
    discount_Reason: string;
    staff_Remarks: string;
    amount: any;
    total_tax_amount: any;
    total_amount: any;
    tax_Id: number;
    order_detail_Id: number;
    item_id: number;
    quantity: any;
    uom: number;
    price: any;
    userName: string;
    ip_Address: string;
    device_Id: string;
    mode: string;
    constructor() {

    }
}
export class Tax {
    comp_Id: number;
    tax_Id: number;
    tax_Name: string;
    user_Name: string;
    ip_Address: string;
    login_Id: number;
    percentage: Float32Array;
    status: number;
    errorMessage: string;
    errorCode: string;
    constructor() {
    }
}
export class LoginDetails {
    comp_Id: number;
    user_Name: string;
    ip_Address: string;
    errorMessage: string;
    errorCode: string;
    device_Id: string;
    mode: string;

    employee_No: string;
    employee_Name: string;
    employee_Username: string;
    employee_Password: string;
    constructor() {
    }
}

export class SalesmenReportDetails {
    visited_date: Date;
    customer_Id: number;
    customer_name: string;
    contact_Number: string;
    location_name: string;
    mode_of_communication: number;
    purpose_of_visit: string;
    pending_Orders: Float32Array;
    pending_Order_Uom: number;
    sales: Float32Array;
    sales_Uom: number;
    collection_in_rs: Float32Array;
    remarks: string;
    manager_Remarks: string;
    token: string;
    login_Id: number;
    errorMessage: string;
    errorCode: string;

    constructor() {
    }
}


export class CutomerApproval {
    comp_Id: number;
    customer_Id: number;
    status: string;
    token: string;
    login_Id: string;

    constructor() {
    }
}

export class AppCustomer {
    comp_Id: number;
    customer_Id: number;
    status: number;
    mode: string;
    login_Id: number;
    token: string;
    constructor() {
    }
}

export class AddSalesReport {
    comp_id: number;
    staff_id: number;
    visited_date: Date;
    report_id: number;
    customer_name: string;
    location_name: string;
    mode_of_communication: number;
    purpose_of_visit: string;
    pending_Orders: Float32Array;
    pending_Order_Uom: number;
    sales: Float32Array;
    sales_Uom: number;
    collection_in_rs: Float32Array;
    remarks: string;
    userName: string;
    ip_address: string;
    mode: string;
    customer_Id: number;
    contact_Number: string;
    manager_Remarks: string;
    token: string;
    login_Id: number;
    errorMessage: string;
    errorCode: string;
    constructor() {
    }
}


export class Docmentupload {
    compId: number;
    customerId: number;
    loginid: number;
    token: string;
    documentType: string;
    constructor() {

    }
}

export class SaleseTrakcer {
    empName: string;
    empId: string;
    salesTarget: string;
    pendingOrder: string;
    tillDateSales: string;
    collectionTillDate: string;
    todaysCollection: string;
    modeOfComunication: string;
    placesVisited: string;
    customer: string;
    purposeName: string;
    visitedDate: string;
    contactNo: string;
    ordergiven: string;
    collectionDone: string;
    remarks: string;
    // collectionDone:number
    // collectionTillDate:number
    // contactNo:string
    // customer:String
    // empId:number
    // empName:string
    // managerRemarks:string
    // modeOfComunication:string
    // ordergiven:number
    // pendingOrder:number
    // placesVisited:string
    // purposeOfVisit:string
    // remarks:string
    // salesTarget:number
    // staffId:number
    // tillDateSales:number
    // todaysCollection:number
    // visitedDate:Date
    enquiry: string;
    order_uom: string;

    enquiry_uom: string;
    constructor() {

    }
}


export class ExpenseTrakcer {
    empName: string;
    empId: string;
    tripName: string;
    expenseCategory: string;
    amount: string;
    remarks: string;
    managerRemarks: string;
    staff_Remarks: string;
    approvedDate: string;
    approverName: string;
    approver_Remarks: string;
    submittedOn: string;
    currentstatus: string;
    // collectionDone:number
    // collectionTillDate:number
    // contactNo:string
    // customer:String
    // empId:number
    // empName:string
    // managerRemarks:string
    // modeOfComunication:string
    // ordergiven:number
    // pendingOrder:number
    // placesVisited:string
    // purposeOfVisit:string
    // remarks:string
    // salesTarget:number
    // staffId:number
    // tillDateSales:number
    // todaysCollection:number
    // visitedDate:Date
    constructor() {

    }
}


export class DownloadPDF {
    ResponseMessage: string;
    // collectionDone:number
    // collectionTillDate:number
    // contactNo:string
    // customer:String
    // empId:number
    // empName:string
    // managerRemarks:string
    // modeOfComunication:string
    // ordergiven:number
    // pendingOrder:number
    // placesVisited:string
    // purposeOfVisit:string
    // remarks:string
    // salesTarget:number
    // staffId:number
    // tillDateSales:number
    // todaysCollection:number
    // visitedDate:Date
    constructor() {

    }
}


export class AttendanceTrakcer {
    branch: string;
    emp_Id: string;
    emp_Name: string;
    punchIn: string;
    punchOut: string;
    duration: string;
    // collectionDone:number
    // collectionTillDate:number
    // contactNo:string
    // customer:String
    // empId:number
    // empName:string
    // managerRemarks:string
    // modeOfComunication:string
    // ordergiven:number
    // pendingOrder:number
    // placesVisited:string
    // purposeOfVisit:string
    // remarks:string
    // salesTarget:number
    // staffId:number
    // tillDateSales:number
    // todaysCollection:number
    // visitedDate:Date
    constructor() {

    }
}

export class LeaveTrakcer {
    branch_Name: string;
    staffName: string;
    staff_No: string;
    leave_ApplyDate: string;
    leave_Name: string;
    remarks: string;
    from_Date: string;
    manager_approve_date: string;
    Leave_Status: string;
    manager_Remarks: string;
    Approver: string;
    // collectionDone:number
    // collectionTillDate:number
    // contactNo:string
    // customer:String
    // empId:number
    // empName:string
    // managerRemarks:string
    // modeOfComunication:string
    // ordergiven:number
    // pendingOrder:number
    // placesVisited:string
    // purposeOfVisit:string
    // remarks:string
    // salesTarget:number
    // staffId:number
    // tillDateSales:number
    // todaysCollection:number
    // visitedDate:Date
    constructor() {

    }
}

