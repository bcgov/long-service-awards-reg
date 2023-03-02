/*!
 * Button Wrapper component
 * File: AppButton.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import { Button } from "primereact/button";
import classNames from "classnames";
import "@/styles/AppButton.css";

/**
 * common button component with custom styling
 * @param {object} props
 * @returns
 */

export default function AppButton(props) {
  const buttonClass = classNames(
      "p-button-raised m-1",
      props.passClass,
      { "p-button-secondary": props.secondary },
      { "p-button-info": props.info },
      { "p-button-danger": props.danger },
      { "p-button-success": props.success },
      { "p-button-help": props.help },
  );

  const iconPos = props.iconPosition ? props.iconPosition : "right";
  const icons = props.icon ? props.icon : "null";

  return (
      <Button
          className={buttonClass}
          onClick={props.onClick}
          disabled={props.disabled}
          label={props.children}
          icon={icons}
          iconPos={iconPos}
          tooltip={props.tooltip}
          tooltipOptions={props.tooltipOptions}
      ></Button>
  );
}
