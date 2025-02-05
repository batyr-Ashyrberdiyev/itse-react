import { cn } from "@/lib/utils";
import { FC } from "react";
import { Container } from "../container";
import { ThemeCard } from "../theme-card";
import { homeTheme } from "@/data/home/home-theme.data";
import { useLangStore } from "@/store/lang";
import { useTranslate } from "@/hooks/use-translate";
import { aboutTheme } from "@/data/about/about-theme.data";

interface Props {
  className?: string;
}

export const AboutThemes: FC<Props> = ({ className }) => {
  const lang = useLangStore((state) => state.lang);

  return (
    <section
      className={cn("relative w-full bg-[#FDE8C4] -z-10 py-10", className)}
    >
      <img
        src="/about-bg.svg"
        alt=""
        className="absolute top-0 left-0 size-full object-cover"
      />

      <Container>
        <h3 className="h2 mb-4"> {aboutTheme[useTranslate(lang)].title}</h3>
        <p className="text-lg text-on_surface_v mb-6">
          {aboutTheme[useTranslate(lang)].subtitle}
        </p>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
          {homeTheme[useTranslate(lang)].data.map((item) => (
            <ThemeCard
              className="!bg-teritary_surface_container"
              key={item.title}
              {...item}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 mt-8 text-on_surface_v text-lg">
          <div className="md:w-1 w-4 md:h-[38px] h-40 bg-teritary_08" />
          <p className="text-18">{aboutTheme[useTranslate(lang)].bottomText}</p>
        </div>
      </Container>
    </section>
  );
};
