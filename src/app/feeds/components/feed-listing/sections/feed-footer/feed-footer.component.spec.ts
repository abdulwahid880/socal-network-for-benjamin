import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFooterComponent } from './feed-footer.component';

describe('FeedFooterComponent', () => {
  let component: FeedFooterComponent;
  let fixture: ComponentFixture<FeedFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
