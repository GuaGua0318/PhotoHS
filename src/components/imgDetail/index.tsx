import res from 'antd-mobile-icons/es/AaOutline';
import { useEffect, useState } from 'react';
import { GetSharedAllApi } from '../../axios/api';
import './index.scss';
const imgDetail = (Images:[], index: number) => {


  return (
    <div className="footer">
      <div
        className="footerButton"
      >
        {index}
      </div>
    </div>
  )
}
export default imgDetail;