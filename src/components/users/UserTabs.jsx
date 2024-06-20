import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import UserProfileReview from '@/components/users/UserProfileReview';

const filterReviews = (reviews, sortBy) => {
  if (sortBy === 'latest') {
    return reviews
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else {
    return reviews
      .slice()
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }
};

const UserTabs = ({ reviews, isLoading, isError }) => {
  const [sortBy, setSortBy] = useState('latest');
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    if (reviews) {
      const filtered = filterReviews(reviews, sortBy);
      setFilteredReviews(filtered);
    }
  }, [reviews, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  if (isLoading) {
    return (
      <section className="grid grid-flow-row gap-4">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  if (isError) {
    return <p>Error fetching reviews.</p>;
  }

  return (
    <section>
      <Tabs defaultValue="all-reviews">
        <TabsList className="flex justify-start gap-8">
          <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all-reviews">
          <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
            <Select
              value={sortBy}
              onValueChange={handleSortChange}
              disabled={reviews && reviews.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Latest reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sorting reviews</SelectLabel>
                  <SelectItem value="latest">Latest reviews</SelectItem>
                  <SelectItem value="oldest">Oldest reviews</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {reviews && reviews.length === 0 && <p>No reviews available.</p>}
          <ul className="grid grid-flow-row gap-4">
            {filteredReviews.map((review) => (
              <li key={review?.id}>
                <UserProfileReview review={review} />
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="favorites">
          <p>No favorites found.</p>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default UserTabs;
