import { NgModule } from '@angular/core';
import { DefaultComponent } from '../pages/default/default.component';

import { HeaderBrandComponent } from './header-brand/header-brand.component';
import { HeaderTopbarComponent } from './header-topbar/header-topbar.component';
import { AsideLeftDisplayDisabledComponent } from '../pages/aside-left-display-disabled/aside-left-display-disabled.component';
import { HorMenuComponent } from './hor-menu/hor-menu.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../../_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../../_directives/unwrap-tag.directive';
import { AsideNavComponent } from './aside-nav/aside-nav.component';

import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        DefaultComponent,

        HeaderBrandComponent,
        HeaderTopbarComponent,
        AsideLeftDisplayDisabledComponent,
        HorMenuComponent,
        SearchComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        AsideNavComponent

    ],
    exports: [
        DefaultComponent,

        HeaderBrandComponent,
        HeaderTopbarComponent,
        AsideLeftDisplayDisabledComponent,
        HorMenuComponent,
        SearchComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        AsideNavComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class LayoutModule {
}