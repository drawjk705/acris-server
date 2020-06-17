import React from 'react';
import { useField } from 'formik';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
    const [field, meta] = useField({ ...props });

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <input className={'text-input'} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    );
};
