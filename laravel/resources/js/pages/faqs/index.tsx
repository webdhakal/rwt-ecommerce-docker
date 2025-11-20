import { useFaqs } from '@/api/hooks/useFaqs';
import LoadingScreen from '@/components/LoadingScreen';
import GuestLayout from '@/layouts/guest-layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/ui/accordion';
import { Card } from '@/shadcn/ui/card';
import { HelpCircle } from 'lucide-react';

export default function App() {
    const { data, isLoading } = useFaqs();

    if (isLoading) return <LoadingScreen text="Loading FAQs..." className="min-h-screen" />;

    const faqs = data?.payload?.data || [];

    return (
        <GuestLayout>
            <div className="flex items-center justify-center bg-background p-4 font-sans text-foreground">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="space-y-4 py-12 text-center">
                        <div className="flex justify-center text-primary">
                            <HelpCircle className="h-12 w-12 stroke-[1.5px]" />
                        </div>
                        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
                            Frequently Asked Questions
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                            Your one-stop destination for answers to our most common queries.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.length > 0 ? (
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqs.map((faq) => (
                                    <AccordionItem key={faq.id} value={faq.id}>
                                        <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                                        <AccordionContent className="text-base text-gray-600">{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <Card className="p-12 text-center text-muted-foreground">
                                <p>No FAQs available at the moment. Please check back later!</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
