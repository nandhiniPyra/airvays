import React, { useEffect, useState } from 'react';
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
  Box
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
// local file imports
import useSnackbar from '../../hooks/useSnackbar';
import injectWithObserver from '../../utils/injectWithObserver';
import NoResultImg from '../../assets/images/noResult.png';
// import { ChatMessageRoute } from '../../Routes/RoutesConstants';
import DayFromNow from '../../utils/DayFromNow';
import { post, SocketPost } from '../../utils/Fetch';
import { toJS } from 'mobx';
import lodash from 'lodash';
const useStyles = makeStyles((theme) => ({
  // Appbar css start
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }, // Appbar css end
  // chat list item start
  secondaryTypography: {
    fontSize: '.7rem',
    fontWeight: 'lighter',
    color: '#B9B9B9'
  },
  secondaryTypographytime: {
    fontSize: '.7rem',
    fontWeight: 'lighter',
    color: '#B9B9B9',
    float: 'right',
    marginLeft: 'auto'
  },
  primaryTypography: {
    fontSize: '.8rem',
    fontWeight: 400,
    color: '#000000',
    marginRight: theme.spacing(1)
  },
  badge: {
    fontSize: '.5rem',
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: '#000000',
    backgroundColor: '#F47D56'
  },
  // chat list item end
  // empty chat list item start
  imageDiv: {
    width: '50%',
    margin: '0px auto'
  },
  noResImage: {
    width: '100%',
    textAlign: 'center'
  },
  helperPrimaryText: {
    fontWeight: 500,
    marginTop: 20,
    marginBottom: 10,
    color: '#000000'
  },
  NoresultText: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 140
  },
  rootData: {
    marginTop: '50px'
  },
  gutters: {
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  // showing end of he list messages
  endMessage: {
    textAlign: 'center',
    fontWeight: 100,
    fontSize: 'x-small',
    margin: '20px 0px'
  }
}));

const Chatlist = ({ stores }: any) => {
  // local Hooks
  const [postData, setPostData] = useState({ page_no: 1, page_limit: 15 });
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [dataCount, setDataCount] = useState({
    page_count: 0,
    total_count: 0,
    data_length: 0
  });
  const [loadScroll, setloadScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const socket = stores.userStore.getSocket;
  console.log('88888888', socket, '88888888');

  // variable Declarations
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

  const chatlistData = (isAppend = false) => {
    setloadScroll(true);
    !isAppend && setLoading(true);
    SocketPost('/app/getChatList', {
      ...postData,
      data_length: dataList.length
    })
      .then((res: any) => {
        console.log('getChatList Res', res);
        setLoading(false);
        if (!res.error) {
          const OutData = res.data;
          if (isAppend) {
            const unique = [...dataList, ...OutData].filter(
              (arr: any, index: number, self: any) =>
                index === self.findIndex((t: any) => t._id === arr._id)
            );
            setDataList([...unique]);
            //  setDataList((prevState) => [...prevState, ...OutData]);
          } else {
            setDataList(OutData);
          }
          setDataCount((prevState) => ({
            ...prevState,
            total_count: res.total_count,
            page_count: res.page_count,
            data_length: postData.page_no * postData.page_limit
          }));
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

  useEffect(() => {
    chatlistData(true);
  }, [postData]);

  const refershList = (FinalRes: any) => {
    let oldList = [...dataList];
    let Index = oldList.findIndex(({ _id }: any) => FinalRes._id === _id);
    //  setDataList([]);
    if (Index === -1) {
      setDataList((prevState: any) => [{ ...FinalRes }, ...oldList]);
    } else {
      oldList = oldList.filter((item: any, i: any) => i !== Index);
      setDataList((prevState: any) => [{ ...FinalRes }, ...oldList]);
    }
  };

  const refershListCount = (res: any) => {
    let oldList = [...dataList];
    let Index = oldList.findIndex(({ _id }: any) => res._id === _id);
    //  setDataList([]);
    if (Index === -1) {
      setDataList((prevState: any) => [...oldList]);
    } else {
      oldList = oldList.map((item: any, i: any) => {
        if (i !== Index) {
          return item;
        } else {
          return { ...res };
        }
      });
      console.log('oldList', oldList);
      setDataList((prevState: any) => [...oldList]);
    }
  };

  useEffect(() => {
    socket &&
      socket.on('refershList', (res: any) => {
        console.log('refershList', res);
        refershList(res);
      });
    return () => socket && socket.removeAllListeners('refershList');
  }, [socket, dataList]);

  useEffect(() => {
    socket &&
      socket.on('countChange', (res: any) => {
        console.log('countChange', res);
        refershListCount(res);
      });
    return () => socket && socket.removeAllListeners('countChange');
  }, [socket, dataList]);

  return (
    <>
      <Divider />
      {/* maxWidth="xs" */}
      <Container component="main" className={classes.rootData}>
        <List>
          <InfiniteScroll
            dataLength={dataCount.data_length}
            next={() => nextData(postData.page_no + 1, dataCount.page_count)}
            hasMore={loadScroll}
            loader={''}
          //  endMessage={<p className={classes.endMessage}>No more search results</p>}
          >
            {loading && <ChatListLoader />}
            {dataList.length === 0 && !loading && <NoResults />}
            {dataList.map((data, index) => (
              <ChatItem key={index} data={data} />
            ))}
          </InfiniteScroll>
        </List>
      </Container>
    </>
  );
};

const ChatItem = injectWithObserver(({ stores, data }: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const LoginUserDetail = toJS(stores.userStore.LoginUserDetail);
  const [userDetail, setUSerDetail] = useState<any>({});
  useEffect(() => {
    const toUserId =
      data.from_user_id === '600951f9218b60104babd5ec'
        ? data.to_user_id
        : data.from_user_id;
    const toUser = data.participants.find(
      ({ user_id }: any) => user_id === toUserId
    );
    setUSerDetail(toUser);
  }, [data]);

  return (
    <>
      <ListItem
        alignItems="flex-start"
        // onClick={() => navigate(`${ChatMessageRoute}/list/${data?._id}`)}
        classes={{
          gutters: classes.gutters
        }}
      >
        <ListItemAvatar>
          <Avatar alt={userDetail?.user_name} src={userDetail?.user_image} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display="flex">
              <Box>
                <Typography className={classes.primaryTypography}>
                  {userDetail?.user_name}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                {userDetail?.unread_count > 0 && (
                  <Avatar className={classes.badge}>
                    {userDetail?.unread_count}
                  </Avatar>
                )}
              </Box>
              {data?.last_message_time && (
                <Box>
                  <Typography className={classes.secondaryTypographytime}>
                    {DayFromNow(data?.last_message_time)}
                  </Typography>
                </Box>
              )}
            </Box>
          }
          secondary={
            <Typography noWrap={true} className={classes.secondaryTypography}>
              {data?.last_message}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
});

const NoResults = () => {
  const classes = useStyles();
  return (
    <ListItem alignItems="center">
      <div className={classes.NoresultText}>
        <div className={classes.imageDiv}>
          <img
            alt="no response"
            className={classes.noResImage}
            src={NoResultImg}
          />
        </div>
        <div className={classes.helperPrimaryText}>No results to show</div>
      </div>
    </ListItem>
  );
};
const ChatListLoader = () => {
  const classes = useStyles();
  return (
    <ListItem
      alignItems="flex-start"
      classes={{
        gutters: classes.gutters
      }}
    >
      <ListItemAvatar>
        <Skeleton variant="circle" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex">
            <Box flexGrow={1}>
              <Skeleton variant="text" width={80} />
            </Box>
            <Box>
              <Skeleton
                variant="text"
                width={20}
                className={classes.secondaryTypographytime}
              />
            </Box>
          </Box>
        }
        secondary={<Skeleton variant="text" width={40} />}
      />
    </ListItem>
  );
};

export default injectWithObserver(Chatlist);
