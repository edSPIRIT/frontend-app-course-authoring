import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getLocale, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import messages from './messages';

const Head = ({ intl }) => {
  const setFont = () => {
    const body = document.querySelector('body');
    if (getLocale() === 'fa') {
      body.className = 'lang_fa';
    } else if (getLocale() === 'ar') {
      body.className = 'lang_ar';
    } else {
      body.removeAttribute('class');
    }
  };
  useEffect(() => {
    setFont();
  }, [getLocale()]);

  return (
    <Helmet>
      <title>
        {intl.formatMessage(messages['course-authoring.page.title'], {
          siteName: getConfig().SITE_NAME,
        })}
      </title>
      <link
        rel="shortcut icon"
        href={getConfig().FAVICON_URL}
        type="image/x-icon"
      />
    </Helmet>
  );
};

Head.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Head);
