import { clsx } from 'clsx';
import React from 'react';

type InputErrorProps = React.InputHTMLAttributes<HTMLInputElement> & {
    message?: string;
};

export default function InputError({ message = '', className }: InputErrorProps) {
    return message && <p className={clsx(className, 'text-sm text-red-600')}>{message}</p>;
}
