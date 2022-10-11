import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailInfoComponent } from './thumbnail-info.component';

describe('ThumbnailInfoComponent', () => {
  let component: ThumbnailInfoComponent;
  let fixture: ComponentFixture<ThumbnailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
