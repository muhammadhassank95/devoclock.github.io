import { TestBed } from '@angular/core/testing';

import { HttpDynamicService } from './http-dynamic.service';

describe('HttpDynamicService', () => {
    let service: HttpDynamicService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpDynamicService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
