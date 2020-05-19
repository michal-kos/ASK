import { css } from 'styled-components';
import Color from 'color';

import { TicketType, TicketStatus, TicketPriority } from '../constants/tickets';

export const color = {
  primary: '#0052cc', // Blue
  success: '#0B875B', // green
  danger: '#E13C3C', // red
  warning: '#F89C1C', // orange
  secondary: '#F4F5F7', // light grey

  textDarkest: '#172b4d',
  textDark: '#42526E',
  textMedium: '#5E6C84',
  textLight: '#8993a4',
  textLink: '#0052cc',

  backgroundDarkPrimary: '#0747A6',
  backgroundMedium: '#dfe1e6',
  backgroundLight: '#ebecf0',
  backgroundLightest: '#F4F5F7',
  backgroundLightPrimary: '#D2E5FE',
  backgroundLightSuccess: '#E4FCEF',

  borderLightest: '#dfe1e6',
  borderLight: '#C1C7D0',
  borderInputFocus: '#4c9aff',
};

export const ticketTypeColors = {
  [TicketType.TASK]: '#4FADE6', // blue
  [TicketType.BUG]: '#E44D42', // red
  [TicketType.STORY]: '#65BA43', // green
};

export const ticketPriorityColors = {
  [TicketPriority.HIGHEST]: '#CD1317', // red
  [TicketPriority.HIGH]: '#E9494A', // orange
  [TicketPriority.MEDIUM]: '#E97F33', // orange
  [TicketPriority.LOW]: '#2D8738', // green
  [TicketPriority.LOWEST]: '#57A55A', // green
};

export const ticketStatusColors = {
  [TicketStatus.BACKLOG]: color.textDark,
  [TicketStatus.INPROGRESS]: '#fff',
  [TicketStatus.SELECTED]: color.textDark,
  [TicketStatus.DONE]: '#fff',
};

export const ticketStatusBackgroundColors = {
  [TicketStatus.BACKLOG]: color.backgroundMedium,
  [TicketStatus.INPROGRESS]: color.primary,
  [TicketStatus.SELECTED]: color.backgroundMedium,
  [TicketStatus.DONE]: color.success,
};
