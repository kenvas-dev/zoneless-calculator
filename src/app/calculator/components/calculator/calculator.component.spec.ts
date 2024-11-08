import { CalculatorService } from '@/calculator/services/Calculator.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

export class MockCalculatorService {
	public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
	public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
	public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');
	public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
	let fixture: ComponentFixture<CalculatorComponent>;
	let compiled: HTMLElement;
	let app: CalculatorComponent;
	let mockCalculatorService: MockCalculatorService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculatorComponent],
			providers: [
				{
					provide: CalculatorService,
					useClass: MockCalculatorService,
				},
			],
		}).compileComponents();
		fixture = TestBed.createComponent(CalculatorComponent);
		compiled = fixture.nativeElement as HTMLElement;
		app = fixture.componentInstance;
		mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

		// fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it('should have the current getters', () => {
		expect(app.resultText()).toBe('100.00');
		expect(app.subResultText()).toBe('20');
		expect(app.lastOperator()).toBe('-');
	});

	it('should display proper calculation values', () => {
		mockCalculatorService.resultText.and.returnValue('123');
		mockCalculatorService.subResultText.and.returnValue('456');
		mockCalculatorService.lastOperator.and.returnValue('*');

		fixture.detectChanges();
		expect(compiled.querySelector('span')?.innerText).toBe('456 *');

		expect(app.resultText()).toBe('123');
		expect(app.subResultText()).toBe('456');
		expect(app.lastOperator()).toBe('*');
	});

	it('should have 19 calculator-button components', () => {
		expect(app.calculatorButtons()).toBeTruthy();
		expect(app.calculatorButtons().length).toBe(19);
	});

	it('should have 19 calculator-button with content projection', () => {
		const buttons = compiled.querySelectorAll('calculator-button');

		expect(buttons.length).toBe(19);

		expect(buttons[0].textContent?.trim()).toBe('C');
		expect(buttons[1].textContent?.trim()).toBe('+/-');
		expect(buttons[2].textContent?.trim()).toBe('%');
		expect(buttons[3].textContent?.trim()).toBe('÷');
	});

	it('Should handle keyboard events correctly', () => {
		const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
		document.dispatchEvent(eventEnter);
		expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

		const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
		document.dispatchEvent(eventESC);
		expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
	});

	it('should display result text correctly', () => {
		mockCalculatorService.resultText.and.returnValue('123');
		mockCalculatorService.subResultText.and.returnValue('10');
		mockCalculatorService.lastOperator.and.returnValue('-');
		fixture.detectChanges();

		expect(app.resultText()).toBe('123');

		expect(compiled.querySelector('#subResultTest')?.textContent?.trim()).toContain('10 -');
	});
});
