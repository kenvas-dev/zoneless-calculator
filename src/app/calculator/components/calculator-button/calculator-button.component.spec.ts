import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
	standalone: true,
	imports: [CalculatorButtonComponent],
	template: `
		<calculator-button>
			<span class="projected-content underline"> Test content </span>
		</calculator-button>
	`,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
	let fixture: ComponentFixture<CalculatorButtonComponent>;
	let compiled: HTMLElement;
	let app: CalculatorButtonComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculatorButtonComponent],
		}).compileComponents();
		fixture = TestBed.createComponent(CalculatorButtonComponent);
		compiled = fixture.nativeElement as HTMLElement;
		app = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it('should apply w-1/4 doubleSize is false', () => {
		const hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(hostCssClasses).toContain('w-1/4');
		expect(app.isDoubleSize()).toBeFalse();
	});

	it('should apply w-2/4 doubleSize is false', () => {
		fixture.componentRef.setInput('isDoubleSize', true);
		fixture.detectChanges();

		const hostCssClasses: string[] = compiled.classList.value.split(' ');

		expect(hostCssClasses).toContain('w-2/4');
		expect(app.isDoubleSize()).toBeTrue();
	});

	it('should emit onClick when handleClick is called', () => {
		//espías

		spyOn(app.onClick, 'emit');

		app.handleClick();

		expect(app.onClick.emit).toHaveBeenCalled();
		// expect(app.onClick.emit).toHaveBeenCalledWith('');
	});

	it('should set isPressed to true and then false when keyboard', done => {
		app.contentValue()!.nativeElement.innerText = '1';

		app.keyBoardPressedStyle('1');

		expect(app.isPressed()).toBeTrue();

		setTimeout(() => {
			expect(app.isPressed()).toBeFalse();
			done();
		}, 101);
	});

	it('should not set isPressed to true if key is not matching', () => {
		app.contentValue()!.nativeElement.innerText = '1';

		app.keyBoardPressedStyle('2');

		expect(app.isPressed()).toBeFalse();
	});

	it('should display projected content', () => {
		const testHostFixture = TestBed.createComponent(TestHostComponent);

		const compiled = testHostFixture.nativeElement as HTMLDivElement;
		const projectedContent = compiled.querySelector('.projected-content');

		expect(projectedContent).not.toBeNull();
		expect(projectedContent?.classList.contains('underline')).toBeTrue();
	});
});
