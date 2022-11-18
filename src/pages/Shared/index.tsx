import './index.scss';
import { AddCircleOutline, AppOutline, UnorderedListOutline } from 'antd-mobile-icons'
import { Space, Image, ImageViewer, Dialog, ImageUploader, ImageUploadItem, PullToRefresh, TextArea, TabBar, Badge } from 'antd-mobile'
import { useEffect, useState } from 'react';
import { sleep } from '../../utils/sleep';
import imgDetail from '../../components/imgDetail';
import { PostSharedAddApi } from '../../axios/api';
import { useNavigate } from 'react-router-dom';

const Shared = () => {

  const navigate = useNavigate();

  const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'

  const demoImages = [
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
    'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80',
  ]

  const tabs = [
    {
      key: 'shared',
      title: '共享',
      icon: <AppOutline />,
      badge: Badge.dot
    },
    {
      key: 'my',
      title: '我的',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
  ]

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [disabled,setDisabled] = useState(false);

  //上传的图片
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: demoSrc
    },
  ])
  
  //上传图片
  async function mockUpload(file: File) {
    await sleep(3000)
    return {
      url: URL.createObjectURL(file),
    }
  }

  //确定上传
  const handleUpload = () => {
    PostSharedAddApi({"img":"11111","detail":"22222"}).then((res:any) => {
      console.log(res)
    })
  }

  useEffect(() => {
    if(fileList.length < 1){
      setDisabled(true);
    }
  },[fileList])
  
  //切换tabbar
  const changeTab = (key:unknown) => {
    if(key === 'shared'){
      navigate('/shared');
    }else{
      navigate('/my');
    }
  }

  return (
    <div className='shared'>
      <div className='hd'>
        分享池
        <div className='icon'>
          <Space wrap style={{ fontSize: 36 }}
            onClick={() => {
              setVisible(true)
              // Dialog.confirm({
              //   header: (
              //     <ImageUploader
              //       value={fileList}
              //       onChange={setFileList}
              //       upload={mockUpload}
              //       maxCount={1}
              //     />
              //   ),
              //   content: (
              //     <>
              //       <TextArea
              //         placeholder='请输入内容'
              //         value={value}
              //         onChange={val => {
              //           setValue(val)
              //         }}
              //       />
              //     </>
              //   ),
              //   closeOnMaskClick: true
              // })
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
      <TabBar className='bottom' onChange={(key) => changeTab(key)} defaultActiveKey="shared">
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      <ImageViewer.Multi
        images={demoImages}
        visible={visible}
        defaultIndex={1}
        onClose={() => {
          setVisible(false)
        }}
        renderFooter={imgDetail}
      />
      <Dialog
        visible={visible}
        header={<ImageUploader
                 value={fileList}
                 onChange={setFileList}
                 upload={mockUpload}
                 maxCount={1}
               />}
        content={<TextArea
                   placeholder='请输入内容'
                   value={value}
                   onChange={val => {
                     setValue(val)
                   }}
                 />}
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        actions={[
          {
            key: 'confirm',
            text: '确认上传',
            onClick:() => handleUpload(),
            disabled:disabled
          },
        ]}
      />
    </div>
  );
}

export default Shared;