import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ReactDatePicker } from "react-datepicker";

export function useClickToEditElement<T extends ReactDatePicker | HTMLInputElement>(
    id: string,
    onchange?: (date: any) => void,
    onBlur?: (e:  React.FocusEvent<HTMLInputElement>) => void
) {
    const [disabled, setDisabled] = useState(true);
    const [showToolTip, setShowToolTip] = useState(false);
    const elementRef = useRef<T>(null);
    const tooltipRef = useRef<HTMLSpanElement>(null);

    const enable = useCallback(() => {
        if (disabled) {
            setDisabled(false);
        }
    }, [disabled])
    
    const disable = useCallback(() => {
        if (!disabled) {
            setDisabled(true);
        }
    }, [disabled]);

    const blur = useCallback((e:  React.FocusEvent<HTMLInputElement>) => {
        setDisabled(true);
        onBlur?.(e);
    }, [onBlur, disabled]);

    const onChange = (value: any) => {
        if (onchange) {
            onchange(value);
            if ((elementRef.current as any)?.setBlur)
                (elementRef.current as ReactDatePicker)?.setBlur();
            else
                (elementRef.current as HTMLInputElement)?.blur();
        }
    };

    const onPageClick = (e: MouseEvent) =>  {
        e.stopImmediatePropagation();
        const elementId = (e.target as any)?.id;
        if (!disabled && (elementId !== id)) {
            if ((elementRef.current as any)?.setBlur)
                (elementRef.current as ReactDatePicker)?.setBlur();
            else
                (elementRef.current as HTMLInputElement)?.blur();
        }
    };

    const onEnterPressed = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !disabled) {
            e.preventDefault();
            if ((elementRef.current as any)?.setBlur)
                (elementRef.current as ReactDatePicker)?.setBlur();
            else
                (elementRef.current as HTMLInputElement)?.blur();
        }
    }

    const tooltipText = useMemo(() => (
        disabled ? "Click to Edit" : "Press Enter to Save"
    ), [disabled]);

    useEffect(() => {
        if (!disabled) {
            if ((elementRef.current as any)?.setFocus)
                (elementRef.current as ReactDatePicker)?.setFocus();
            else
                (elementRef.current as HTMLInputElement)?.focus();
        } 
    }, [disabled]);

    useEffect(() => {
        window.addEventListener("click", onPageClick);
        window.addEventListener("keydown", onEnterPressed);
        return () => {
            window.removeEventListener("click", onPageClick);
            window.removeEventListener("keydown", onEnterPressed);
        }
    }, [disabled]);
    
    return { disabled, showToolTip, setShowToolTip, enable, disable, blur, onChange, tooltipText, elementRef, tooltipRef }
}