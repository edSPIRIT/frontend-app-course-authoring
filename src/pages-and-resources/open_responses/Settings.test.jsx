import { shallow } from 'enzyme';
import OpenResponsesSettings from './Settings';

jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'), // use actual for all non-hook parts
  injectIntl: (component) => component,
  intlShape: {},
}));
jest.mock('../app-settings-modal/AppSettingsModal', () => 'AppSettingsModal');

const props = {
  onClose: jest.fn().mockName('onClose'),
  intl: {
    formatMessage: (message) => message.defaultMessage,
  },
};

describe('OpenResponsesSettings', () => {
  it('should render', () => {
    const wrapper = shallow(<OpenResponsesSettings {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
