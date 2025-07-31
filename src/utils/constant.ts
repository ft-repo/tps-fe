import { ApprovalStatusValue, StatusColor } from "@/@types/shared";

export type ApprovalStatusKey = keyof typeof APPROVAL_STATUS;

export const STATUS_COLOR: StatusColor = {
  "APPROVE": {
    "color": "#90EE90",
    "text": "อนุมัติ"
  },
  "REJECTED": {
    "color": "#FFCCCC",
    "text": "ไม่อนุมัติ"
  },
  "IN_PROGRESS": {
    "color": "#FFFFE0",
    "text": "กำลังดำเนินการ"
  }
}

export const APPROVAL_STATUS: Record<string, ApprovalStatusValue> = {
  "APPROVED": {
    "className": "bg-green-500 text-white border-0 rounded p-3",
    "text": "ผ่านการตรวจ"
  },
  "IN_PROGRESS": {
    "className": "bg-yellow-500 text-black border-0 rounded p-3",
    "text": "รอดำเนินการ"
  },
  "WAIT_APPROVAL": {
    "className": "bg-red-500 text-white border-0 rounded p-3",
    "text": "รอตรวจสอบ"
  },
  "REJECTED": {
    "className": "bg-gray-500 text-white border-0 rounded p-3",
    "text": "ยุติ"
  },
}