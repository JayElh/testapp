/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestAppTestModule } from '../../../test.module';
import { CoreUserMySuffixComponent } from 'app/entities/core-user-my-suffix/core-user-my-suffix.component';
import { CoreUserMySuffixService } from 'app/entities/core-user-my-suffix/core-user-my-suffix.service';
import { CoreUserMySuffix } from 'app/shared/model/core-user-my-suffix.model';

describe('Component Tests', () => {
    describe('CoreUserMySuffix Management Component', () => {
        let comp: CoreUserMySuffixComponent;
        let fixture: ComponentFixture<CoreUserMySuffixComponent>;
        let service: CoreUserMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestAppTestModule],
                declarations: [CoreUserMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CoreUserMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CoreUserMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoreUserMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CoreUserMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.coreUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
