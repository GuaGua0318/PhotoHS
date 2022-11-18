import { useEffect } from 'react';
import './index.scss';
const imgDetail = (Images:any, index: number) => {

useEffect(() => {
  console.log(Images)
},[])

  return (
    <div className="footer">
      <div
        className="footerButton"
      >
        {
          Images.length > 0 ? <div></div> : <div>zzzzz</div>
        }
      </div>
    </div>
  )
}
export default imgDetail;