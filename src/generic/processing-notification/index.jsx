import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge, Icon } from '@openedx/paragon';
import { Settings as IconSettings } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import { capitalize } from 'lodash';

import { NOTIFICATION_MESSAGES } from '../../constants';

const ProcessingNotification = ({ isShow, title }) => {
  const intl = useIntl();

  const displayTitle = title === 'Deleting'
    ? intl.formatMessage({ id: title })
    : capitalize(title);
  return (
    <Badge
      className={classNames('processing-notification', {
        'is-show': isShow,
      })}
      variant="secondary"
      aria-hidden={isShow}
    >
      <Icon className="processing-notification-icon" src={IconSettings} />
      <h2 className="processing-notification-title">
        {displayTitle}
      </h2>
    </Badge>
  );
};

ProcessingNotification.propTypes = {
  isShow: PropTypes.bool.isRequired,
  title: PropTypes.oneOf(Object.values(NOTIFICATION_MESSAGES)).isRequired,
};

export default ProcessingNotification;
