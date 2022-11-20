import './index.scss';
import { AddCircleOutline, AppOutline, UnorderedListOutline } from 'antd-mobile-icons'
import { Space, Image, ImageViewer, Dialog, ImageUploader, ImageUploadItem, PullToRefresh, TextArea, TabBar, Badge, DotLoading } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react';
import { sleep } from '../../utils/sleep';
import imgDetail from '../../components/imgDetail';
import { PostSharedAddApi, GetSharedAllApi } from '../../axios/api';
import { useNavigate } from 'react-router-dom';

const Shared = () => {

  const navigate = useNavigate();

  const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'

  const [Images,setImages] = useState<[]>([]);
  let info: any = localStorage.getItem("info");
  info = JSON.parse(info);

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
  const [visible2, setVisible2] = useState(false);
  const [disabled,setDisabled] = useState(false);
  const testRef:any = useRef(null);

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
  interface Photo{
    img: string,
    detail: string
    username: string
  }
  const handleUpload = () => {
    let photo : Photo = {
      img:demoSrc,
      detail:value,
      username:info.username
    }
    PostSharedAddApi(photo).then((res:any) => {
      AllPhoto();
    })
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/login');
    }
    if(fileList.length < 1){
      setDisabled(true);
    }
  },[fileList])

  //请求所有共享图片
  const AllPhoto = () => {
    GetSharedAllApi().then((res:any) => {
      setImages(res.data.data);
    })
  }

  useEffect(() => {
    AllPhoto();
  },[]);
  
  //切换tabbar
  const changeTab = (key:unknown) => {
    if(key === 'shared'){
      navigate('/shared');
    }else{
      navigate('/my');
    }
  }

  //指定从第几张图开始看
  const LookPhoto = async (index:number) => {
    await testRef.current.swipeTo(index);
    setVisible2(true);
  }


  return (
    <div className='shared'>
      <div className='hd'>
        分享池
        <div className='icon'>
          <Space wrap style={{ fontSize: 36 }}
            onClick={() => {
              setVisible(true)
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
              {
                Images.length === 0 ? <DotLoading /> : 
                  Images.map((item:any,index:number) => {
                    return(
                      <Image lazy src={item.img} key={item.id} onClick={() => LookPhoto(index)} />
                    )
                  })
              }
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
        ref={testRef}
        images={
          Images.map((item:any) => {
            return item.img
          })
        }
        visible={visible2}
        onClose={() => {
          setVisible2(false)
        }}
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
            text: '确认发布',
            onClick:() => handleUpload(),
            disabled:disabled
          },
        ]}
      />
    </div>
  );
}

export default Shared;