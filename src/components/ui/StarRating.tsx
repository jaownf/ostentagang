import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating = ({ rating, className = '' }: StarRatingProps) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
