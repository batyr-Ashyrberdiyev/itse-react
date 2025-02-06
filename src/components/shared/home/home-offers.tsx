import { FC, useCallback, useEffect, useState } from "react";
import { Container, EmblaDots, OfferCard } from "../";
import useEmblaCarousel from "embla-carousel-react";
import { useLangStore } from "@/store/lang";
import { offersData } from "@/data/home/home-offers.data";
import { useTranslate } from "@/hooks/use-translate";

export const HomeOffers: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const lang = useLangStore((state) => state.lang);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-surface_high py-10 relative overflow-hidden">
      <Container>
        <div ref={emblaRef} className="embla">
          <div className="mb-2 flex gap-6 embla__container">
            {offersData[useTranslate(lang)].data.map((item) => (
              <OfferCard
                className="embla__slide flex-[0_0_300px] sm:flex-[0_0_600px]"
                {...item}
                key={item.title}
              />
            ))}
          </div>

          <EmblaDots
            className="lg:hidden"
            scrollTo={scrollTo}
            active={activeIndex}
            slides={2}
          />
        </div>
      </Container>
    </section>
  );
};
