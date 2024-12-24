import barba from '@barba/core';
import { gsap } from 'gsap';

export const initBarba = () => {
  // Wait for React to mount
  setTimeout(() => {
    barba.init({
      debug: true,
      transitions: [
        {
          name: 'opacity-transition',
          sync: true,
          leave(data) {
            const done = this.async();
            gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.2,
              ease: 'power2.inOut',
              onComplete: done
            });
          },
          enter(data) {
            const done = this.async();
            gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.2,
              ease: 'power2.inOut',
              onComplete: done
            });
          }
        }
      ],
      views: [
        {
          namespace: 'home',
          beforeEnter() {
            initializeComponents();
          }
        }
      ]
    });
  }, 100);
};

const initializeComponents = () => {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  scrollElements.forEach(element => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 0.1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  });
};