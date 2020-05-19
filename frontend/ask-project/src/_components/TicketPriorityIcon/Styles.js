import styled from 'styled-components';

import { ticketPriorityColors } from '../../utils/styles';
import Icon from '../Icon/Icon';

export const PriorityIcon = styled(Icon)`
  color: ${props => ticketPriorityColors[props.color]};
`;