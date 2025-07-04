import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Footer from "./Footer";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import axiosInstance from "./AxiosInstance";
import { useEffect } from "react";

const drawerWidth = 240;

export default function Header(props) {
  const { content } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("user/me/");
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchUser();
  },[])
  
  console.log(user)

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography noWrap component="div" variant="h5" fontWeight="">
            ConnectHub
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundImage:
              "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={6} alignItems="flex-start">
            <Avatar
              alt={user.username}
              src="https://images.unsplash.com/photo-1667821399946-ae0bce59aa22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGUlMjBlbW9naXN8ZW58MHx8MHx8fDA%3D"
            />
            <Typography variant="body1" component="span" sx={{ ml: 2 }}>
              {user.username}
            </Typography>
          </ListItem>
          <ListItem key={1} disablePadding>
            <ListItemButton component={Link} to="/home">
              <ListItemIcon>
                <HomeFilledIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={2} disablePadding>
            <ListItemButton component={Link} to="/addpost">
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Add new post"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={3} disablePadding>
            <ListItemButton component={Link} to="/managepost">
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage post"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={4} disablePadding>
            <ListItemButton component={Link} to="/about">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={5} disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}

        <Box sx={{ mt: 4 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
