import { getLocale } from '@edx/frontend-platform/i18n';
import { useEffect } from 'react';

const useSetFont = () => {
  useEffect(() => {
    const setFont = () => {
      const body = document.querySelector('body');
      if (getLocale() === 'fa' || getLocale() === 'fa-ir') {
        body.className = 'lang_fa';
      } else if (getLocale() === 'ar') {
        body.className = 'lang_ar';
      } else {
        body.removeAttribute('class');
      }
    };
    setFont();
  }, [getLocale()]);
};

export default useSetFont;
