import React from 'react';
import PropTypes from 'prop-types';

import { TicketPriority } from '../../constants/tickets';

import { PriorityIcon } from './Styles';

const propTypes = {
  priority: PropTypes.string.isRequired,
};

const TicketPriorityIcon = ({ priority, ...otherProps }) => {
  const iconType = [TicketPriority.LOW, TicketPriority.LOWEST].includes(priority)
    ? 'arrow-down'
    : 'arrow-up';

  return <PriorityIcon type={iconType} color={priority} size={18} {...otherProps} />;
};

TicketPriorityIcon.propTypes = propTypes;

export default TicketPriorityIcon;