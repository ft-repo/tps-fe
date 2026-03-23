import { ApprovalStatusValue, StatusColor, HistoryPetitionColor, ClientPetitionColor, ClientPetitionExtendColor } from "@/@types/shared";

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
// 
export const CLIENT_PETITION_STATUS: ClientPetitionColor = {
  "APPROVE": {
    "color": "#32CD32",
    "text": "ผ่านการตรวจ",
    "text_color": "text-white"
  },
  "NOT_APPROVE": {
    "color": "#FF0000",
    "text": "ไม่ผ่านการตรวจ",
    "text_color": "text-white"
  },
  "REJECTED": {
    "color": "#A9A9A9",
    "text": "ยุติคำขออนุญาต",
    "text_color": "text-white"
  },
  "IN_PROGRESS": {
    "color": "#FDDA0D",
    "text": "รอดำเนินการ",
    "text_color": "text-black"
  },
  "FURTHER_PROGRESS": {
    "color": "#A9A9A9",
    "text": "รอดำเนินการ",
    "text_color": "text-black"
  },
  "IS_CANCELED": {
    "color": "#A9A9A9",
    "text": "ยกเลิกคำขอ",
    "text_color": "text-white"
  }
}

export const CLIENT_PETITION_EXTENDED_STATUS: ClientPetitionExtendColor = {
  "APPROVE": {
    "color": "#32CD32",
    "text": "ผ่านการตรวจ"
  },
  "NOT_APPROVE": {
    "color": "#42A8C9",
    "text": "ข้อความใหม่"
  },
  "REJECTED": {
    "color": "#A9A9A9",
    "text": "ยุติคำขออนุญาต"
  },
  "IN_PROGRESS": {
    "color": "#FDDA0D",
    "text": "รอดำเนินการ"
  }
}


export const ADMIN_PETITION_HISTORY_STATUS: HistoryPetitionColor = {
  "APPROVE": {
    "color": "#32CD32",
    "text": "ผ่านการตรวจ"
  },
  "NOT_APPROVE": {
    "color": "#FF0000",
    "text": "ไม่ผ่านการตรวจ"
  },
  "REJECTED": {
    "color": "#A9A9A9",
    "text": "ยุติคำขออนุญาต"
  },
  // "SKIPPED":{
  //   "color": "#A9A9A9",
  //   "text": "ข้ามขั้นตอน"
  // }
}

export const ADMIN_PETITION_STATUS: StatusColor = {
  "APPROVE": {
    "color": "#32CD32",
    "text": "ผ่านการตรวจ",
    "text_color": "text-white"
  },
  "NOT_APPROVE": {
    "color": "red",
    "text": "ผ่านการตรวจ",
    "text_color": "text-white"
  },
  "IN_PROGRESS": {
    "color": "#FDDA0D",
    "text": "รอดำเนินการ",
    "text_color": "text-black"
  },
  "SKIPPED": {
    "color": "#A9A9A9",
    "text": "ข้ามขั้นตอน",
    "text_color": "text-white"
  },
  "PETITION_HOLD": {
    "color": "#FF8716",
    "text": "ตีกลับ",
    "text_color": "text-white"
  },
  "PETITION_END": {
    "color": "#FF1616",
    "text": "บันทึกข้อมูล",
    "text_color": "text-white"
  },
}

export const APPROVAL_STATUS: Record<string, ApprovalStatusValue> = {
  "APPROVED": {
    "className": "bg-green-500 text-white border-0 rounded p-3",
    "color": "white",
    "text": "ผ่านการตรวจ"
  },
  "IN_PROGRESS": {
    "className": "bg-yellow-500 text-black border-0 rounded p-3",
    "color": "black",
    "text": "รอดำเนินการ"
  },
  "WAIT_APPROVAL": {
    "className": "bg-red-500 text-white border-0 rounded p-3",
    "color": "white",
    "text": "รอตรวจสอบ"
  },
  "REJECTED": {
    "className": "bg-gray-500 text-white border-0 rounded p-3",
    "color": "white",
    "text": "ยุติ"
  },
}