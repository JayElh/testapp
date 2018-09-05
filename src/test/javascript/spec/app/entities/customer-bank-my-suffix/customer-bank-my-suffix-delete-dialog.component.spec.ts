/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestAppTestModule } from '../../../test.module';
import { CustomerBankMySuffixDeleteDialogComponent } from 'app/entities/customer-bank-my-suffix/customer-bank-my-suffix-delete-dialog.component';
import { CustomerBankMySuffixService } from 'app/entities/customer-bank-my-suffix/customer-bank-my-suffix.service';

describe('Component Tests', () => {
    describe('CustomerBankMySuffix Management Delete Component', () => {
        let comp: CustomerBankMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerBankMySuffixDeleteDialogComponent>;
        let service: CustomerBankMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CustomerBankMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CustomerBankMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerBankMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerBankMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
