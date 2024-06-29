/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsernameService } from './username.service';

describe('Service: Username', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsernameService]
    });
  });

  it('should ...', inject([UsernameService], (service: UsernameService) => {
    expect(service).toBeTruthy();
  }));
});
