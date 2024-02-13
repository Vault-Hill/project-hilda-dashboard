/* eslint-disable @typescript-eslint/no-explicit-any */
export type MenuItem = {
  title: string;
  path: string;
  active?: boolean;
  children?: MenuItem[];
};

export type NavItem = {
  title: string;
  path: string;
  icon: any;
  active?: boolean;
};

export type Session = {
  sessionId: string;
  name: string;
  phone: string;
  email: string;
  escalation: string | boolean;
  startedAt: number;
  endedAt: number;
  messages: Chat[]
};

export type ReportDetails = {
  sessionId: string;
  name: string;
  phone: string;
  email: string;
  escalation: string;
  sessionStartedAt: string;
  sessionDuration: string;
  totalMessages: number;
}

export type Chat = {
  role: string;
  content: string
  _id: string;
}
