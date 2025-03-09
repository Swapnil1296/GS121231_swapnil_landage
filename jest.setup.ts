import '@testing-library/jest-dom';

export { }

declare global {
    interface Window {
        SVGElement: typeof SVGElement;
    }
}

Object.defineProperty(window.SVGElement.prototype, 'getBBox', {
    value: () => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }),
    configurable: true
});

// Mock other SVG methods as needed
Object.defineProperty(window.SVGElement.prototype, 'getComputedTextLength', {
    value: () => 0,
    configurable: true
});