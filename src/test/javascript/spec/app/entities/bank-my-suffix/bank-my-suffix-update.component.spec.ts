/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestAppTestModule } from '../../../test.module';
import { BankMySuffixUpdateComponent } from 'app/entities/bank-my-suffix/bank-my-suffix-update.component';
import { BankMySuffixService } from 'app/entities/bank-my-suffix/bank-my-suffix.service';
import { BankMySuffix } from 'app/shared/model/bank-my-suffix.model';

describe('Component Tests', () => {
    describe('BankMySuffix Management Update Component', () => {
        let comp: BankMySuffixUpdateComponent;
        let fixture: ComponentFixture<BankMySuffixUpdateComponent>;
        let service: BankMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [BankMySuffixUpdateComponent]
            })
                .overrideTemplate(BankMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BankMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bank = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BankMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bank = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
