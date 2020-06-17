import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from '../../formHelpers/Input';

type SearchBarProps = {
    address?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ address }) => (
    <Formik initialValues={{ address }} onSubmit={() => {}}>
        <Form>
            <Input
                label={'Address'}
                type={'string'}
                placeholder={'Search any address in New York!'}
                name={'address'}
            />
        </Form>
    </Formik>
);
