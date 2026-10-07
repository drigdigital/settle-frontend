import Image from "next/image";
import { UserIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";
import type { LeaderProfile } from "@/types/about";

/**
 * Leadership profile: photo, name, title and a short bio. Without a profile
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
        "bg-surface shadow-soft flex h-full flex-col items-center rounded-xl px-6 py-8 text-center",
        className,
      )}
    >
      {profile?.photo ? (
        <Image
          src={profile.photo}
          alt=""
          width={112}
          height={112}
          className="size-28 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="bg-navy/5 text-navy/40 ring-navy/10 flex size-28 items-center justify-center rounded-full ring-1"
        >
          <UserIcon className="size-10" />
        </span>
      )}

      {profile ? (
        <>
          <h3 className="text-navy mt-6 text-lg font-semibold">{profile.name}</h3>
          <p className="text-gold-deep mt-1 text-sm font-medium">{profile.title}</p>
          {profile.bio && <p className="text-muted mt-4 text-sm leading-relaxed">{profile.bio}</p>}
        </>
      ) : (
        <>
          <h3 className="text-navy mt-6 text-lg font-semibold">{reservedTitle}</h3>
          <p className="text-muted mt-1 text-sm">Profile coming soon</p>
        </>
      )}
    </article>
  );
}
