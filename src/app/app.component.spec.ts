import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should be 3", () => {
    const num1 = 1;
    const num2 = 2;
    const result = num1 + num2;
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(app.title).toEqual("zoneless-calculator");
  });

  it("should render router outlet", () => {
    expect(compiled.querySelector("router-outlet")).not.toBeNull();
  });

  it("should render router-outlet wrapped css classes", () => {
    const divElement = compiled.querySelector("div");

    const mustHaveClasses =
      "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(
        " ",
      );

    expect(divElement).not.toBeNull();

    const divClasses = divElement?.classList;
    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("should contain the ' buy me a beer ' link", () => {
    const tagElement = compiled.querySelector("a");
    const anchorTag = tagElement;

    expect(anchorTag).not.toBeNull();
    expect(anchorTag?.getAttribute("href")).not.toBeNull();
    expect(anchorTag?.getAttribute("title")).not.toBeNull();
    expect(anchorTag?.getAttribute("href")).toBe(
      "https://www.buymeacoffee.com/scottwindon",
    );
    expect(anchorTag?.getAttribute("title")).toBe("Buy me a beer");
  });
});
