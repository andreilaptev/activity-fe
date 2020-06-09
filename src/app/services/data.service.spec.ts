import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

fdescribe('DataService', () => {

  let injector: TestBed;
  let dataService: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    injector = getTestBed();
    dataService = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', inject([DataService], (dataService: DataService) => {
    expect(dataService).toBeTruthy();
  }));
});
