type PopoverType = 'error' | 'sucess';
class Popover {
    private _isOpen: boolean = false;
    private _popoverElem?: HTMLElement;

    constructor(popoverElem: HTMLElement) {
        this._popoverElem = popoverElem;
    }

    open(): void {
        if (this._isOpen) 
            return;
        this._popoverElem?.showPopover();
        this._isOpen = true;
    }

    close(): void {
        if (!this._isOpen)
            return;
        this._popoverElem?.hidePopover();
        this._isOpen = false;
    }

    get isOpened(): boolean {
        return this._isOpen;
    }

    get isClosed(): boolean {
        return !this._isOpen;
    }
}

const errorPopoverElem = document.querySelector('.popover-error') as HTMLElement;
const successPopoverElem = document.querySelector('.popover-success') as HTMLElement;
const errorPopover = new Popover(errorPopoverElem);
const successPopover = new Popover(successPopoverElem);

let popoverTimerID: number | undefined;


export function showErrorPopover(): void {
   errorPopover.open();
}


export function hideErrorPopover(): void {
    errorPopover.close();
}


export function showSuccessPopover(): void {
    successPopover.open();
}

export function hideSuccessPopover(): void {
    successPopover.close();
}

const delayTime = 4000;
export default function popover(popoverType: PopoverType): void {
    closeAllActivePopovers();
    if (popoverTimerID)
        clearInterval(popoverTimerID);

    switch (popoverType) {
        case 'error':
            showErrorPopover();
            popoverTimerID = setTimeout(hideErrorPopover, delayTime);            
            break;
    
        case 'sucess':
            showSuccessPopover();
            popoverTimerID = setTimeout(hideSuccessPopover, delayTime); 
            break;
    }

}

export function closeAllActivePopovers(): void {
    const popovers = [successPopover, errorPopover];

    for (let i = 0; i < popovers.length; i++) {
        if (popovers[i].isClosed)
            continue;
        popovers[i].close();
    }
} 