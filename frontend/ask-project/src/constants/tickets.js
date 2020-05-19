export const TicketType = {
    TASK: 'task',
    BUG: 'bug',
    STORY: 'story',
  };
  
  export const TicketStatus = {
    BACKLOG: 'backlog',
    SELECTED: 'selected',
    INPROGRESS: 'inprogress',
    DONE: 'done',
  };
  
  export const TicketPriority = {
    HIGHEST: '5',
    HIGH: '4',
    MEDIUM: '3',
    LOW: '2',
    LOWEST: '1',
  };
  
  export const TicketTypeCopy = {
    [TicketType.TASK]: 'Task',
    [TicketType.BUG]: 'Bug',
    [TicketType.STORY]: 'Story',
  };
  
  export const TicketStatusCopy = {
    [TicketStatus.BACKLOG]: 'Backlog',
    [TicketStatus.SELECTED]: 'Selected for development',
    [TicketStatus.INPROGRESS]: 'In progress',
    [TicketStatus.DONE]: 'Done',
  };
  
  export const TicketPriorityCopy = {
    [TicketPriority.HIGHEST]: 'Highest',
    [TicketPriority.HIGH]: 'High',
    [TicketPriority.MEDIUM]: 'Medium',
    [TicketPriority.LOW]: 'Low',
    [TicketPriority.LOWEST]: 'Lowest',
  };