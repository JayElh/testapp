import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestAppBankMySuffixModule } from './bank-my-suffix/bank-my-suffix.module';
import { TestAppCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { TestAppCustomerBankMySuffixModule } from './customer-bank-my-suffix/customer-bank-my-suffix.module';
import { TestAppCoreUserMySuffixModule } from './core-user-my-suffix/core-user-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TestAppBankMySuffixModule,
        TestAppCustomerMySuffixModule,
        TestAppCustomerBankMySuffixModule,
        TestAppCoreUserMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestAppEntityModule {}
