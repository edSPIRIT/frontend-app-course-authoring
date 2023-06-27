import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import AppSettingsModal from '../app-settings-modal/AppSettingsModal';
import messages from './messages';

const OpenResponsesSettings = ({ intl, onClose }) => (
  <AppSettingsModal
    appId="open_responses"
    title={intl.formatMessage(messages.heading)}
    enableAppHelp={intl.formatMessage(messages.enableFlexPeerGradeHelp)}
    enableAppLabel={intl.formatMessage(messages.enableFlexPeerGradeLabel)}
    learnMoreText={intl.formatMessage(messages.enableFlexPeerGradeLink)}
    onClose={onClose}
  />
);

OpenResponsesSettings.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default injectIntl(OpenResponsesSettings);
