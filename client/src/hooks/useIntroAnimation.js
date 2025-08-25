import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useIntroAnimation = () => {
  const artSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.from(artSectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
    })
    .from(formSectionRef.current, {
      opacity: 0,
      x: 40,
      duration: 1.2,
    }, "-=0.8");

  }, []);

  return { artSectionRef, formSectionRef };
};