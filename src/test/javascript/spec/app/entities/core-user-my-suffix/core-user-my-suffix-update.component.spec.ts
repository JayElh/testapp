/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestAppTestModule } from '../../../test.module';
import { CoreUserMySuffixUpdateComponent } from 'app/entities/core-user-my-suffix/core-user-my-suffix-update.component';
import { CoreUserMySuffixService } from 'app/entities/core-user-my-suffix/core-user-my-suffix.service';
import { CoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';

describe('Component Tests', () => {
    describe('CoreUserMySuffix Management Update Component', () => {
        let comp: CoreUserMySuffixUpdateComponent;
        let fixture: ComponentFixture<CoreUserMySuffixUpdateComponent>;
        let service: CoreUserMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CoreUserMySuffixUpdateComponent]
            })
                .overrideTemplate(CoreUserMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CoreUserMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoreUserMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CoreUserMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.coreUser = entity;
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
                    const entity = new CoreUserMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.coreUser = entity;
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
