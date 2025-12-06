import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shadcn/lib/utils';

interface CustomAccordianTrigger extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    showDropDown?: boolean;
    noIcons?: boolean;
}

const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, CustomAccordianTrigger>(
    ({ className, children, showDropDown = false, noIcons = false, ...props }, ref) => (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    'group flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline',
                    className,
                )}
                {...props}
            >
                {children}
                {showDropDown ? (
                    <>
                        {!noIcons && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />}
                        {!noIcons && <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden" />}
                    </>
                ) : (
                    <>
                        {!noIcons && <Plus className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />}
                        {!noIcons && <Minus className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden" />}
                    </>
                )}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
        {...props}
    >
        <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
