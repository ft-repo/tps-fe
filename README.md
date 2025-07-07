# TPS - How to ใช้งานเบื้องต้น
1. copy คำสั่งใส่ CLI หรือ tools ที่เกี่ยวข้อง
   ```
   git clone https://github.com/ft-repo/tps-fe.git
   ```
2. เข้าใจหลักการทำงาน branch ต่างๆ ใน repository
   - main = ไม่ต้องยุ่ง ปล่อยได้เลย ปกติเอาไว้ merge code ที่สมบูรณ์แล้วเท่านั้น
   - develop = เป็น branch ที่ใช้ทำงานเป็นหลัก
   - features/... = เป็น branch ที่ใช้ทำ features หรือ modules แยก จะได้ไม่ต้องชนกับ develop (สามารถ merge เข้า develop ได้)
   - hotfixes/... = เอาไว้ใช้แก้ issue ใน features / modules แบบ specific
3. การตั้งชื่อ commit
   - feat: [...commit_name] สำหรับเพิ่มไฟล์ใหม่เข้า staging area
   - fix: [...commit_name] สำหรับแก้ไขไฟล์ใหม่เข้า staging area
   - build: [...commit_name] กรณีลง library ใหม่
