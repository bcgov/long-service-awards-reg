import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";
import classNames from "classnames";

/**
 * display container for form and information components
 * @param {object} props
 * @param {boolean} props.toggleable state variable boolean for controling toggleable functionality
 * @param {boolean} props.collapsed state variable boolean for controlling initial collapsed status
 * @param {boolean} props.fullwidth state variable boolean for controlling styling of header to take up full space
 * @param {JSX.Element} props.header the title that should be placed in the header of the panel
 * @param {string} props.children the content that should be placed in the body of the panel
 * @returns
 */

export default function AppPanel(props) {
  const template = (options) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down"
      : "pi pi-chevron-up";
    const className = `${options.className}`;
    const panelClass = classNames("justify-content-start", className, {
      "p-panel-header-full": props.fullwidth,
    });
    const titleClassName = `${options.titleClassName} pl-1`;

    return (
      <div className={panelClass}>
        {props.toggleable && (
          <button
            className={options.togglerClassName}
            onClick={options.onTogglerClick}
          >
            <span className={toggleIcon}></span>
            <Ripple />
          </button>
        )}
        <span className={titleClassName}>{props.header}</span>
      </div>
    );
  };

  return (
    <Panel
      headerTemplate={template}
      toggleable={props.toggleable}
      collapsed={props.collapsed}
    >
      {props.children}
    </Panel>
  );
}
