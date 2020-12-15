import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';
import * as myGlobals from '../../../Global';

@Component({
    selector: "app-header-topbar",
    templateUrl: "./header-topbar.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderTopbarComponent implements OnInit {
    readonly user_Name: string = 'ADMIN';
    readonly email_Id: string = 'ab@yahoo.com';

    constructor() {

    }
    ngOnInit() {
        // this.Email= myGlobals.EmailId
    }

}