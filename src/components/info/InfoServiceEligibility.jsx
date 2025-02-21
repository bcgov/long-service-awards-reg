/*!
 * Info Panel: Service Years Eligibility
 * File: InfoServiceEligibility.js
 * Copyright(c) 2023 BC Gov
 * MIT Licensed
 */

import {Message} from "primereact/message";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Link } from "react-router-dom";
import { useState } from "react";

import { useFormContext } from "react-hook-form";


/**
 * Info Panel: Milestone
  * @returns {JSX.Element}
 */

export default function InfoServiceEligibility ({type, milestone}) {

    // determine award/service pin eligibility based on selected milestone
    const isEligible = type === 'lsa' ? milestone >= 25 : milestone >= 5;
    const altEligibile = type === 'lsa' ? milestone >= 5 && milestone < 25 : milestone >= 25;

    let message;

    if ( type === 'lsa' ) {

        message = <Message
            className={'w-full m-2'}
            severity="info"
            content={
                
                    <div>
                        You are eligible for a <Link to="/service-pins/self/milestone">Service Pin</Link>.
                        Long Service Award recipients must have 25+
                        years of service to be eligible.
                    </div>
                    
            }
        />
    }
    else {

        // LSA-505 Changed from Message to Dialog so that we can have it more prominent, and also hide if Pin registration is selected
        const [visible, setVisible] = useState(true);

        message = <Dialog header="Long Service Award eligibility" visible={visible} draggable={false} onHide={() => {setVisible(false);}}>
            
                <div>
                    You are eligible for a Long Service Award! Please choose one of the following options:
                    <br /><br />
                    <Link to="/lsa/milestone">
                        <Button 
                            
                            className="p-button"
                            >
                            Complete your LSA registration
                        </Button>
                    </Link>
                    
                    {/** LSA-505 adding this option so that registrants can opt-out of LSA registration **/}
                    <br /><br /> 
                    <Button 
                        className="p-button"
                        onClick={function() {
                            
                            setVisible(false);
                            return false;
                        }}
                        >
                        Continue with your Service Pin registration
                    </Button>
                </div>
            </Dialog>
    }


    return <>
        {isEligible && <Message
            className={'w-full m-2 font-bold'}
            severity="success"
            content={<span>Your Current Milestone: {milestone}</span>}
        />}
        {altEligibile && message}
    </>
}
