import { afterEach, describe, expect, it } from "bun:test";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
	url: "http://localhost",
});
const finishName = /the finish/i;

class IntersectionObserverStub {
	disconnect = () => undefined;
	observe = () => undefined;
	unobserve = () => undefined;
}

Object.assign(dom.window, { IntersectionObserver: IntersectionObserverStub });
Object.assign(globalThis, {
	Element: dom.window.Element,
	HTMLElement: dom.window.HTMLElement,
	IntersectionObserver: IntersectionObserverStub,
	IS_REACT_ACT_ENVIRONMENT: true,
	SVGElement: dom.window.SVGElement,
	window: dom.window,
});
Object.defineProperty(globalThis, "document", {
	configurable: true,
	value: dom.window.document,
});
Object.defineProperty(globalThis, "navigator", {
	configurable: true,
	value: dom.window.navigator,
});
dom.window.matchMedia = (query) => ({
	matches: query.includes("reduced-motion"),
	media: query,
	onchange: null,
	addListener: () => undefined,
	removeListener: () => undefined,
	addEventListener: () => undefined,
	removeEventListener: () => undefined,
	dispatchEvent: () => false,
});

const React = await import("react");
const { cleanup, fireEvent, render, screen } = await import(
	"@testing-library/react"
);
const { renderToStaticMarkup } = await import("react-dom/server");
const { CraftExploded } = await import("./craft-exploded");
const { CraftIllustration } = await import("./craft-illustration");

afterEach(() => {
	cleanup();
	dom.window.document.body.innerHTML = "";
});

const kinds = ["exploded", "joinery", "interior"] as const;

describe("craft illustration interactions", () => {
	it("keeps the room platform outside the individual idle animation layers", () => {
		const { container } = render(<CraftIllustration kind="interior" />);
		const drawing = container.querySelector(".craft-canvas > svg");
		expect(drawing).not.toBeNull();
		expect(
			drawing?.querySelectorAll(".craft-part > .craft-part-drift").length
		).toBe(3);
		const platform = drawing?.querySelector(":scope > path");
		expect(platform).not.toBeNull();
		expect(platform?.closest(".craft-part-drift")).toBeNull();
		expect(drawing?.parentElement?.getAttribute("style")).toBeNull();
	});

	it.each(kinds)("%s inspector pins and unpins a part", (kind) => {
		render(<CraftIllustration kind={kind} />);
		const finishButton = screen.getByRole("button", { name: finishName });
		const finishPart = document.querySelector('[data-craft-part="finish"]');

		expect(finishButton.getAttribute("aria-pressed")).toBe("false");
		fireEvent.click(finishButton);
		expect(finishButton.getAttribute("aria-pressed")).toBe("true");
		expect(finishPart?.getAttribute("aria-pressed")).toBe("true");

		fireEvent.focus(finishButton);
		expect(finishButton.getAttribute("data-active")).toBe("true");
		fireEvent.click(finishButton);
		expect(finishButton.getAttribute("data-active")).toBe("false");
		expect(finishButton.getAttribute("aria-pressed")).toBe("false");
		expect(finishPart?.getAttribute("aria-pressed")).toBe("false");
	});

	it.each(kinds)("%s SVG parts support Enter and Space selection", (kind) => {
		render(<CraftIllustration kind={kind} />);
		const materialPart = document.querySelector(
			'.craft-drawing [data-craft-part="material"]'
		);
		if (!materialPart) {
			throw new Error("The material part should be present in the SVG.");
		}

		fireEvent.keyDown(materialPart, { key: "Enter" });
		expect(materialPart.getAttribute("aria-pressed")).toBe("true");
		fireEvent.keyDown(materialPart, { key: " " });
		expect(materialPart.getAttribute("aria-pressed")).toBe("false");
	});

	it.each(kinds)("%s assembly control opens and resets the study", (kind) => {
		render(<CraftIllustration kind={kind} />);
		const assemblyButton = screen.getByRole("button", {
			name: "Bring it together",
		});

		expect(assemblyButton.getAttribute("aria-pressed")).toBe("true");
		fireEvent.click(assemblyButton);
		expect(
			screen
				.getByRole("button", { name: "Open the assembly" })
				.getAttribute("aria-pressed")
		).toBe("false");
		expect(screen.getByText("Every part, working together")).toBeTruthy();

		fireEvent.click(screen.getByRole("button", { name: "Reset view" }));
		expect(
			screen
				.getByRole("button", { name: "Bring it together" })
				.getAttribute("aria-pressed")
		).toBe("true");
		expect(screen.getByText("An open view of the craft")).toBeTruthy();
	});
});

describe("reduced-motion construction geometry", () => {
	it("retains expanded and assembled layout targets", () => {
		const renderStudy = (expanded: boolean) =>
			renderToStaticMarkup(
				React.createElement(CraftExploded, {
					activePart: null,
					expanded,
					onInspect: () => undefined,
					onSelect: () => undefined,
					reducedMotion: true,
				})
			);
		const readMakingTransform = (markup: string) => {
			const parsed = new JSDOM(markup, { contentType: "image/svg+xml" });
			return parsed.window.document
				.querySelector('[data-craft-part="making"]')
				?.getAttribute("style");
		};

		expect(readMakingTransform(renderStudy(true))).toContain(
			"transform:translateY(90px)"
		);
		expect(readMakingTransform(renderStudy(false))).toContain(
			"transform:translateY(12px)"
		);
	});
});
