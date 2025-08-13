import React from 'react';
import ApprovalRoutePage from '@/features/staff/request-list/approval/route_way/screen'

interface Props {}

const ApprovalRouteIndex: React.FC<Props> = () => {
  return(
    <ApprovalRoutePage/>
  ); 
}

export default React.memo<Props>(ApprovalRouteIndex);