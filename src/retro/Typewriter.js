import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveals `text` a few characters at a time, terminal style.
 * `onDone` fires exactly once per text (also when `skip` flips to true).
 */
export default function Typewriter({ text, speed = 10, chunk = 2, skip = false, onDone, className }) {
    const [len, setLen] = useState(0);
    const doneRef = useRef(false);
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;

    useEffect(() => {
        setLen(0);
        doneRef.current = false;
    }, [text]);

    useEffect(() => {
        if (skip || len >= text.length) {
            if (!doneRef.current) {
                doneRef.current = true;
                if (onDoneRef.current) onDoneRef.current();
            }
            return undefined;
        }
        const t = setTimeout(() => setLen((l) => Math.min(text.length, l + chunk)), speed);
        return () => clearTimeout(t);
    }, [len, text, speed, chunk, skip]);

    const shown = skip ? text.length : len;
    return (
        <span className={className}>
            {text.slice(0, shown)}
            {shown < text.length && <span className="Cursor" />}
        </span>
    );
}
