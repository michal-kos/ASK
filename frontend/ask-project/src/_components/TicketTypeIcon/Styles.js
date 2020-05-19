import styled from 'styled-components';

import { ticketTypeColors } from '../../utils/styles';
import Icon from '../Icon/Icon';

export const TypeIcon = styled(Icon)`
  color: ${props => ticketTypeColors[props.color]};
`;