import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@openedx/paragon';
import { newId } from '@openedx/paragon/src/utils';

const formatHeaderForLabel = (header) => {
  if (typeof header === 'function') {
    return header();
  }
  if (typeof header === 'string') {
    return header.toLowerCase();
  }
  return header;
};

const SearchFilter = ({
  column: {
    filterValue,
    setFilter,
    Header,
    getHeaderProps,
  },
}) => {
  const ariaLabel = useRef(newId(`text-filter-label-${getHeaderProps().key}-`));
  const formattedHeader = formatHeaderForLabel(Header);
  const inputText = React.isValidElement(formattedHeader) ? formattedHeader : formattedHeader;

  return (
    <Form.Group controlId={ariaLabel.current}>
      <Form.Label className="sr-only">{inputText}</Form.Label>
      <Form.Control
        value={filterValue || ''}
        type="text"
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={inputText}
      />
    </Form.Group>
  );
};

SearchFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    Header: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
    getHeaderProps: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchFilter;
