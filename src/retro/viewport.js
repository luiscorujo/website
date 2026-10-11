/** Below this width the deck stacks into one column (see retro.css). */
export const STACK_BREAKPOINT = 900;

/**
 * On narrow screens the drive/console sits below the shelf, so after an
 * insert we scroll it into view. On wide screens everything is already visible.
 */
export function revealOnSmallScreens(element) {
    if (!element || window.innerWidth >= STACK_BREAKPOINT) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
