import React from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { useClickToEditElement } from "../use-click-to-edit";

interface LocalProps {
  id: string;
  value?: string;
  defaultValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const ClickToEditTableInput = ({
  id,
  value,
  defaultValue,
  onInputChange,
  onBlur,
}: LocalProps) => {
  const {
    disabled,
    showToolTip,
    setShowToolTip,
    enable,
    blur,
    tooltipText,
    elementRef,
    tooltipRef,
  } = useClickToEditElement<HTMLInputElement>(id, onInputChange, onBlur);

  return (
    <td
      onClick={() => {
        enable();
      }}
    >
      <span
        onMouseOver={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        <input
          id={id}
          ref={elementRef}
          disabled={disabled}
          onBlur={blur}
          value={value}
          defaultValue={defaultValue}
        />
      </span>
      <span ref={tooltipRef} />
      <Overlay target={tooltipRef.current} show={showToolTip} placement="right">
        {(props) => (
          <Tooltip id={`${id}-tt`} {...props}>
            {tooltipText}
          </Tooltip>
        )}
      </Overlay>
    </td>
  );
};
export default ClickToEditTableInput;
