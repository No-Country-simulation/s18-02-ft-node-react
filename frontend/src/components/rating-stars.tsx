'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

export default function RatingStars ({ rating = 0, totalStars = 5, onRatingChange }: {
  rating?: number
  totalStars?: number
  onRatingChange?: (rating: number) => void
}) {
  const [hoverRating, setHoverRating] = useState(0)
  const existRatingChange = onRatingChange !== undefined

  const handleMouseEnter = (starIndex: number) => {
    if (existRatingChange) {
      setHoverRating(starIndex)
    }
  }

  const handleMouseLeave = () => {
    if (existRatingChange) {
      setHoverRating(0)
    }
  }

  const handleClick = (starIndex: number) => {
    if (existRatingChange) {
      onRatingChange(starIndex)
    }
  }

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            className={`size-5 ${
              starValue <= (hoverRating === 0 ? rating : hoverRating)
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-500 fill-gray-500'
            } ${onRatingChange !== undefined ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => { handleMouseEnter(starValue) }}
            onMouseLeave={handleMouseLeave}
            onClick={() => { handleClick(starValue) }}
          />
        )
      })}
    </div>
  )
}
