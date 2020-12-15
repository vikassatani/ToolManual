import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Dashboard, Status, InventoryUpload } from '../../../../componentDetails';
import { ServerService } from '../../../../server.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { Router } from '@angular/router';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {
    branchName: any;
    branchName1: any;
    branchName2: any;
    branchName3: any;
    branchName4: any;
    branchName5: any;
    branchName6: any;
    branchName7: any;
    branchName8: any;
    branchName9: any;
    branchName10: any;
    branchName11: any;
    branchName12: any;
    branchName13: any;
    branchName14: any;
    branchName15: any;
    branchId: number;
    category = [];
    quantity = [];
    categories: any;
    categories1: any;
    cate1: any;
    cate: any;
    dat: number;
    branch = [];
    varLen: number;

    value0 = true;
    value1 = true;
    value2 = true;
    value3 = true;
    value4 = true;
    value5 = true;
    value6 = true;
    value7 = true;
    value8 = true;
    value9 = true;
    value10 = true;
    value11 = true;
    value12 = true;
    value13 = true;
    value14 = true;
    value15 = true;

    rowsPerPage = 5



    inventoryUpload: InventoryUpload[];
    dashboard: Dashboard[];
    constructor(private _script: ScriptLoaderService, private _router: Router, private serverService: ServerService, private AmCharts: AmChartsService) {

    }
    ngOnInit() {
        this._router.navigate(['/addCustomer']);
        this.serverService.getInventoryUploadDataFromServers(0, 0, 0)
            .subscribe(Data => {
                this.inventoryUpload = Data;
            });

        this.serverService.getDashBoardDetails()

            .subscribe(Data => {
                let data = Data;
                this.dashboard = data;
                // this.branchName=data.split("")
                //  var decodedJsonObject = JSON.parse(data);
                // var low = decodedJsonObject.height.low;
                // this.branchId=
                // this.category=
                //var JSONString =  '[{"branch_Id":1,"branch_Name":"Budhigeri","category":[{"Name":"Coil\/Sheet","quantity":60.000},{"Name":"Durastrong Wiremesh","quantity":15.000},{"Name":"GC SHEET","quantity":1045.524},{"Name":"STEEL PIPE","quantity":4270.000},{"Name":"Structural Steel","quantity":156257.000}]},{"branch_Id":2,"branch_Name":"Bangalore-HO","category":[{"Name":"Coil\/Sheet","quantity":60.000},{"Name":"Durastrong Wiremesh","quantity":15.000},{"Name":"GC SHEET","quantity":1045.524},{"Name":"STEEL PIPE","quantity":4270.000},{"Name":"Structural Steel","quantity":156257.000}]},{"branch_Id":3,"branch_Name":"Salem","category":[{"Name":"Coil\/Sheet","quantity":60.000},{"Name":"Durastrong Wiremesh","quantity":15.000},{"Name":"GC SHEET","quantity":1045.524},{"Name":"STEEL PIPE","quantity":4270.000},{"Name":"Structural Steel","quantity":156257.000}]}]';
                var JSONString = data.toString();
                var JSONObject = JSON.parse(JSONString);

                this.branch = JSONObject;
                console.log(JSONObject);      // Dump all data of the Object in the console
                let i, j;

                for (i = 0; i <= JSONObject.length - 1; i++) {

                    if (i == 0) {
                        this.category = JSONObject[i].category;
                        this.branchName = JSONObject[i].branch_Name;

                        // this.cate1=JSON.stringify(this.category)
                        // this.categories=JSON.parse(this.cate1) 
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value0 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv1", {
                            //   "hideCredits":true,

                            //   // "marginLeft": 1,
                            //   // "marginRight": 1,
                            //   // "marginBottom": 1,
                            //   // "marginTop": 1,
                            //   //"fontSize": 14,
                            //   //fontFamily: "Tahoma",
                            //   "colors": ["#E7BA13", "#13E7AD", "#E78013", "#139AE7", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            //   "type": "pie",
                            //   "theme": "light",
                            //   "dataProvider":this.categories,
                            //   "valueField": "quantity",
                            //   "titleField": "Name",
                            //   //"labelText": "[[valueField]]",
                            //   //"labelPosition": "inside",
                            //    "balloon":{
                            //    "fixedPosition":true,
                            //  //  "labelText": "[[titleField]]: [[valueField]]",
                            //   //  "numberFormatter": {
                            //   //   "precision": -1,
                            //   //   "decimalSeparator": ",",
                            //   //   "thousandsSeparator": ""

                            //   //  }

                            //   },
                            //   "export": {
                            //     "enabled": true,
                            //    // "valueField":true
                            //   }
                            // } );

                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",

                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 1) {
                        this.category = JSONObject[i].category;
                        this.branchName1 = JSONObject[i].branch_Name;

                        this.branchName = JSONObject[0].branch_Name;
                        this.categories1 = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value1 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv2", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",

                            "colorField": "#E71913",
                            "dataProvider": this.categories1,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        }
                        );

                    }
                    else if (i == 2) {
                        this.category = JSONObject[i].category;
                        this.branchName2 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value2 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv3", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 3) {
                        this.category = JSONObject[i].category;
                        this.branchName3 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value3 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv4", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 4) {
                        this.category = JSONObject[i].category;
                        this.branchName4 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value4 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv5", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 5) {
                        this.category = JSONObject[i].category;
                        this.branchName5 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value5 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv6", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }

                    else if (i == 6) {
                        this.category = JSONObject[i].category;
                        this.branchName6 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value6 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv7", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }

                    else if (i == 7) {
                        this.category = JSONObject[i].category;
                        this.branchName7 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value7 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv8", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 8) {
                        this.category = JSONObject[i].category;
                        this.branchName8 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value8 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv9", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 9) {
                        this.category = JSONObject[i].category;
                        this.branchName9 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value9 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv10", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 10) {
                        this.category = JSONObject[i].category;
                        this.branchName10 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value10 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv11", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 11) {
                        this.category = JSONObject[i].category;
                        this.branchName11 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value11 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv12", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 12) {
                        this.category = JSONObject[i].category;
                        this.branchName12 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value12 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv13", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }
                    else if (i == 13) {
                        this.category = JSONObject[i].category;
                        this.branchName13 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))

                        if (this.categories != null || this.categories != undefined) {
                            this.value13 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv14", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }

                    else if (i == 14) {
                        this.category = JSONObject[i].category;
                        this.branchName14 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value14 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv15", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }

                    else if (i == 15) {
                        this.category = JSONObject[i].category;
                        this.branchName15 = JSONObject[i].branch_Name;

                        // this.branchName= JSONObject[0].branch_Name;
                        this.categories = JSON.parse(JSON.stringify(this.category))
                        if (this.categories != null || this.categories != undefined) {
                            this.value15 = false;
                        }
                        var chart = this.AmCharts.makeChart("chartdiv16", {
                            "hideCredits": true,
                            "colors": ["#E71913", "#13E7AD", "#E78013", "#E7E713", "#3DE713", "#E7BA13", "#139AE7", "#1333E7", "#B013E7", "#E7136A"],
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": this.categories,
                            "valueField": "quantity",
                            "titleField": "Name",
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        });

                    }

                }


                // this.branchName2= JSONObject[2].branch_Name;
                //  this.branchName3= JSONObject[3].branch_Name;
                // this.branchName4= JSONObject[4].branch_Name;



                //this.varLen=JSONObject[i].category.length


                // for(j=0;j<JSONObject[i].category.length;j++){

                //     this.category[j]=JSONObject[i].category[j].Name
                //     this.quantity[j]=JSONObject[i].category[j].quantity
                //     console.log( this.category);
                //     this.makechart(this.category[j],this.quantity[j])

                // }

                // var dat=this.categories;
                // var result = dat.slice(1, -1);
                // this.cate=this.categories.replace("", "");
                //this.cate=this.categories.substring(1, categories.length - 1);




                //   var chart = this.AmCharts.makeChart( "chartdiv3", {

                //     "type": "pie",
                //     "theme": "light",
                //     "dataProvider":this.categories,
                //     "valueField": "quantity",
                //     "titleField": "Name",
                //      "balloon":{
                //      "fixedPosition":true
                //     },
                //     "export": {
                //       "enabled": true
                //     }
                //   } );




                // if(i=0){
                //     this.branchName= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //      this.categories=JSON.parse(JSON.stringify(this.category)) 

                //     var chart = this.AmCharts.makeChart( "chartdiv1", {

                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }

                // else if(i=1){
                //     this.branchName1= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //   this.categories=JSON.parse(JSON.stringify(this.category)) 

                //     var chart = this.AmCharts.makeChart( "chartdiv2", {
                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }
                // else if(i=2){

                //     this.branchName2= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //   this.categories=JSON.parse(JSON.stringify(this.category)) 
                //     var chart = this.AmCharts.makeChart( "chartdiv2", {
                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }
                // else if(i=3){

                //     this.branchName3= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //   this.categories=JSON.parse(JSON.stringify(this.category)) 
                //     var chart = this.AmCharts.makeChart( "chartdiv2", {
                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }

                // else if(i=4){

                //     this.branchName4= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //   this.categories=JSON.parse(JSON.stringify(this.category)) 
                //     var chart = this.AmCharts.makeChart( "chartdiv2", {
                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }
                // else if(i=5){

                //     this.branchName5= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //   this.categories=JSON.parse(JSON.stringify(this.category)) 
                //     var chart = this.AmCharts.makeChart( "chartdiv2", {
                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }
                // else{
                //     this.branchName6= JSONObject[i].branch_Name;

                //     this.category=JSONObject[i].category;

                //   this.categories=JSON.parse(JSON.stringify(this.category)) 
                //     var chart = this.AmCharts.makeChart( "chartdiv2", {
                //         "type": "pie",
                //         "theme": "light",
                //         "dataProvider":this.categories,
                //         "valueField": "quantity",
                //         "titleField": "Name",
                //          "balloon":{
                //          "fixedPosition":true
                //         },
                //         "export": {
                //           "enabled": true
                //         }
                //       } );
                // }





                // alert(JSONObject[0]["branch_Name"]); // Access Object data
            });

    }



    //  makechart(category,quantity){

    // let k;
    //   for(k=0;k<this.varLen;k++){


    //   }


    //  }




    ngAfterViewInit() {

        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        // 'assets/demo/demo4/base/charts.js');
        Helpers.loadStyles('.m-grid__item.m-grid__item--fluid.m-wrapper', [
        ]);

        Helpers.bodyClass('m-page--boxed m-body--fixed m-header--static m-aside--offcanvas-default');

    }

}