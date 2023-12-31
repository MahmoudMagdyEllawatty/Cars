import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPackagePage } from './add-package.page';

describe('AddPackagePage', () => {
  let component: AddPackagePage;
  let fixture: ComponentFixture<AddPackagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
