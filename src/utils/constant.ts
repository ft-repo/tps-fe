import { ApprovalStatusValue, StatusColor, HistoryPetitionColor } from "@/@types/shared";

export type ApprovalStatusKey = keyof typeof APPROVAL_STATUS;

// export const STATUS_COLOR: StatusColor = {
//   "APPROVE": {
//     "color": "#90EE90",
//     "text": "อนุมัติ"
//   },
//   "REJECTED": {
//     "color": "#FFCCCC",
//     "text": "ไม่อนุมัติ"
//   },
//   "IN_PROGRESS": {
//     "color": "#FFFFE0",
//     "text": "กำลังดำเนินการ"
//   }
// }

export const ADMIN_PETITION_HISTORY_STATUS: HistoryPetitionColor = {
  "APPROVE":{
    "color": "#32CD32",
    "text": "ผ่านการตรวจ"
  },
  "NOT_APPROVE":{
    "color": "#FF0000",
    "text": "ไม่ผ่านการตรวจ"
  },
  "REJECTED":{
    "color": "#A9A9A9",
    "text": "ยุติคำขออนุญาต"
  },
  // "SKIPPED":{
  //   "color": "#A9A9A9",
  //   "text": "ข้ามขั้นตอน"
  // }
}

export const ADMIN_PETITION_STATUS: StatusColor = {
  "APPROVE":{
    "color": "#32CD32",
    "text": "ผ่านการตรวจ"
  },
  "NOT_APPROVE":{
    "color": "red",
    "text": "ผ่านการตรวจ"
  },
  "IN_PROGRESS":{
    "color": "#FDDA0D",
    "text": "รอดำเนินการ"
  },
  "SKIPPED":{
    "color": "#A9A9A9",
    "text": "ข้ามขั้นตอน"
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