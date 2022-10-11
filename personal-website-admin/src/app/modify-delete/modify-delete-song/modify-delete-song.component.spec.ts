import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDeleteSongComponent } from './modify-delete-song.component';

describe('ModifyDeleteSongComponent', () => {
  let component: ModifyDeleteSongComponent;
  let fixture: ComponentFixture<ModifyDeleteSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDeleteSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyDeleteSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
