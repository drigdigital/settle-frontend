import Image from "next/image";
import { UserIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";
import type { LeaderProfile } from "@/types/about";

/**
 * Leadership profile: photo, name, title and a short bio. A compact row on
 * phones (photo left), a centred column from `sm`. Without a profile
 * it renders a reserved card (silhouette, title, "Profile coming soon"), so
 * the grid holds its shape until real details are shared.
 */
export function ProfileCard({
  profile,
  reservedTitle,
  className,
}: {
  profile?: LeaderProfile;
  /** Title shown on a reserved card when there's no profile yet. */
  reservedTitle?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "bg-surface shadow-soft flex h-full items-center gap-4 rounded-xl p-5 sm:flex-col sm:gap-0 sm:px-6 sm:py-8 sm:text-center",
        className,
      )}
    >
      {profile?.photo ? (
        <Image
          src={profile.photo}
          alt=""
          width={112}
          height={112}
          className="size-16 shrink-0 rounded-full object-cover sm:size-28"
        />
      ) : (
        <span
          aria-hidden="true"
          className="bg-navy/5 text-navy/40 ring-navy/10 flex size-16 shrink-0 items-center justify-center rounded-full ring-1 sm:size-28"
        >
          <UserIcon className="size-7 sm:size-10" />
        </span>
      )}

      <div className="min-w-0">
        {profile ? (
          <>
            <h3 className="text-navy text-lg font-semibold sm:mt-6">{profile.name}</h3>
            <p className="text-gold-deep mt-1 text-sm font-medium">{profile.title}</p>
            {profile.bio && (
              <p className="text-muted mt-2 text-sm leading-relaxed sm:mt-4">{profile.bio}</p>
            )}
          </>
        ) : (
          <>
            <h3 className="text-navy text-lg font-semibold sm:mt-6">{reservedTitle}</h3>
            <p className="text-muted mt-1 text-sm">Profile coming soon</p>
          </>
        )}
      </div>
    </article>
  );
}
