// ts
import React, { FC, useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type PlayerYTProps = {
  id: string;
};

export const PlayerYT: FC<PlayerYTProps> = ({id}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const refContainer = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetWidth / (16/9)
            });
        }
    }, []);

  const opts: YouTubeProps['opts'] = {
    height: dimensions.height,
    width: dimensions.width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  
  return (
    <div className='w-full m-auto' ref={refContainer}>
      <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />
    </div>
  )
};

export default PlayerYT