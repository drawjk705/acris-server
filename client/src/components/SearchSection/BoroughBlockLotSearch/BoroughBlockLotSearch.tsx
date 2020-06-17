import React from 'react';
import { Formik } from 'formik';
import Yup from 'yup';
import { Dropdown } from '../../formHelpers/Dropdown';

const validationSchema = Yup.object({
    borough: Yup.number().oneOf([1, 2, 3, 4, 5]),
});

export const BoroughBlockLotSearch: React.FC = () => (
    <Formik initialValues={{ a: '' }} onSubmit={() => {}}>
        <Dropdown label='boroughs' name='boroughs'>
            <option value=''>Select a borough</option>
        </Dropdown>
    </Formik>
);
