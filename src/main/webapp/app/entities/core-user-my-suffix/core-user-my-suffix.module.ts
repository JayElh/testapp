import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestAppSharedModule } from 'app/shared';
import {
    CoreUserMySuffixComponent,
    CoreUserMySuffixDetailComponent,
    CoreUserMySuffixUpdateComponent,
    CoreUserMySuffixDeletePopupComponent,
    CoreUserMySuffixDeleteDialogComponent,
    coreUserRoute,
    coreUserPopupRoute
} from './';

const ENTITY_STATES = [...coreUserRoute, ...coreUserPopupRoute];

@NgModule({
    imports: [TestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CoreUserMySuffixComponent,
        CoreUserMySuffixDetailComponent,
        CoreUserMySuffixUpdateComponent,
        CoreUserMySuffixDeleteDialogComponent,
        CoreUserMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CoreUserMySuffixComponent,
        CoreUserMySuffixUpdateComponent,
        CoreUserMySuffixDeleteDialogComponent,
        CoreUserMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestAppCoreUserMySuffixModule {}
