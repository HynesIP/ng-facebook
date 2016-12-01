export function offset(elem: HTMLElement) {
    let docElem: HTMLElement, rect: ClientRect, doc: Document;

    if (!elem) {
        return;
    }

    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none)
    if (rect.width || rect.height) {
        doc = elem.ownerDocument;
        docElem = doc.documentElement;

        return {
            top: rect.top + window.pageYOffset - docElem.clientTop,
            left: rect.left + window.pageXOffset - docElem.clientLeft
        };
    }

    // Return zeros for disconnected and hidden elements (gh-2310)
    return rect;
}

export interface ViewportSettings {
    container?: any;
    threshold?: number;
}

export function aboveTheTop(element: HTMLElement, settings: ViewportSettings = {}) {
    let fold: number,
        container = settings.container || window,
        threshold = settings.threshold || 0;

    if (container === window) {
        fold = window.scrollY;
    } else {
        fold = offset(container).top;
    }

    return fold >= offset(element).top + threshold + element.offsetHeight;
}

export function rightOfFold(element: HTMLElement, settings: ViewportSettings = {}) {
    let fold: number,
        container = settings.container || window,
        threshold = settings.threshold || 0;

    if (container === window) {
        fold = window.innerWidth + window.scrollX;
    } else {
        fold = offset(container).left + settings.container.offsetWidth;
    }

    return fold <= offset(element).left - threshold;
}

export function belowTheFold(element: HTMLElement, settings: ViewportSettings = {}) {
    let fold: number,
        container = settings.container || window,
        threshold = settings.threshold || 0;

    if (container === window) {
        fold = window.innerHeight + window.scrollY;
    } else {
        fold = offset(container).top + settings.container.offsetHeight;
    }

    return fold <= offset(element).top - threshold;
}

export function leftOfBegin(element: HTMLElement, settings: ViewportSettings = {}) {
    let fold: number,
        container = settings.container || window,
        threshold = settings.threshold || 0;

    if (container === window) {
        fold = window.scrollX;
    } else {
        fold = offset(container).left;
    }

    return fold >= offset(element).left + threshold + element.offsetWidth;
}

export function inViewport(element: HTMLElement, settings: ViewportSettings = {}) {
    return !rightOfFold(element, settings)
        && !leftOfBegin(element, settings)
        && !belowTheFold(element, settings)
        && !aboveTheTop(element, settings);
}