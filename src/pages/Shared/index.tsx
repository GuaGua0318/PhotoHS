import './index.scss';
import { AddCircleOutline } from 'antd-mobile-icons'
import { Space, Image, Button, ImageViewer, Dialog, ImageUploader, ImageUploadItem, PullToRefresh } from 'antd-mobile'
import { useState } from 'react';
import { sleep } from '../../utils/sleep';
import imgDetail from '../../components/imgDetail';

const Shared = () => {

  const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'

  const demoImages = [
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
    'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80',
  ]

  //上传的图片
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: demoSrc,
    },
  ])
  //上传图片
  async function mockUpload(file: File) {
    await sleep(3000)
    return {
      url: URL.createObjectURL(file),
    }
  }

  const [visible, setVisible] = useState(false)

  return (
    <div className='shared'>
      <div className='hd'>
        分享池
        <div className='icon'>
          <Space wrap style={{ fontSize: 36 }}
            onClick={() => {
              Dialog.alert({
                header: (
                  <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                    maxCount={1}
                  />
                ),
                title: '注意',
                content: (
                  <>
                    <div>请用手机拍摄手持工牌照，注意保持照片清晰</div>
                    <div>
                      详情说明请查阅<a>操作指引</a>
                    </div>
                  </>
                ),
              })
            }}
          >
            <AddCircleOutline color='#76c6b8' />
          </Space>
        </div>
      </div>
      <div className='imgs'>
        <PullToRefresh>
        <div className="imagesContainer">
          <Space wrap>
            <Image onClick={() => {
              setVisible(true)
            }} lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
            <Image lazy src={demoSrc} />
          </Space>
        </div>
        </PullToRefresh>
        
      </div>
      <ImageViewer.Multi
        images={demoImages}
        visible={visible}
        defaultIndex={1}
        onClose={() => {
          setVisible(false)
        }}
        renderFooter={imgDetail}
      />
    </div>
  );
}

export default Shared;