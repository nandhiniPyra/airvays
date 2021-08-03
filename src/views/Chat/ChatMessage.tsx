import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Container,
  ListItem,
  Avatar,
  ListItemText,
  List,
  ListItemAvatar,
  Divider,
  CircularProgress
} from '@material-ui/core';
// local file imports
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import useSnackbar from '../../hooks/useSnackbar';
import injectWithObserver from '../../utils/injectWithObserver';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SocketPost } from '../../utils/Fetch';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme) => ({
  // Appbar css start
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }, // Appbar css end
  gutters: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },
  recevied: {
    width: '100%'
  },

  receviedmessage: {
    position: 'relative',
    background: '#F47D56',
    color: '#FFFFFF',
    borderRadius: '6px',
    padding: 12,
    maxWidth: 'calc(100% - 115px)',

    '&::after': {
      content: '""',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '7px 10px 7px 0',
      borderColor: 'transparent #F47D56',
      display: 'block',
      width: '0',
      //  zIndex: "1",
      left: '-9px',
      top: '10px'
    }
  },
  sent: {
    width: '100%',
    //  float: 'right',
    justifyContent: 'flex-end',
    lineHeight: 1
  },
  dataList: {
    backgroundColor: 'white',
    flex: 1,
    padding: '6px 8px 20px 15px',
    width: '81%'
  },
  rootDiv: {
    width: '100%',
    //  height:'35px',
    justifyContent: 'flex-end',
    position: 'fixed',
    bottom: 25
  },
  fontValue: {
    fontSize: '.7rem',
    wordBreak: 'break-word'
  },
  sentmessage: {
    position: 'relative',
    background: '#FFFFFF',
    color: '#000000',
    borderRadius: '6px',
    maxWidth: 'calc(100% - 115px)',
    flexDirection: 'row',
    display: 'flex',
    float: 'right',
    padding: 12,
    fontSize: '.7rem',
    fontWeight: 'lighter',
    '&::after': {
      content: '""',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '7px 0 9px 10px',
      borderColor: 'transparent #FFFFFF',
      display: 'block',
      width: '0',
      //  zIndex: "1",
      right: '-9px',
      top: '10px'
    }
  },
  containerRoot: {
    padding: 0,
    marginTop: 60,
    marginBottom: 35
  },
  sendAvatarRoot: {
    float: 'right',
    marginTop: '3px'
  },
  AvatarColorDefault: {
    marginRight: 0
  },
  messageLoader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 0px',
    overflow: 'hidden'
  },
  loaderColor: {
    color: '#f44336'
  },
  textInputMultiline: {
    fontSize: '0.8rem',
    maxHeight: '25px'
  },
  sendRequestText: {
    // color: 'white',
    textAlign: 'center'
  },
  infiniteScroll: {
    overflow: 'hidden'
  },
  avatarItem: {
    marginTop: '3px'
  },
  primaryData: {
    lineHeight: 1.1,
    display: 'flex'
  },
  alignData: {
    alignItems: 'end'
  },
  dateBorder: {
    display: 'flex',
    flexDirection: 'row',
    color: '#B9B9B9',
    marginTop: 10,
    marginBottom: 10,
    fontSize: '.7rem',
    '&:after': {
      content: '""',
      flex: '1 1',
      borderBottom: '1px solid #B9B9B9',
      margin: 'auto',
      marginLeft: 10
    },
    '&:before': {
      content: '""',
      flex: '1 1',
      borderBottom: '1px solid #B9B9B9',
      margin: 'auto',
      marginRight: 10
    }
  }
}));

const ChatMessage = ({ stores }: any) => {
  const socket = stores.userStore.getSocket;
  console.log(socket,"socketsocket",stores&&stores.userStore)
  const LoginUserDetail = toJS(stores.userStore.LoginUserDetail);
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [postData, setPostData] = useState({ page_no: 1, page_limit: 15 });
  const [dataCount, setDataCount] = useState({
    page_count: 0,
    total_count: 0,
    data_length: 0
  });
  const [loadScroll, setloadScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<any>(null);
  const [params, setParams] = useState(useParams());
  const [chatMessage, setChatMessage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [toUserDetail, setToUserDetail] = useState<any>({});
  const [isChatListExist, setIsChatListExist] = useState(false);
  const [chatListDetails, setChatListDetails] = useState({});
  const [helperText, setHelperText] = useState('');

  const [groupedDataList, setGroupedDataList] = useState<any>({});
  const [baseScroll, setBaseScroll] = useState(0);

  // Variable declarations
  const classes = useStyles();
  const navigate = useNavigate();
  const snackBar = useSnackbar();

  const nextData = (nextPage: number, totalPage: number) => {
    console.log('nextData', nextPage, totalPage);
    if (nextPage <= totalPage) {
      setPostData((prevState: any) => ({ ...prevState, page_no: nextPage }));
    } else if (totalPage === 0) {
    } else {
      setloadScroll(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef) {
      const node = scrollRef.current;
      window.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
    }
  };

  const getScrollHeight = () => {
    if (scrollRef) {
      const node = scrollRef.current;
      return node.scrollHeight;
    }
  };

  const chatMessageDataList = (isAppend = false) => {
    setloadScroll(true);
    setLoading(true);
    SocketPost('/app/getChatMessage', {
      ...postData,
      data_length: dataList.length,
      chatlist_id: params.id
    })
      .then((res: any) => {
        console.log('getChatMessage Res', res);
        setLoading(false);
        //  debugger
        if (!res.error) {
          const ResData = res.data || [];
          const ReverseResData = ResData.reverse();
          if (isAppend) {
            const BaseScroll = getScrollHeight();
            setDataList((prevState: any) => [...ReverseResData, ...prevState]);
            const FinalScroll = getScrollHeight();
            window.scrollTo({ top: FinalScroll - BaseScroll - 30 });
          } else {
            setDataList(ReverseResData);
          }

          setDataCount((prevState) => ({
            ...prevState,
            total_count: res.total_count,
            page_count: res.page_count,
            data_length: postData.page_no * postData.page_limit
          }));

          postData.page_no === 1 && scrollToBottom();
          setToUserChatListDetails(res);
        } else {
          console.log(res.message);
          snackBar.show(res.message, 'error', undefined, true, 3000);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        console.log('Internal Server Error', err);
        snackBar.show('Internal Server Error', 'error', undefined, true, 3000);
      });
  };

  const chatMessageDataUser = (isAppend = false) => {
    setloadScroll(true);
    setLoading(true);
    SocketPost('/app/getChatMessageByUser', {
      ...postData,
      data_length: dataList.length,
      user_id: params.id
    })
      .then((res: any) => {
        console.log('getChatMessageByUser Res', res);
        setLoading(false);

        if (!res.error) {
          const ResData = res.data;
          const ReverseResData = ResData.reverse();
          if (isAppend) {
            const BaseScroll = getScrollHeight();
            setDataList((prevState: any) => [...ReverseResData, ...prevState]);
            const FinalScroll = getScrollHeight();
            window.scrollTo({ top: FinalScroll - BaseScroll - 30 });
          } else {
            setDataList(ReverseResData);
          }

          setDataCount((prevState) => ({
            ...prevState,
            total_count: res.total_count,
            page_count: res.page_count,
            data_length: postData.page_no * postData.page_limit
          }));

          postData.page_no === 1 && scrollToBottom();
          setToUserDetail((prevState: any) => ({
            ...prevState,
            user_name: res?.toUserDetails?.name
          }));
          setToUserChatListDetails(res);
        } else {
          console.log(res.message);
          snackBar.show(res.message, 'error', undefined, true, 3000);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        console.log('Internal Server Error', err);
        snackBar.show('Internal Server Error', 'error', undefined, true, 3000);
      });
  };

  const setToUserChatListDetails = (res: any) => {
    if (res.isListExist && !isChatListExist) {
      setIsChatListExist(true);
      setToUserDetail((prevState: any) => ({
        ...prevState,
        ...res?.toUserDetails
      }));
      setChatListDetails((prevState: any) => ({
        ...prevState,
        ...res?.chatRoomData
      }));
      params.key === 'user' &&
        setParams({ key: 'list', id: res?.chatRoomData?._id });
    } else if (!res.isListExist) {
      setHelperText(res.message);
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();

    if (chatMessage.trim() === '') return;
    setIsSubmit(true);
    const request = {
      message: chatMessage,
      user_id: isChatListExist ? toUserDetail?.user_id : params.id
    };
    socket.emit('sendMessage', request, (res: any) => {
      console.log('sendMessage Res', res);
      setIsSubmit(false);

      const { error, isListExist, message, chatMessageDetail } = res;
      if (!error) {
        if (!isListExist) {
          snackBar.show(message, 'error', undefined, true, 3000);
          setChatMessage('');
          chatMessageDataUser(true);
        } else {
          setChatMessage('');
          setDataList((prevState) => [...prevState, { ...chatMessageDetail }]);
          scrollToBottom();
        }
      } else {
        snackBar.show(message, 'error', undefined, true, 3000);
      }
    });
  };

  const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setChatMessage(e.target.value);
  };

  //  useEffect(() => {
  //    const groupedData: any = _(dataList)
  //      .groupBy(v => moment(v.created_at).format('DD-MM-yyyy'))
  //      .mapValues(v => v)
  //      .value();

  //    const BaseScroll = getScrollHeight()
  //    setBaseScroll(BaseScroll)
  //    console.log('BaseScroll', BaseScroll)
  //    setGroupedDataList(groupedData)
  //    const FinalScroll = getScrollHeight()
  //    console.log('FinalScroll', FinalScroll)

  //  }, [dataList])

  //  useEffect(() => {
  //    const FinalScroll = getScrollHeight()
  //    window.scrollTo({ top: (FinalScroll - baseScroll) });
  //  }, [groupedDataList])

  useEffect(() => {
    params.key === 'list' && chatMessageDataList(true);
    params.key === 'user' && chatMessageDataUser(true);
  }, [postData]);

  const getChatListID = () => {
    return params.key === 'list' ? params.id : (chatListDetails as any)?.id;
  };

  useEffect(() => {
    const ChatListID = getChatListID();
    socket &&
      socket.on('receiveMessage', (res: any) => {
        console.log('receiveMessage', res);
        const { isListExist, message, chatMessageDetail, chatRoomData } = res;
        console.log('ChatListID', ChatListID);
        SocketPost('/app/removeMessageCount', { chatlist_id: ChatListID })
          .then(console.log)
          .catch(console.log);
        if (ChatListID === chatRoomData?.id) {
          setDataList((prevState) => [...prevState, { ...chatMessageDetail }]);
        }
        setToUserChatListDetails(res);
      });
    return () => socket && socket.removeAllListeners('receiveMessage');
  }, [socket, params, chatListDetails]);

  useEffect(() => {
    socket &&
      socket.on('refreshMessage', (res: any) => {
        console.log('refreshMessage', res);
        params.key === 'user' && chatMessageDataUser(true);
      });
    return () => socket && socket.removeAllListeners('refreshMessage');
  }, [socket, params, chatListDetails]);

  return (
    <>
      <AppBar
        position="fixed"
        style={{ background: '#1b1b1b', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(-1)}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {toUserDetail?.user_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />

      <Container
        component="main"
        classes={{
          root: classes.containerRoot
        }}
      >
        <List ref={scrollRef}>
          <InfiniteScroll
            //  className={classes.infiniteScroll}
            dataLength={dataCount.data_length}
            next={() => nextData(postData.page_no + 1, dataCount.page_count)}
            hasMore={loadScroll}
            inverse={true}
            loader={''}
            scrollThreshold={'100px'}
          >
            {loading && <MessageLoader />}
            {dataList.length === 0 && !loading && (
              <div className={classes.sendRequestText}>{helperText}</div>
            )}
            {dataList.map((data, index) => (
              <GenerateChatItem key={data._id} data={data} />
            ))}

            {/* {Object.keys(groupedDataList).map((key, index) => (
              <GenerateDateList key={key} date={key} dataList={groupedDataList[key]} />
            ))} */}
          </InfiniteScroll>
        </List>
      </Container>

      <div className={classes.rootDiv}>
        <form onSubmit={(e) => sendMessage(e)}>
          <TextField
            fullWidth
            //  multiline
            placeholder="Type something..."
            value={chatMessage}
            onChange={messageOnChange}
            className={classes.dataList}
            //  inputProps={{ inputMode: 'numeric' }}
            InputProps={{
              classes: {
                inputMultiline: classes.textInputMultiline,
                input: classes.textInputMultiline
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => sendMessage(e)}
                    disabled={isSubmit}
                  >
                    {isSubmit ? (
                      <CircularProgress
                        className={classes.loaderColor}
                        size={20}
                      />
                    ) : (
                      <SendIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true
            }}
          />
        </form>
      </div>
    </>
  );
};

const GenerateDateList = ({ date, dataList }: any) => {
  return (
    <>
      <DateDivider>{date}</DateDivider>
      {dataList.map((data: any) => (
        <GenerateChatItem key={data._id} data={data} />
      ))}
    </>
  );
};

const GenerateChatItem = injectWithObserver(({ stores, data }: any) => {
  const LoginUserDetail = toJS(stores.userStore.LoginUserDetail);
  const [isReciecedMessage, setIsReciecedMessage] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    const ownUser = data.from_user_id === '605dc6b09bde4d422f43c55a';

    setIsReciecedMessage(ownUser ? true : false);
    const userDetail = {
      user_id: data?.from_user_id,
      user_name: data?.from_user_name,
      user_image: data?.from_user_image,
      message: data?.content,
      date: data?.created_at
    };
    setUserData(userDetail);
  }, []);

  return (
    <>
      {isReciecedMessage && <RecieveItem data={userData} />}
      {!isReciecedMessage && <SendItem data={userData} />}
    </>
  );
});

const MessageLoader = injectWithObserver(({ stores, data }: any) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageLoader}>
        <CircularProgress className={classes.loaderColor} size={30} />
      </div>
    </>
  );
});

const RecieveItem = ({ data }: any) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" className={classes.recevied}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar alt={data?.name} src={data?.user_image} />
      </ListItemAvatar>
      <ListItemText
        primary={<span className={classes.fontValue}>{data?.message}</span>}
        classes={{
          root: classes.receviedmessage,
          primary: classes.primaryData
        }}
      />
    </ListItem>
  );
};

const SendItem = ({ data }: any) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.sent} classes={{ root: classes.alignData }}>
      <ListItemText
        primary={<span className={classes.fontValue}>{data?.message}</span>}
        classes={{ root: classes.sentmessage, primary: classes.primaryData }}
      />
      <ListItemAvatar>
        <Avatar
          alt={data?.name}
          src={data?.user_image}
          classes={{
            root: classes.sendAvatarRoot,
            colorDefault: classes.AvatarColorDefault
          }}
        />
      </ListItemAvatar>
    </ListItem>
  );
};

const DateDivider = ({ children }: any) => {
  const classes = useStyles();
  return <div className={classes.dateBorder}>{children}</div>;
};

export default injectWithObserver(ChatMessage);
