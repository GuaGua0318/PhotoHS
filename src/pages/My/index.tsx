import { Badge, PullToRefresh, Space, TabBar, Tabs, Image, Avatar, ImageViewer, DotLoading, Button, ImageUploader, ImageUploadItem, Dialog, Grid } from 'antd-mobile';
import { AddOutline, AppOutline, UnorderedListOutline } from 'antd-mobile-icons';
import './index.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import imgDetail from '../../components/imgDetail';
import { PostMySharedAllApi, PostPrivateAddApi, PostPrivateApi } from '../../axios/api';
import { sleep } from '../../utils/sleep';


const My = () => {

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  let info: any = localStorage.getItem('info');
  info = JSON.parse(info);
  const [Images, setImages] = useState<[]>([]);
  const [ImagesP, setImagesP] = useState<[]>([]);
  const testRef = useRef<any>(null);
  const [disabled, setDisabled] = useState(false);




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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    AllMyPhoto();
    AllMyPhoto();
  }, [])

  //切换tabbar
  const changeTab = (key: unknown) => {
    if (key === 'shared') {
      navigate('/shared');
    } else {
      navigate('/my');
    }
  }

  //获取当前用户发送的所有共享照片
  const AllMyPhoto = () => {
    const username = info.username;
    PostMySharedAllApi({ username }).then((res: any) => {
      setImages(res.data.data);
    })
  }

  // useEffect(() => {
  //   AllMyPhoto();
  // },[]);

  //指定从第几张图开始看
  const LookPhoto = async (index: number) => {
    await testRef.current.swipeTo(index);
    setVisible(true);
  }

  //退出登录
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    navigate('/login');
  }

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

  // useEffect(() => {
  //   AllPhoto();
  // })

  //请求私密照片
  const AllPhoto = () => {
    interface Username {
      username: string
    }
    const username: Username = {
      username: info.username
    }
    PostPrivateApi(username).then((res: any) => {
      setImagesP(res.data.data)
    })
  }

  //上传私密照片
  const handleUpload = () => {
    interface ImgUrl {
      username: string,
      img: string
    }
    const imgUrl: ImgUrl = {
      username: info.username,
      img: demoSrc
    }
    PostPrivateAddApi(imgUrl).then((res: any) => {
      AllPhoto();
    })
  }

  return (
    <div className='my'>
      <div className='hd'>
        我的
      </div>
      {/* <div className='detail'>
          <Avatar src={info.avator} />
          <p className='nick'>{info.nickname}</p>
          <div className='logout'>
          <Button color='primary' fill='outline' onClick={() => logout()}>
            退出登录
          </Button>
          </div>
        </div> */}
      {
        info ? <div className='detail'>
          <Avatar src={info.avator} />
          <p className='nick'>{info.nickname}</p>
          <div className='logout'>
            <Button color='primary' fill='outline' onClick={() => logout()}>
              退出登录
            </Button>
          </div>
        </div> : <div>aaa</div>
      }
      <div className='photo'>
        <Tabs>
          <Tabs.Tab title='共享' key='fruits'>
            <div className='Imgs'>
              <PullToRefresh>
                <div className="imagesContainer">
                  <Grid columns={2} gap={5}>
                    {
                      Images.length === 0 ? <DotLoading /> :
                        Images.map((item: any, index: number) => {
                          return (
                            <Image lazy src={item.img} key={item.id} onClick={() => LookPhoto(index)} />
                          )
                        })
                    }
                  </Grid>
                </div>
              </PullToRefresh>
            </div>
          </Tabs.Tab>
          <Tabs.Tab title='独享' key='vegetables'>
            <div className='Imgs'>
              <PullToRefresh>
                <div className="imagesContainer">
                  <Grid columns={2} gap={5}>
                    {
                      ImagesP.length === 0 ? <DotLoading /> :
                        ImagesP.map((item: any, index: number) => {
                          return (
                            <Image lazy src={item.img} key={item.id} onClick={() => LookPhoto(index)} />
                          )
                        })
                    }
                  </Grid>
                </div>
              </PullToRefresh>
            </div>
            <div className='box'>
              <Button block color='primary' size='large' className='add' onClick={() => setVisible2(true)}>
                <AddOutline fontSize={26} />
              </Button>
            </div>
          </Tabs.Tab>
        </Tabs>
        <div>
          <Outlet />
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
          Images.map((item: any) => {
            return item.img
          })
        }
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
      <Dialog
        visible={visible2}
        content={<ImageUploader
          value={fileList}
          onChange={setFileList}
          upload={mockUpload}
        />}
        closeOnAction
        closeOnMaskClick
        onClose={() => {
          setVisible2(false)
        }}
        actions={[
          {
            key: 'confirm',
            text: '确认发布',
            onClick: () => handleUpload(),
            disabled: disabled
          },
        ]}
      />
    </div>
  )
}

export default My;
