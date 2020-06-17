import React from 'react';
import { InputProps } from './types';
import { useField } from 'formik';

export const Dropdown: React.FC<Omit<InputProps, 'type' | 'placeholder'>> = ({
    label,
    ...props
}) => {
    const [field, meta] = useField(props);
    return (
        <>
            {label && <label htmlFor={props.name}>{label}</label>}
            <select {...field} {...props} />
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </>
    );
};
