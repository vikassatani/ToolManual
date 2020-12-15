import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import * as myGlobals from '../../../../Global';
import { SettingsComponent } from '../settings/settings.Component';
import { Router } from '@angular/router';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./addDivision.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AddDivisionComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {

    }
    // ngAfterViewInit() {
    //     this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    //         'assets/demo/default/custom/components/datatables/base/html-table.js');

    // }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/demo4/base/data-local.js');

    }

}