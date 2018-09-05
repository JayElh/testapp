/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestAppTestModule } from '../../../test.module';
import { BankMySuffixDetailComponent } from 'app/entities/bank-my-suffix/bank-my-suffix-detail.component';
import { BankMySuffix } from 'app/shared/model/bank-my-suffix.model';

describe('Component Tests', () => {
    describe('BankMySuffix Management Detail Component', () => {
        let comp: BankMySuffixDetailComponent;
        let fixture: ComponentFixture<BankMySuffixDetailComponent>;
        const route = ({ data: of({ bank: new BankMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [BankMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BankMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bank).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
