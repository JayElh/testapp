import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestAppSharedModule } from 'app/shared';
import {
    BankMySuffixComponent,
    BankMySuffixDetailComponent,
    BankMySuffixUpdateComponent,
    BankMySuffixDeletePopupComponent,
    BankMySuffixDeleteDialogComponent,
    bankRoute,
    bankPopupRoute
} from './';

const ENTITY_STATES = [...bankRoute, ...bankPopupRoute];

@NgModule({
    imports: [TestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BankMySuffixComponent,
        BankMySuffixDetailComponent,
        BankMySuffixUpdateComponent,
        BankMySuffixDeleteDialogComponent,
        BankMySuffixDeletePopupComponent
    ],
    entryComponents: [
        BankMySuffixComponent,
        BankMySuffixUpdateComponent,
        BankMySuffixDeleteDialogComponent,
        BankMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestAppBankMySuffixModule {}
