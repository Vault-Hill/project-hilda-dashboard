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
  id: string;
  name: string;
  phone: string;
  email: string;
  escalation: string | boolean;
  sessionStartedAt: number;
  sessionDuration: number;
  totalMessages: number;
};

export type ReportDetails = {
  id: string;
  name: string;
  phone: string;
  email: string;
  escalation: string;
  sessionStartedAt: string;
  sessionDuration: string;
  totalMessages: number;
}
