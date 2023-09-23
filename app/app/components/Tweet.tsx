import React, { FC, useEffect, useState } from 'react';
import Twitter from 'twitter-lite';

type TweetProps = {
  id: string;
};

const Tweet: FC<TweetProps> = ({ id }) => {
  const [tweetData, setTweetData] = useState<any | null>(null);

  useEffect(() => {
    // Create a new Twitter client using your API credentials
    const twitter = new Twitter({
      consumer_key: 'Z6LD1ie11wdGZeTd9tTkB3EJZ',
      consumer_secret: 'E6OJPpeM84fYETvIIbup4xksipnXjgipVTXl5STzPlgMdNQsf6',
      access_token_key: '1397049769-HWo6uI4msrUkttD7ZPZTyegMRVM6wyYByM5J954',
      access_token_secret: 'zDDPHiR624GqZUO2eg0gGdj0CE6ppoFm6wv3UWqx8Hqq5',
    });

    // Fetch tweet data using the Twitter API
    const fetchTweetData = async () => {
      try {
        const tweet = await twitter.get('statuses/show', { id });
        setTweetData(tweet);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTweetData();
  }, [id]);

  return (
    <div>
      {tweetData ? (
        <div>
          <p>Tweet Text: {tweetData.text}</p>
          <p>Created At: {tweetData.created_at}</p>
          {/* Add more tweet data fields as needed */}
        </div>
      ) : (
        <p>Loading tweet...</p>
      )}
    </div>
  );
};

export default Tweet;
