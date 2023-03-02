import { useNavigate } from "react-router-dom";

/**
 * Default page blurb when an individual who is not eligible for LSA attempts to access an LSA only form option
 */

export default function LSAIneligible() {
  const navigate = useNavigate();
  return (
    <>
      <div className="self-registration lsa-ineligible">
        <AppPanel header={`Long Service Awards - Not Eligible`}>
          <div>
            Based on the information you have provided, you are not eligible for
            access to this page.
            <br /> Please return to your current registration.
          </div>
          <div>
            <AppButton
              onClick={() => {
                navigate("/", {
                  replace: true,
                });
              }}
            >
              Home
            </AppButton>
          </div>
          <div>
            If you believe you are seeing this message in error, please contact
            support.
          </div>
        </AppPanel>
      </div>
    </>
  );
}
