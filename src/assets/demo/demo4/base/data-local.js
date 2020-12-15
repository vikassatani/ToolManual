var DatatableDataLocalDemo = function() {
    var e = function() {
        var e = JSON.parse('[{"COMPANY_ID":1,"CUSTOMER_ID":1,"CUATOMER_NAME":"RamBuilders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9783641034","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Aman","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"120000","CREDIT_DAYS":20,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":2,"CUATOMER_NAME":"Prestige builders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"8423559345","FAX":"9916775405","EMAIL":"Rohan@gmail.com","CONTACT_PERSON_NAME":"Nikilesh","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"200000","CREDIT_DAYS":25,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":3,"CUATOMER_NAME":"DLF","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9324354625","FAX":"9916775405","EMAIL":"Murali@gmail.com","CONTACT_PERSON_NAME":"Rohit","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"170000","CREDIT_DAYS":19,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":4,"CUATOMER_NAME":"Embassy Group","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"8665167405","FAX":"9916775405","EMAIL":"Rajesh@gmail.com","CONTACT_PERSON_NAME":"Arun","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"150000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":5,"CUATOMER_NAME":"Godrej Properties","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"8456721120","FAX":"9916775405","EMAIL":"Prasad@gmail.com","CONTACT_PERSON_NAME":"Sunil","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"120000","CREDIT_DAYS":13,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":6,"CUATOMER_NAME":"Prestige builders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"7324569103","FAX":"9916775405","EMAIL":"Santhosh@gmail.com","CONTACT_PERSON_NAME":"Arjun","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"170000","CREDIT_DAYS":15,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":7,"CUATOMER_NAME":"DLF","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9543623499","FAX":"9916775405","EMAIL":"Pranav@gmail.com","CONTACT_PERSON_NAME":"Akil","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"100000","CREDIT_DAYS":12,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0},{"COMPANY_ID":1,"CUSTOMER_ID":8,"CUATOMER_NAME":"RamBuilders","OFFICE_ADDRESS":"Bangalore","DELIVERY_ADDRESS":"Bangalore","TIN_NUMBER":"A123V0JNN","PAN_NUMBER":"BVID2323L","GST_NUMBER":"123ASD321","PHONE":"9421224571","FAX":"9916775405","EMAIL":"Lrjramkumar@gmail.com","CONTACT_PERSON_NAME":"Mahesh","CONTACT_PERSON_DESIGNATION":"Manager","CONTACT_PERSON_MOBILE":"9677488455","EXISTING_SUPPLIER":"LRJR","BUSINESS_NATURE":"Builders","START_DATE":"2017-11-28","ANNUAL_TURNOVER":"20000","REFERRED_BY":"Ramnath","CREDIT_LIMIT":"140000","CREDIT_DAYS":14,"MODE_OF_PAYMENT":"online","PAN_DOCUMENT":1,"ID_CARD_DOCUMENT":1,"ADDRESS_PROOF":1,"GST_CERTIFICATE":1,"CUSTOMER_TYPE":1,"IS_APPROVED":1,"CREATED_DATE":"2017-11-28","CREATED_USER_ID":"Lloyd","APPROVED_USER_ID":"Vasu","APPROVED_DATE":"2017-11-28","DEVICE_IP_ID":"192.168.2.6","MODIFIED_DATE":"2017-11-28","MODIFIED_USER_ID":"lloyd","DELETE_FLAG":0}]')
        a = $(".m_datatable").mDatatable({
                data: { type: "local", source: e, pageSize: 10 },
                layout: { theme: "default", class: "", scroll: !1, height: 300, footer: !1 },
                sortable: !0,
                pagination: !0,
                search: { input: $("#generalSearch") },
                columns: [{
                        field: "CUSTOMER_ID",
                        title: "#",
                        width: 50,
                        sortable: !1,
                        selector: !1,
                        textAlign: "center"
                    },
                    {
                        field: "CUATOMER_NAME",
                        title: "Customer Name",
                        responsive: {
                            visible: "lg"
                        }
                    },
                    {
                        field: "CONTACT_PERSON_NAME",
                        title: "Contact Person",
                        responsive: {
                            visible: "lg"
                        }
                    },
                    {
                        field: "PHONE",
                        title: "Mobile Number",
                        width: 100
                    },
                    {
                        field: "EMAIL",
                        title: "Email",
                        width: 200,
                    },
                    {
                        field: "CREDIT_LIMIT",
                        title: "Credit Limit",
                        width: 100,
                    },
                    {
                        field: "CREDIT_DAYS",
                        title: "Credit Days",
                        width: 100,
                    },
                    {
                        field: "IS_APPROVED",
                        title: "Status",
                        template: function(e) {
                            var a = {
                                1: {
                                    title: "Active",
                                    class: "m-badge--brand",
                                },
                                2: {
                                    title: "Inactive",
                                    class: " m-badge--metal"
                                },
                                3: {
                                    title: "Canceled",
                                    class: " m-badge--primary"
                                },
                                4: {
                                    title: "Success",
                                    class: " m-badge--success"
                                },
                                5: {
                                    title: "Info",
                                    class: " m-badge--info"
                                },
                                6: {
                                    title: "Danger",
                                    class: " m-badge--danger"
                                },
                                7: {
                                    title: "Warning",
                                    class: " m-badge--warning"
                                }
                            };
                            return '<span class="m-badge ' + a[
                                e.IS_APPROVED
                            ].class + ' m-badge--wide">' + a[
                                e.IS_APPROVED
                            ].title + "</span>"
                        }
                    },
                    {
                        field: "Actions",
                        width: 110,
                        title: "Actions",
                        sortable: !1,
                        overflow: "visible",
                        template: function(e) {
                            return '\t\t\t\t\t\t<div class="dropdown ' + (e.getDatatable().getPageSize() - e.getIndex() <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">                                <i class="la la-ellipsis-h"></i>                            </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View ">                            <i class="la la-edit"></i>                        </a>\t\t\t\t\t'
                        }
                    }
                ]
            }),
            i = a.getDataSourceQuery();
        $("#m_form_status").on("change", function() { a.search($(this).val(), "IS_APPROVED") }).val(void 0 !== i.IS_APPROVED ? i.IS_APPROVED : ""), $("#m_form_type").on("change", function() { a.search($(this).val(), "Type") }).val(void 0 !== i.Type ? i.Type : ""), $("#m_form_status, #m_form_type").selectpicker()
    };
    return { init: function() { e() } }
}();
jQuery(document).ready(function() { DatatableDataLocalDemo.init() });