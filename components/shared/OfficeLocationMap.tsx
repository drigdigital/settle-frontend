import Image from "next/image";
import { cn } from "@/utils/cn";

export interface OfficeLocationDetailsProps {
  name: string;
  addressLines: string[];
  phone?: string;
  emails?: string[];
  hours?: { day: string; time: string }[];
  className?: string;
}

/** Address / phone / emails / hours block, with no map — usable on its own when a layout needs the map elsewhere. */
export function OfficeLocationDetails({
  name,
  addressLines,
  phone,
  emails,
  hours,
  className,
}: OfficeLocationDetailsProps) {
  return (
    <div className={className}>
      <p className="text-ink font-medium">{name}</p>
      <address className="text-muted mt-2 text-sm not-italic">
        {addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>

      {phone && (
        <a
          href={`tel:${phone.replace(/[\s-]/g, "")}`}
          className="text-muted hover:text-ink mt-2 block text-sm"
        >
          {phone}
        </a>
      )}

      {emails && emails.length > 0 && (
        <div className="mt-2 space-y-1">
          {emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="text-muted hover:text-ink block text-sm"
            >
              {email}
            </a>
          ))}
        </div>
      )}

      {hours && hours.length > 0 && (
        <div className="mt-4 space-y-2">
          {hours.map((slot) => (
            <div key={slot.day} className="text-ink flex justify-between text-sm">
              <span>{slot.day}</span>
              <span className="text-muted">{slot.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export interface MapEmbedProps {
  name: string;
  /** Address/query string to render as a live Google Maps embed. Omit to fall back to a placeholder image. */
  mapQuery?: string;
  className?: string;
}

/** Embedded map box, with no address text — usable on its own when a layout needs the details elsewhere. */
export function MapEmbed({ name, mapQuery, className }: MapEmbedProps) {
  return (
    <div className={cn("bg-ink/10 relative aspect-4/3 overflow-hidden rounded-lg", className)}>
      {mapQuery ? (
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
          title={`Map to ${name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <Image
          src="/images/placeholder.svg"
          alt={`Map to ${name}`}
          fill
          sizes="50vw"
          className="object-cover"
        />
      )}
    </div>
  );
}

export interface OfficeLocationMapProps extends OfficeLocationDetailsProps {
  mapQuery?: string;
}

/**
 * Shared office/showroom location block: address, phone, optional hours, and
 * an embedded map, stacked together. Used by the Experience Center page.
 * The Contact page uses `OfficeLocationDetails` and `MapEmbed` directly so it
 * can lay the two out side by side instead of stacked.
 */
export function OfficeLocationMap({ mapQuery, className, ...details }: OfficeLocationMapProps) {
  return (
    <div className={className}>
      <OfficeLocationDetails {...details} />
      <MapEmbed name={details.name} mapQuery={mapQuery} className="mt-6" />
    </div>
  );
}
