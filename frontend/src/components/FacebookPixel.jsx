import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

const FacebookPixel = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!pixelId || initialized.current || typeof window === 'undefined') return;

    !(function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!pixelId || !initialized.current || typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
};

export default FacebookPixel;
