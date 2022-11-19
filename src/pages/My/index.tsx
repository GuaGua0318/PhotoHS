import { Badge, PullToRefresh, Space, TabBar, Tabs, Image, Avatar, ImageViewer, DotLoading, Button } from 'antd-mobile';
import { AppOutline, UnorderedListOutline } from 'antd-mobile-icons';
import './index.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import imgDetail from '../../components/imgDetail';
import { PostMySharedAllApi } from '../../axios/api';


const My = () => {

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const info = JSON.parse(localStorage.getItem('info'));
  const [Images,setImages] = useState<[]>([]);
  const testRef = useRef(null);


  const demoSrc =
      'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'

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



  //切换tabbar
  const changeTab = (key:unknown) => {
    if(key === 'shared'){
      navigate('/shared');
    }else{
      navigate('/my');
    }
  }

  //获取当前用户发送的所有共享照片
  const AllMyPhoto = () => {
    const username = info.username;
    PostMySharedAllApi({username}).then((res:any) => {
      setImages(res.data.data);
    })
  }

  useEffect(() => {
    AllMyPhoto();
  },[]);

  //指定从第几张图开始看
  const LookPhoto = async (index:number) => {
    await testRef.current.swipeTo(index);
    setVisible(true);
  }

  //退出登录
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    navigate('/login');
  }

    return(
      <div className='my'>
        <div className='hd'>
          我的
        </div>
        <div className='detail'>
          {/* <div className='avator'>
            
          </div> */}
          <Avatar src={info.avator} />
          <p className='nick'>{info.nickname}</p>
          <div className='logout'>
          <Button color='primary' fill='outline' onClick={() => logout()}>
            退出登录
          </Button>
          </div>
        </div>
        <div className='photo'>
        <Tabs>
          <Tabs.Tab title='共享' key='fruits'>
          <div className='Imgs'>
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
          </Tabs.Tab>
          <Tabs.Tab title='独享' key='vegetables'>
          <div className='Imgs'>
            <PullToRefresh>
              <div className="imagesContainer">
                <Space wrap>
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
                  <Image lazy src={demoSrc} />
                </Space>
              </div>
            </PullToRefresh>
        </div>
          </Tabs.Tab>
        </Tabs>
        <div>
          <Outlet/>
        </div>
        </div>
        <TabBar className='bottom' onChange={(key) => changeTab(key)} defaultActiveKey="my">
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
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        renderFooter={() => imgDetail(Images)}
      />
      </div>
  )
}
 
export default My;