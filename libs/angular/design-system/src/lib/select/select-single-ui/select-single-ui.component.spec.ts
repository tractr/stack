import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSingleUiComponent } from './select-single-ui.component';
import { SelectOptionInterface } from '../../interfaces';

/**
 * Changes in components using OnPush strategy are only applied once when calling .detectChanges(),
 * This function solves this issue.
 */
export async function runOnPushChangeDetection(
  fixture: ComponentFixture<unknown>,
): Promise<void> {
  const changeDetectorRef =
    fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  changeDetectorRef.detectChanges();
  return fixture.whenStable();
}

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

describe('SelectSingleUiComponent', () => {
  let component: SelectSingleUiComponent;
  let fixture: ComponentFixture<SelectSingleUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSingleUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSingleUiComponent);
    component = fixture.componentInstance;
    component.options = options;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should returned value', async () => {
    const selectValue = async (value: string | undefined) => {
      component.select.nativeElement.value = value;
      component.select.nativeElement.dispatchEvent(new Event('change'));
      await runOnPushChangeDetection(fixture);
    };

    // Check initial value
    expect(component.select.nativeElement.value).toEqual('null');

    // Set by last value of input value stream
    let lastValue: string | undefined;
    component.value$.subscribe((value) => {
      lastValue = value;
    });
    let lastSelected: SelectOptionInterface | undefined;
    component.selected$.subscribe((selected) => {
      lastSelected = selected;
    });
    expect(lastValue).toEqual(undefined);
    expect(lastSelected).toEqual(undefined);

    // Set value to first option
    await selectValue('1');
    expect(lastValue).toEqual('1');
    expect(lastSelected).toEqual(options[0]);

    // Set value to second option
    await selectValue('2');
    expect(lastValue).toEqual('2');
    expect(lastSelected).toEqual(options[1]);

    // Set empty value
    await selectValue(undefined);
    expect(lastValue).toEqual(undefined);
    expect(lastSelected).toEqual(undefined);
  });
});
