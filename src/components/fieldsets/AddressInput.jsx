import {useContext, useEffect, useState} from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import {matchers} from "@/services/validation.services.js";
import {Panel} from "primereact/panel";
import {OptionsContext} from "@/AppContext.js";
import {Dropdown} from "primereact/dropdown";
import {InputMask} from "primereact/inputmask";
import {BlockUI} from "primereact/blockui";
import {AutoComplete} from "primereact/autocomplete";

/**
 * Address Input reusable component. Conditional PO Box requirement for Victoria addresses.
 * @returns address line 1, address line 2, city/community, province/state, country, postal code, po box
 */

export default function AddressInput({id, label}) {
    const { control, setValue, getValues } = useFormContext();
    const { options } = useContext(OptionsContext);
    const [poboxRequired, setPoboxRequired] = useState(false);
    const [filteredCommunities, setFilteredCommunities] = useState([]);

    // get options
    const communities = options ? options.communities : [];
    const provinces = options ? options.provinces : [];

    // check for Victoria addresses to require post office box numbers
    const checkPobox = () => {
        setPoboxRequired(
            getValues(`${id}.province`) === 'British Columbia'
            && getValues(`${id}.community`) === 'Victoria'
        );
    }
    useEffect(checkPobox, [])

    return (
        <Panel className={'mb-3'} header={<>{label} Address</>}>
            <div className="container">
                <div className="grid">
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.street1`}>Street Address 1</label>
                        <Controller
                            name={`${id}.street1`}
                            control={control}
                            rules={{ required: "Street address is required." }}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <InputText
                                        id={field.name}
                                        value={field.value || ''}
                                        maxLength={256}
                                        aria-describedby={`${id}-street1-help`}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className={classNames({"p-invalid": error})}
                                        placeholder="123 W Street Rd"
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                    </div>
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.street2`}>Street Address 2</label>
                        <Controller
                            name={`${id}.street2`}
                            control={control}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <InputText
                                        id={field.name}
                                        value={field.value || ''}
                                        maxLength={256}
                                        aria-describedby={`${id}-street2-help`}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className={classNames({"p-invalid": error})}
                                        placeholder="Suite 123"
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                    </div>
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.community`}>City/Community</label>
                        <Controller
                            name={`${id}.community`}
                            control={control}
                            rules={{ required: "City or Community is required." }}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <AutoComplete
                                        id={field.name}
                                        value={field.value || ''}
                                        maxLength={256}
                                        onChange={(e) => {
                                            field.onChange(e.value);
                                            checkPobox();
                                        }}
                                        completeMethod={(e) => {
                                            setFilteredCommunities((communities || [])
                                                .filter(({name}) => {
                                                    return (name || '')
                                                        .toLowerCase()
                                                        .startsWith(e.query.toLowerCase());
                                                }).map(({name}) => {return name})
                                            )}
                                        }
                                        aria-describedby={`communities-help`}
                                        suggestions={filteredCommunities}
                                        className={classNames('w-full', {"p-invalid": error})}
                                        placeholder={`Enter/select your community or city`}
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                    </div>
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.province`}>Province</label>
                        <Controller
                            name={`${id}.province`}
                            control={control}
                            rules={{ required: "Province/State is required." }}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <Dropdown
                                        id={field.name}
                                        value={field.value || ''}
                                        filter
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            checkPobox()
                                        }}
                                        aria-describedby={`provinces-help`}
                                        options={provinces}
                                        optionLabel="name"
                                        optionValue="name"
                                        className={classNames({"p-invalid": error})}
                                        placeholder={`Select your province`}
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                    </div>
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.postal_code`}>Postal Code</label>
                        <Controller
                            name={`${id}.postal_code`}
                            control={control}
                            rules={{
                                required: "Postal code is required.",
                                pattern: {
                                    value: matchers.postal_code,
                                    message: "Invalid postal code.",
                                },
                            }}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <InputMask
                                        id={field.name}
                                        value={field.value || ''}
                                        mask="a9a 9a9"
                                        placeholder="V0E 0A3"
                                        onChange={(e) =>
                                            field.onChange(e.target.value)}
                                        onBlur={()=>{
                                            console.log(String(field.value).toUpperCase())
                                            setValue(`${id}.postal_code`, String(field.value).toUpperCase())}
                                        }
                                        aria-describedby={`postal-code-help`}
                                        className={classNames({"p-invalid": error})}
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                    </div>
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.country`}>Country</label>
                        <Controller
                            defaultValue={'Canada'}
                            name={`${id}.country`}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <BlockUI blocked={true}>
                                        <InputText className={'w-full'} id={field.name} value={'Canada'} />
                                    </BlockUI>
                                </>
                            )}
                        />
                    </div>
                    <div className={'col-12 form-field-container'}>
                        <label htmlFor={`${id}.pobox`}>P.O. Box</label>
                        <Controller
                            name={`${id}.pobox`}
                            control={control}
                            rules={{required: poboxRequired,}}
                            render={({ field, fieldState: {invalid, error} }) => (
                                <>
                                    <InputText
                                        id={field.name}
                                        value={field.value || ''}
                                        maxLength={10}
                                        aria-describedby={`${id}.-pobox-help`}
                                        className={classNames({"p-invalid": error,})}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={'P.O. Box number'}
                                    />
                                    { invalid && <p className="error">{error.message}</p> }
                                </>
                            )}
                        />
                        {
                            poboxRequired && <small className="error">
                                Note that P.O. Box is required for Victoria addresses. Please use the BC
                                Government <a target="_blank" href="https://govposearch.pss.gov.bc.ca/">
                                P.O. Box Lookup tool</a> for assistance.
                            </small>
                        }
                    </div>
                </div>
            </div>
        </Panel>
    );
}
