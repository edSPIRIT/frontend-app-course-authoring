import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import useGetConfig from '../hooks/useGetConfig';

import messages from './messages';

const Head = ({ intl }) => {
  const { platformName, favicon } = useGetConfig();

  return (
    <Helmet>
      <title>
        {intl.formatMessage(messages['course-authoring.page.title'], { siteName: platformName })}
      </title>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
  );
};

Head.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Head);
