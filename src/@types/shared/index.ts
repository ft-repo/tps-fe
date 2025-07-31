export interface DialogProps {
  open: boolean;
}

export interface StatusColor {
  APPROVE: {
    color: string;
    text: string;
  };
  REJECTED: {
    color: string;
    text: string;
  };
  IN_PROGRESS: {
    color: string;
    text: string;
  };
}
export interface ApprovalStatusValue {
  className: string;
  text: string;
};
