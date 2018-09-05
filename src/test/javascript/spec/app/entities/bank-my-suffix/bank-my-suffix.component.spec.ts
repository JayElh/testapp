/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestAppTestModule } from '../../../test.module';
import { BankMySuffixComponent } from 'app/entities/bank-my-suffix/bank-my-suffix.component';
import { BankMySuffixService } from 'app/entities/bank-my-suffix/bank-my-suffix.service';
import { BankMySuffix } from 'app/shared/model/bank-my-suffix.model';

describe('Component Tests', () => {
    describe('BankMySuffix Management Component', () => {
        let comp: BankMySuffixComponent;
        let fixture: ComponentFixture<BankMySuffixComponent>;
        let service: BankMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [BankMySuffixComponent],
                providers: []
            })
                .overrideTemplate(BankMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BankMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.banks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
