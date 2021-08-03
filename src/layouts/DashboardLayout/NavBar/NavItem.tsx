import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button, ListItem, makeStyles } from '@material-ui/core';
import { LogOut as LogoutIcon } from 'react-feather';
import LogoutDialog from '../../../components/LogoutIconButton/LogoutDialog';
import language from '../lang';
import injectWrapper from '../../../utils/injectWrapper';
import { getLang } from '../../../utils/storeSelector';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }: any) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export const NavBarLogoutButton = injectWrapper(({ stores }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const { selectedLanguage: lang } = getLang(stores);

  const toggleDialog = () => {
    setOpen((val) => !val);
  };

  return (
    <>
      <ListItem className={clsx(classes.item)} disableGutters>
        <Button className={classes.button} onClick={toggleDialog}>
          <LogoutIcon className={classes.icon} size="20" />
          <span className={classes.title}>{language[lang].Logout}</span>
        </Button>
      </ListItem>
      <LogoutDialog open={open} toggleDialog={toggleDialog} />
    </>
  );
});

// NavItem.propTypes = {
//   className: PropTypes.string,
//   href: PropTypes.string,
//   icon: PropTypes.elementType,
//   title: PropTypes.string
// };

export default NavItem;
