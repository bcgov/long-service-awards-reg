import { useRouteError } from "react-router-dom";
import PageHeader from "../components/common/PageHeader.jsx";
import {Panel} from "primereact/panel";

export default function Error() {

  const error = useRouteError();
  console.error(error);

  return (
      <div className="container">
        <div className="content">
            <PageHeader
                title="Long Service Awards and Service Pins"
                subtitle={'Oops!'}
            />
            <Panel header={<><i className={'pi pi-exclamation-triangle'} /> An unexpected error has occurred</>}>
              <div className={'grid'}>
                <div className={'col-3 font-bold'}>
                  Error Message:
                </div>
                <div className={'col-9 error'}>
                  <i>{error.statusText || error.message}</i>
                </div>
              </div>
              <p>
                Please return to your previous page, or return to Long Service Awards
                Homepage by following the link below:
              </p>
              <a href="/">Long Service Awards Home</a>
              <p>If you continue to experience this error, please contact support.</p>
            </Panel>
          </div>
        </div>
  );
}
