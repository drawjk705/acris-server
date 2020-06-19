import { Borough } from '../reducers/constants';
import {
    submitQuery,
    ClauseSeparator,
    ClauseRelationship,
    createClause,
} from './utils';
import { RESOURCES } from './constants';
import {
    TAddress,
    ViolationCurrentStatus,
    ViolationStatus,
} from '../reducers/types';

const propertyTypeCache: { [key: string]: string } = {};

type BoroughBlockLotProps = {
    borough: Borough;
    block: number;
    lot: number;
};

type BbleProps = {
    bble: string;
};

type getPropertyProps = {
    streetNumber: string;
    streetName: string;
} & BoroughBlockLotProps;

export const Property = {
    getProperty: ({
        streetNumber,
        streetName,
        borough,
        block,
        lot,
    }: getPropertyProps) => {
        const query = createClause()
            .addSubclause({
                street_number: streetNumber,
            })
            .addSubclause({ street_name: streetName })
            .addSubclause({ borough })
            .addSubclause({ block })
            .addSubclause({ lot })
            .stringifyClauses();

        return submitQuery(RESOURCES.RealPropertyLegals, {
            where: query,
        });
    },

    getPropertyTypeData: async ({ propertyType }: { propertyType: string }) => {
        if (propertyTypeCache[propertyType]) {
            return propertyTypeCache[propertyType];
        }
        const query = createClause()
            .addSubclause({
                property_type: propertyType,
            })
            .stringifyClauses();

        const result = await submitQuery(RESOURCES.PropertyTypeCodes, {
            where: query,
        });

        if (!result.length) {
            return {};
        }
        propertyTypeCache[propertyType] = result[0];
        return result[0];
    },
};

export type getPartiesProps = {
    documentId: string;
    name: string;
    address: Partial<TAddress>;
};
export const Party = {
    getParties: async ({
        documentId,
        name,
        address: { addressLineOne, addressLineTwo, city, state, zipCode } = {},
    }: Partial<getPartiesProps>) => {
        const query = createClause()
            .addSubclause({ name })
            .addSubclause({ address_1: addressLineOne })
            .addSubclause({ address_2: addressLineTwo })
            .addSubclause({ city })
            .addSubclause({ state })
            .addSubclause({ zip: zipCode })
            .addSubclause({ document_id: documentId })
            .stringifyClauses();

        return submitQuery(RESOURCES.RealPropertyParties, {
            where: query,
        });
    },
};

type getHousingMaintenanceCodeViolationsProps = {
    orderNumber: string;
    inspectionDateBefore: Date | undefined;
    inspectionDateAfter: Date | undefined;
    currentStatus: ViolationCurrentStatus;
    violationStatus: ViolationStatus;
    apartment: string;
    story: string;
} & BoroughBlockLotProps;
export const HousingMaintenanceCodeViolation = {
    getHousingMaintenanceCodeViolations: async ({
        borough,
        block,
        lot,
        orderNumber,
        inspectionDateBefore,
        inspectionDateAfter,
        currentStatus,
        violationStatus,
        apartment,
        story,
    }: Partial<getHousingMaintenanceCodeViolationsProps>) => {
        const query = createClause()
            .addSubclause({
                boroid: borough,
            })
            .addSubclause({ block })
            .addSubclause({ lot })
            .addSubclause({ ordernumber: orderNumber })
            .addSubclause({ currentstatus: currentStatus })
            .addSubclause({
                violationstatus: violationStatus,
            })
            .addSubclause({ apartment })
            .addSubclause({ story })
            .addSubclause(
                { inspectiondate: inspectionDateBefore },
                ClauseRelationship.LESS_THAN
            )
            .addSubclause(
                {
                    inspectiondate: inspectionDateAfter,
                },
                ClauseRelationship.GREATER_THAN
            )
            .stringifyClauses();

        return submitQuery(RESOURCES.HousingMaintenanceCodeViolation, {
            where: query,
        });
    },
};

export const Document = {
    getDocumentById: async (id: string) => {
        const query = createClause()
            .addSubclause({ document_id: id })
            .stringifyClauses();

        return submitQuery(RESOURCES.RealPropertyMaster, {
            where: query,
        });
    },
};

export const HpdJurisdictionData = {
    getHpdJurisdictionData: async ({
        borough,
        block,
        lot,
    }: Partial<BoroughBlockLotProps>) => {
        const query = createClause()
            .addSubclause({
                boroid: borough,
            })
            .addSubclause({ block })
            .addSubclause({ lot })
            .stringifyClauses();

        return submitQuery(RESOURCES.BuildingsSubjectToHpdJurisdiction, {
            where: query,
        });
    },
};

type getRegistrationContactsProps = {
    registrationId: number;
};
export const RegistrationContacts = {
    getRegistrationContacts: async ({
        registrationId,
    }: getRegistrationContactsProps) => {
        const query = createClause()
            .addSubclause({ registrationid: registrationId })
            .stringifyClauses();

        return submitQuery(RESOURCES.RegistrationContacts, { where: query });
    },
};

export const ValuationAndAssessmentData = {
    getValuationAndAssessmentData: async ({
        bble,
        borough,
        block,
        lot,
    }: BbleProps & BoroughBlockLotProps) => {
        const bbleSubclause = createClause()
            .addSubclause({ bble })
            .stringifyClauses();

        const boroughBlockLotSubclause = createClause()
            .addSubclause({ boro: borough })
            .addSubclause({ block })
            .addSubclause({ lot })
            .stringifyClauses();

        const query = createClause([
            bbleSubclause,
            boroughBlockLotSubclause,
        ]).stringifyClauses({
            separator: ClauseSeparator.OR,
            withParentheses: true,
        });

        return submitQuery(RESOURCES.PropertyValuationAndAssessmentData, {
            where: query,
        });
    },
};

export const TaxClassData = {
    getTaxClassData: ({ borough, block, lot }: BoroughBlockLotProps) => {
        const query = createClause()
            .addSubclause({ boro: borough })
            .addSubclause({ block })
            .addSubclause({ lot })
            .stringifyClauses();

        return submitQuery(RESOURCES.PropertyTaxClassData, { where: query });
    },
};
