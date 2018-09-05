/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestAppTestModule } from '../../../test.module';
import { CustomerBankMySuffixComponent } from 'app/entities/customer-bank-my-suffix/customer-bank-my-suffix.component';
import { CustomerBankMySuffixService } from 'app/entities/customer-bank-my-suffix/customer-bank-my-suffix.service';
import { CustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';

describe('Component Tests', () => {
    describe('CustomerBankMySuffix Management Component', () => {
        let comp: CustomerBankMySuffixComponent;
        let fixture: ComponentFixture<CustomerBankMySuffixComponent>;
        let service: CustomerBankMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CustomerBankMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CustomerBankMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerBankMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerBankMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CustomerBankMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.customerBanks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
