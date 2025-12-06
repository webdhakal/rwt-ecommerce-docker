import { cn } from '@/shadcn/lib/utils';
import { Check, Minus } from 'lucide-react';
import React from 'react';

type CheckboxSize = 'sm' | 'default' | 'lg';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    className?: string;
    id?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    label?: React.ReactNode;
    description?: string;
    error?: string;
    size?: CheckboxSize;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        { className, id, checked, indeterminate = false, disabled = false, required = false, label, description, error, size = 'default', ...props },
        ref,
    ) => {
        const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

        const sizeClasses = {
            sm: 'h-4 w-4',
            default: 'h-4 w-4',
            lg: 'h-5 w-5',
        };

        return (
            <div className={cn('flex items-start space-x-2', className)}>
                <label htmlFor={checkboxId} className={cn('flex cursor-pointer items-center space-x-2', disabled && 'cursor-not-allowed opacity-50')}>
                    <input
                        type="checkbox"
                        ref={ref}
                        id={checkboxId}
                        checked={checked}
                        disabled={disabled}
                        required={required}
                        className="sr-only"
                        {...props}
                    />
                    <span
                        className={cn(
                            'flex items-center justify-center rounded-sm border transition-colors',
                            sizeClasses[size],
                            checked || indeterminate ? 'border-primary bg-primary text-primary-foreground' : 'border-primary',
                            error && 'border-destructive',
                        )}
                    >
                        {checked && !indeterminate && <Check className="h-3 w-3" />}
                        {indeterminate && <Minus className="h-3 w-3" />}
                    </span>
                    {label && (
                        <span className={cn('text-sm font-medium', error ? 'text-destructive' : 'text-foreground')}>
                            {label} {required && <span className="text-destructive">*</span>}
                        </span>
                    )}
                </label>
                {description && !error && <p className="text-sm text-muted-foreground">{description}</p>}
                {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
        );
    },
);

Checkbox.displayName = 'Checkbox';

// Checkbox Group component
interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    label?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
    ({ className, children, label, description, orientation = 'vertical', error, disabled = false, ...props }, ref) => {
        return (
            <fieldset ref={ref} disabled={disabled} className={cn('space-y-3', className)} {...props}>
                {label && (
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium">{label}</h3>
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    </div>
                )}
                <div className={cn('space-y-2', orientation === 'horizontal' && 'flex flex-wrap gap-4')}>{children}</div>
                {error && <p className="text-sm text-destructive">{error}</p>}
            </fieldset>
        );
    },
);

CheckboxGroup.displayName = 'CheckboxGroup';

export { Checkbox, CheckboxGroup };
export type { CheckboxGroupProps, CheckboxProps, CheckboxSize };
