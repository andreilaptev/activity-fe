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

  it('DataService should be created', inject([DataService], (dataService: DataService) => {
    expect(dataService).toBeTruthy();
  }));

  it('should return an Observables of Activities', () => {
    const testActivities = [
      {
        id: 100,
        name: 'activity1'
      },
      {
        id: 200,
        name: 'activity2'
      }
    ];

    dataService.getActivitiesList().subscribe(
      activities => {
        expect(activities[0].length(2));
        expect(activities).toEqual(testActivities);
      });

      const request = httpMock.expectOne(`${dataService.url}activities`);
      expect(request.request.method).toBe("GET");
      request.flush(testActivities);
  })
});
