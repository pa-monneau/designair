import type { ElementType } from "react";
import { Avatar, RatingStars } from "@recordair/ui-core";
import { RecordairLogo } from "./RecordairLogo";

type AuthTestimonial = {
  quote: string;
  author: string;
  location: string;
  avatarUrl?: string;
};

type AuthVisualPanelProps = {
  heading: readonly string[];
  tagline: string;
  testimonial?: AuthTestimonial;
  logoHref?: string;
  /** Composant de lien du logo (ex. le `Link` localisé d'un routeur applicatif). */
  logoAs?: ElementType;
};

const AuthVisualPanel = ({
  heading,
  tagline,
  testimonial,
  logoHref,
  logoAs,
}: AuthVisualPanelProps) => (
  <aside className="relative hidden h-screen w-[var(--size-auth-panel)] shrink-0 overflow-hidden bg-auth p-16 lg:flex lg:flex-col lg:justify-between">
    <span
      aria-hidden
      className="pointer-events-none absolute left-[var(--size-auth-halo-x)] top-[var(--size-auth-halo-y)] size-[var(--size-auth-halo)] rounded-full bg-auth-halo"
    />
    <div className="relative">
      <RecordairLogo as={logoAs} href={logoHref} size="md" inverted />
    </div>
    <div className="relative flex flex-col gap-6">
      <h1 className="text-auth-heading font-bold leading-auth-heading tracking-auth-heading text-neutral-0">
        {heading.map((line) => <span key={line} className="block">{line}</span>)}
      </h1>
      <p className="max-w-auth-copy text-heading-md leading-copy text-neutral-0/85">{tagline}</p>
    </div>
    {testimonial ? (
      <figure className="relative flex flex-col gap-3 rounded-lg border border-neutral-0/20 bg-neutral-0/10 p-6 backdrop-blur-sm">
        <RatingStars value={5} label="Note de 5 sur 5" />
        <blockquote className="text-heading-md font-medium leading-copy text-neutral-0">« {testimonial.quote} »</blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar name={testimonial.author} src={testimonial.avatarUrl} alt="" />
          <span className="flex flex-col leading-tight">
            <strong className="text-sm font-semibold text-neutral-0">{testimonial.author}</strong>
            <span className="text-caption text-neutral-0/70">{testimonial.location}</span>
          </span>
        </figcaption>
      </figure>
    ) : null}
  </aside>
);

AuthVisualPanel.displayName = "AuthVisualPanel";

export { AuthVisualPanel };
export type { AuthTestimonial, AuthVisualPanelProps };
