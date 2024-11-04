import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';

@Component({
	selector: 'calculator-button',
	styleUrl: './calculator-button.component.scss',
	standalone: true,
	imports: [],
	templateUrl: './calculator-button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'border-r border-b border-indigo-400',
		'[class.w-2/4]': 'isDoubleSize()',
		'[class.w-1/4]': '!isDoubleSize()',
	},
	// encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent {
	// Nuevo Output
	public onClick = output<string>();

	public isPressed = signal<boolean>(false);

	// Nuevo viewChild
	public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

	//Signal input
	// public isCommand = input.required(); Si es necesario que se requiera, se especifica
	public isCommand = input(false, {
		transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
	});

	public isDoubleSize = input(false, {
		transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
	});

	handleClick() {
		if (!this.contentValue()?.nativeElement) return;
		const value = this.contentValue()!.nativeElement.innerText;
		this.onClick.emit(value.trim());
	}

	public keyBoardPressedStyle(key: string) {
		if (!this.contentValue()) return;

		const value = this.contentValue()!.nativeElement.innerHTML;

		if (value !== key) return;

		this.isPressed.set(true);
		setTimeout(() => {
			this.isPressed.set(false);
		}, 100);
	}
}
