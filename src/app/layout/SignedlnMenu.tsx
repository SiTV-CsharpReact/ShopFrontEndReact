import * as React from 'react';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { clearBasket } from "../../features/baskets/basketSlice";
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { signOut } from '../../features/account/accountSlice';

export default function SingedlnMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state=>state.account)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color='inherit'
        onClick={handleClick}
        sx={{typography:'h6'}}
       >
       {user?.email}
      </Button>
      <Menu

        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={() =>
          {dispatch(signOut());
           dispatch(clearBasket());
          }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}