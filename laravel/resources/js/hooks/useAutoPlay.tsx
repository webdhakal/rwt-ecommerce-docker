import { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect, useState } from 'react';

type UseAutoplayType = {
    autoplayIsPlaying: boolean;
    startAutoPlay: () => void;
    stopAutoPlay: () => void;
    onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (emblaApi: EmblaCarouselType | undefined): UseAutoplayType => {
    const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

    const onAutoplayButtonClick = useCallback(
        (callback: () => void) => {
            const autoplay = emblaApi?.plugins()?.autoplay;
            if (!autoplay) return;

            const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

            resetOrStop();
            callback();
        },
        [emblaApi],
    );

    const startAutoPlay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;
        autoplay.play();
    }, [emblaApi]);

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        setAutoplayIsPlaying(autoplay.isPlaying());
        emblaApi
            .on('autoplay:play', () => setAutoplayIsPlaying(true))
            .on('autoplay:stop', () => setAutoplayIsPlaying(false))
            .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()));
    }, [emblaApi]);

    const stopAutoPlay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;
        autoplay.stop();
    }, [emblaApi]);

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        setAutoplayIsPlaying(autoplay.isPlaying());
        emblaApi
            .on('autoplay:play', () => setAutoplayIsPlaying(true))
            .on('autoplay:stop', () => setAutoplayIsPlaying(false))
            .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()));
    }, [emblaApi]);

    return {
        autoplayIsPlaying,
        startAutoPlay,
        stopAutoPlay,
        onAutoplayButtonClick,
    };
};
