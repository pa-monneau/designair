import { StarIcon } from "@recordair/ui-core/icons";
import { Avatar, Card } from "@recordair/ui-core";

type ReviewCardData = {
  authorName: string;
  authorAvatarUrl?: string | null;
  body: string;
  dateLabel: string;
  rating: number;
};

type ReviewCardProps = {
  review: ReviewCardData;
  ratingLabel: string;
};

const ReviewCard = ({ review, ratingLabel }: ReviewCardProps) => {
  return (
    <Card as="article" variant="flat" padding="none" className="flex flex-col gap-3">
      <span className="flex gap-1" aria-label={ratingLabel}>
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon
            key={index}
            aria-hidden
            className={`size-4 ${index < review.rating ? "fill-star text-star" : "text-neutral-300"}`}
          />
        ))}
      </span>
      <blockquote className="text-sm leading-6 text-neutral-700">“{review.body}”</blockquote>
      <span className="flex items-center gap-2">
        <Avatar name={review.authorName} src={review.authorAvatarUrl} size="sm" />
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-neutral-900">{review.authorName}</span>
          <span className="text-label capitalize text-neutral-500">{review.dateLabel}</span>
        </span>
      </span>
    </Card>
  );
};

ReviewCard.displayName = "ReviewCard";

export { ReviewCard };
export type { ReviewCardData, ReviewCardProps };
