import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPackagesPage } from './search-packages.page';

describe('SearchPackagesPage', () => {
  let component: SearchPackagesPage;
  let fixture: ComponentFixture<SearchPackagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPackagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPackagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
