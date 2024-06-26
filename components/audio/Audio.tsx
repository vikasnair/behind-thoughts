import MediaQuery from '@/lib/enums/MediaQuery';
import useMediaQuery from '@/lib/hooks/useMediaQuery';
import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import Button from '../button/Button';
import StyledAudio from './styles';

const Audio = () => {
  const isMobile = useMediaQuery(MediaQuery.MobileScreen);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  // Autoplay & loop setup
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      // Note: Autoplay may not work in all browsers without user interaction
      audio.autoplay = true;
      // Event listeners to update state based on actual playback state
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.volume = 0.01;
    }
  }, []);

  return (
    <StyledAudio.Root isMobile={isMobile}>
      <audio ref={audioRef} src={'/audio.m4a'} style={{ display: 'none' }} />

      <Button.Base onClick={togglePlayPause}>
        {isPlaying ? (
          <SpeakerLoudIcon height='14' width='14' />
        ) : (
          <SpeakerOffIcon height='14' width='14' />
        )}
      </Button.Base>
    </StyledAudio.Root>
  );
};

export default Audio;
