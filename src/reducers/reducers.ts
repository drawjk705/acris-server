import { BOROUGHS_BY_ID } from './constants';
import {
    TProperty,
    TPropertyType,
    TParty,
    THousingMaintenanceCodeViolation,
    TDocument,
    THpdJurisdictionData,
    TRegistrationContact,
    TValuationAndAssessmentData,
    TTaxClassData,
} from './types';

const getBble = ({
    borough,
    block,
    lot,
}: {
    borough: number;
    block: number;
    lot: number;
}) => {
    const blockString = `00000${block}`;
    const lotString = `0000${lot}`;
    return `${borough}${blockString.slice(
        blockString.length - 5
    )}${lotString.slice(lotString.length - 4)}`;
};

export const Reducers = {
    reduceProperty: (propertyObj: any = {}): TProperty => {
        return {
            bble: getBble(propertyObj),
            borough: BOROUGHS_BY_ID[propertyObj.borough as number],
            block: Number.parseInt(propertyObj.block),
            lot: Number.parseInt(propertyObj.lot),
            streetNumber: propertyObj.street_number,
            streetName: propertyObj.street_name,
            unit: propertyObj.unit,
            propertyType: propertyObj.property_type,
            documentId: propertyObj.document_id,
        };
    },

    reducePropertyType: (propertyTypeObj: any = {}): TPropertyType => ({
        recordType: propertyTypeObj.record_type,
        propertyType: propertyTypeObj.property_type,
        description: propertyTypeObj.description,
    }),

    reduceParty: (partyObj: any = {}): TParty => ({
        documentId: partyObj.document_id,
        name: partyObj.name,
        address: {
            addressLineOne: partyObj.address_1,
            addressLineTwo: partyObj.address_2,
            city: partyObj.city,
            state: partyObj.state,
            zipCode: partyObj.zip,
        },
    }),

    reduceHousingMaintenanceCodeViolation: (
        violationObj: any = {}
    ): THousingMaintenanceCodeViolation => ({
        apartment: violationObj.apartment,
        story: violationObj.story,
        inspectionDate: violationObj.inspectiondate,
        originalCertifyByDate: violationObj.originalcertifybydate,
        originalCorrectByDate: violationObj.originalcorrectbydate,
        orderNumber: violationObj.ordernumber,
        novDescription: violationObj.novdescription,
        novIssuedDate: violationObj.novissueddate,
        currentStatus: violationObj.currentstatus,
        communityBoard: violationObj.communityboard,
        newCertifyByDate: violationObj.newcertifybydate,
        newCorrectByDate: violationObj.newcorrectbydate,
        violationStatus: violationObj.violationstatus,
    }),

    reduceDocument: (documentObj: any = {}): TDocument => ({
        id: documentObj.document_id,
        crfn: documentObj.crfn,
        type: documentObj.doc_type,
        date: documentObj.document_date,
        amount: documentObj.document_amt,
    }),

    reduceHpdJurisdictionData: (
        jurisdictionDataObj: any = {}
    ): THpdJurisdictionData => ({
        registrationId: Number.parseInt(jurisdictionDataObj.registrationid),
        buildingId: Number.parseInt(jurisdictionDataObj.buildingid),
        communityBoardId: Number.parseInt(jurisdictionDataObj.communityboard),
        managementProgram: jurisdictionDataObj.managementprogram,
        numberOfLegalStories: Number.parseInt(jurisdictionDataObj.legalstories),
        numberOfApartments: Number.parseInt(jurisdictionDataObj.legalclassa),
        numberOfRooms: Number.parseInt(jurisdictionDataObj.legalclassb),
        lifecycleStage: jurisdictionDataObj.lifecycle,
        recordStatusId: Number.parseInt(jurisdictionDataObj.recordstatusid),
        recordStatus: jurisdictionDataObj.recordstatus,
    }),

    reduceRegistrationContact: (
        contactObj: any = {}
    ): TRegistrationContact => ({
        type: contactObj.type,
        contactDescription: contactObj.contactdescription,
        corporationName: contactObj.corporationname,
        title: contactObj.title,
        firstName: contactObj.firstname,
        middleInitial: contactObj.middleinitial,
        lastName: contactObj.lastname,
        businessAddress: {
            addressLineOne: `${contactObj.businesshousenumber} ${contactObj.businessstreetname}`,
            addressLineTwo: contactObj.businessapartment
                ? `Apartment ${contactObj.businessapartment}`
                : '',
            city: contactObj.businesscity,
            state: contactObj.businessstate,
            zipCode: contactObj.businesszip,
        },
    }),

    reduceValuationAndAssessmentData: (
        valuationAndAssessmentDataObj: any = {}
    ): TValuationAndAssessmentData => ({
        numberOfStories: Number(valuationAndAssessmentDataObj.stories),
        marketValue: Number.parseInt(valuationAndAssessmentDataObj.fullval),
        actualLandValue: Number.parseInt(valuationAndAssessmentDataObj.avland),
        actualTotalValue: Number.parseInt(valuationAndAssessmentDataObj.avtot),
        actualExemptLandValue: Number.parseInt(
            valuationAndAssessmentDataObj.exland
        ),
        actualExemptLandTotal: Number.parseInt(
            valuationAndAssessmentDataObj.extot
        ),
        exceptionCodeOne: Number.parseInt(valuationAndAssessmentDataObj.excd1),
        transitionalLandValue: Number.parseInt(
            valuationAndAssessmentDataObj.avland2
        ),
        transitionalTotalValue: Number.parseInt(
            valuationAndAssessmentDataObj.avtot2
        ),
        transitionalExemptionLandValue: Number.parseInt(
            valuationAndAssessmentDataObj.exland2
        ),
        transitionalExemptionLandTotal: Number.parseInt(
            valuationAndAssessmentDataObj.extot2
        ),
        assessmentYear: valuationAndAssessmentDataObj.year,
    }),

    reduceTaxClassData: (taxClassDataObj: any): TTaxClassData => ({
        assessmentAndExemptionValuations: {
            market: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.pymktland),
                    totalValue: Number.parseInt(taxClassDataObj.pymkttot),
                },
            },
            actual: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.pyactland),
                    totalValue: Number.parseInt(taxClassDataObj.pyacttot),
                },
                exemption: {
                    landValue: Number.parseInt(taxClassDataObj.pyactextot),
                },
            },
            transitional: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.pytrnland),
                    totalValue: Number.parseInt(taxClassDataObj.pytrntot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.pytrnextot),
                },
            },
            taxable: {
                assessment: {
                    totalValue: Number.parseInt(taxClassDataObj.pytxbtot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.pytxbextot),
                },
            },
            tentativeMarket: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.tenmktland),
                    totalValue: Number.parseInt(taxClassDataObj.tenmkttot),
                },
            },
            tentativeActual: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.tenactland),
                    totalValue: Number.parseInt(taxClassDataObj.tenacttot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.tenactextot),
                },
            },
            tentativeTransitional: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.tentrnland),
                    totalValue: Number.parseInt(taxClassDataObj.tentrntot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.tentrnextot),
                },
            },
            tentativeTaxable: {
                assessment: {
                    totalValue: Number.parseInt(taxClassDataObj.tentxbtot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.tentxbextot),
                },
            },
            changeByNoticeMarket: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.cbnmktland),
                    totalValue: Number.parseInt(taxClassDataObj.cbnmkttot),
                },
            },
            changeByNoticeActual: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.cbnactland),
                    totalValue: Number.parseInt(taxClassDataObj.cbnacttot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.cbnactextot),
                },
            },
            changeByNoticeTransitional: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.cbntrntland),
                    totalValue: Number.parseInt(taxClassDataObj.cbntrntot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.cbntrnextot),
                },
            },
            changeByNoticeTaxable: {
                assessment: {
                    totalValue: Number.parseInt(taxClassDataObj.cbntxbtot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.cbntxbextot),
                },
            },
            finalMarket: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.finmktland),
                    totalValue: Number.parseInt(taxClassDataObj.finmkttot),
                },
            },
            finalActual: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.finactland),
                    totalValue: Number.parseInt(taxClassDataObj.finacttot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.finactextot),
                },
            },
            finalTransitional: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.fintrnland),
                    totalValue: Number.parseInt(taxClassDataObj.fintrntot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.fintrnextot),
                },
            },
            finalTaxable: {
                assessment: { totalValue: taxClassDataObj.fintxbtot },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.fintxbextot),
                },
            },
            currentMarket: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.curmktland),
                    totalValue: Number.parseInt(taxClassDataObj.curmkttot),
                },
            },
            currentActual: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.curactland),
                    totalValue: Number.parseInt(taxClassDataObj.curacttot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.curactextot),
                },
            },
            currentTransitional: {
                assessment: {
                    landValue: Number.parseInt(taxClassDataObj.curtrnland),
                    totalValue: Number.parseInt(taxClassDataObj.curtrntot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.curtrnextot),
                },
            },
            currentTaxable: {
                assessment: {
                    totalValue: Number.parseInt(taxClassDataObj.curtxbtot),
                },
                exemption: {
                    totalValue: Number.parseInt(taxClassDataObj.curtxbextot),
                },
            },
        },
        zoningCode: taxClassDataObj.zoning,
        dimensions: {
            lotFrontageFeet: Number.parseInt(taxClassDataObj.lot_frt),
            lotDepthFeet: Number.parseInt(taxClassDataObj.lot_dep),
            buildingFrontageFeet: Number.parseInt(taxClassDataObj.bld_frt),
            buildingDepth: Number.parseInt(taxClassDataObj.bld_dep),
            totalLandArea: Number.parseInt(taxClassDataObj.land_area),
            grossSquarefootage: Number.parseInt(taxClassDataObj.gross_sqft),
            hotelAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.hotel_area_gross
            ),
            officeAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.office_area_gross
            ),
            residentialAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.residential_area_gross
            ),
            retailAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.retail_area_gross
            ),
            loftAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.loft_area_gross
            ),
            factoryAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.factory_area_gross
            ),
            warehouseAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.warehouse_area_gross
            ),
            storageAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.storage_area_gross
            ),
            garageAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.garage_area
            ),
            otherAreaGrossSquarefootage: Number.parseInt(
                taxClassDataObj.other_area_gross
            ),
        },
        hasExtension: taxClassDataObj.extension === 'Y',
        storyCount: Number.parseInt(taxClassDataObj.bld_story),
        unitCount: Number.parseInt(taxClassDataObj.units),
        coopApartmentCount: Number.parseInt(taxClassDataObj.coop_apt),
        coopIdNumber: Number.parseInt(taxClassDataObj.coop_num),
        buildingConstructionYear: taxClassDataObj.trbuilt,
    }),
};
