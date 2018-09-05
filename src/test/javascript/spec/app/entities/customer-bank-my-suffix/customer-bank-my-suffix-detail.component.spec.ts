/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestAppTestModule } from '../../../test.module';
import { CustomerBankMySuffixDetailComponent } from 'app/entities/customer-bank-my-suffix/customer-bank-my-suffix-detail.component';
import { CustomerBankMySuffix } from 'app/shared/model/customer-bank-my-suffix.model';

describe('Component Tests', () => {
    describe('CustomerBankMySuffix Management Detail Component', () => {
        let comp: CustomerBankMySuffixDetailComponent;
        let fixture: ComponentFixture<CustomerBankMySuffixDetailComponent>;
        const route = ({ data: of({ customerBank: new CustomerBankMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CustomerBankMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerBankMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerBankMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerBank).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
