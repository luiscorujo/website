import { useEffect } from 'react';
import { sfx } from './sound';

/**
 * Keyboard navigation for a shelf of items:
 *   ← / →   move the selection cursor
 *   Enter   activate the item under the cursor
 */
export default function useShelfKeys({ count, cursor, setCursor, onEnter }) {
    useEffect(() => {
        const onKey = (e) => {
            // Let real links keep their native Enter behaviour.
            if (e.key === 'Enter' && e.target && e.target.tagName === 'A') return;

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                sfx.blip();
                setCursor((c) => (c + 1) % count);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                sfx.blip();
                setCursor((c) => (c - 1 + count) % count);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                onEnter(cursor);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [count, cursor, setCursor, onEnter]);
}
