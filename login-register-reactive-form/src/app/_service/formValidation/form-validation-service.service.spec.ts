import { TestBed } from '@angular/core/testing';

import { FormValidationServiceService } from './form-validation-service.service';

describe('FormValidationServiceService', () => {
  let service: FormValidationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
