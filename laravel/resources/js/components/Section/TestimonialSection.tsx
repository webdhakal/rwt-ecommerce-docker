import { useAutoplay } from '@/hooks/useAutoPlay';
import { randomImage } from '@/Libs/Helper';
import { cn } from '@/shadcn/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card';
import DefaultSectionTitle from '@/utils/DefaultSectionTitle';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import { AnimatedSection } from '../AnimatedSection';

const testimonialData = [
    {
        src: randomImage(0),
        name: 'Issabel Oliver',
        position: 'Team Leader',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam delectus ab id animi dolorum debitis pariatur est aperiam recusandae quidem!',
    },
    {
        src: randomImage(1),
        name: 'Stephan Smith',
        position: 'Team Leader',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam delectus ab id animi dolorum debitis pariatur est aperiam recusandae quidem!',
    },
    {
        src: randomImage(2),
        name: 'Nikki Albart',
        position: 'Team Leader',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam delectus ab id animi dolorum debitis pariatur est aperiam recusandae quidem!',
    },
];

const TestimonialBackground = () => {
    return (
        <>
            <div className="testimonial-bg-images top-[100px] left-[10px] size-12 -rotate-12 bg-red-500 sm:size-16">
                <img src={randomImage(32)} />
            </div>
            <div className="testimonial-bg-images bottom-[100px] left-[20px] size-12 rotate-12 bg-blue-500 blur-sm sm:size-16">
                <img src={randomImage(64)} />
            </div>
            <div className="testimonial-bg-images top-[80px] left-1/2 size-12 -rotate-[24deg] bg-teal-500 sm:size-16">
                <img src={randomImage(128)} />
            </div>
            <div className="testimonial-bg-images top-1/3 right-[50px] size-12 rotate-12 bg-cyan-500 blur-sm sm:right-[350px] sm:size-16">
                <img src={randomImage(256)} />
            </div>
            <div className="testimonial-bg-images top-1/3 right-[20px] size-12 bg-emerald-500 blur-sm sm:right-[50px] sm:size-16">
                <img src={randomImage(512)} />
            </div>
            <div className="testimonial-bg-images right-[10px] bottom-[100px] size-12 -rotate-[24deg] bg-purple-500 sm:right-[50px] sm:bottom-[150px] sm:size-16">
                <img src={randomImage(1024)} />
            </div>
        </>
    );
};

const TestimonialCard = ({ item }: { item: { src: string; name: string; position: string; description: string } }) => {
    const { src, name, position, description } = item;
    return (
        <Card className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-4 border-none bg-transparent p-4 shadow-none sm:flex-row md:items-start lg:items-center">
            <img src={src} alt={name} className="aspect-square size-24 rounded-xl lg:size-[300px]" />
            <div className="flex-1 text-center sm:text-left">
                <CardHeader className="p-0">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <CardDescription className="font-secondary text-sm text-gray-600">({position})</CardDescription>
                </CardHeader>
                <CardContent className="mt-2 rounded-xl border bg-white p-5 text-sm dark:bg-transparent">
                    <p className="font-secondary leading-relaxed text-muted-foreground">{description}</p>
                </CardContent>
            </div>
        </Card>
    );
};

const TestimonialSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ playOnInit: false, delay: 4000 })]);
    const { stopAutoPlay, startAutoPlay } = useAutoplay(emblaApi);
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {};
        startAutoPlay();
        emblaApi.on('select', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    return (
        <AnimatedSection
            className={cn('container my-4')}
            style={{ animationDelay: '150ms' }}
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
        >
            <DefaultSectionTitle title="Testimonial" subtitle="Some reviews from our vendors/customers" showButton={false} />

            <div className="relative flex min-h-[400px] flex-col justify-center rounded-md bg-white sm:min-h-[500px] dark:bg-transparent">
                <TestimonialBackground />
                <div className="embla w-full overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex gap-4">
                        {testimonialData.map((item, index) => (
                            <div className="embla__slide mx-2 flex-[0_0_100%]" key={index}>
                                <TestimonialCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default TestimonialSection;
