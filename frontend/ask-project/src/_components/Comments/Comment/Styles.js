import styled from 'styled-components';

import { ticketPriorityColors } from '../utils/styles';
import Icon from '../Icon/Icon';

export const ActionIcon = styled(Icon)`
  color: ${props => ticketPriorityColors[props.color]};
`;