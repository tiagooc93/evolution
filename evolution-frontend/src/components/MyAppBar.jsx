import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import InsightsIcon from "@mui/icons-material/Insights";
import TimerIcon from "@mui/icons-material/Timer";
import ListIcon from "@mui/icons-material/List";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "@fontsource/patrick-hand-sc";
//import leafs from "../assets/leafs.jpg";

function MyAppBar({ clicked_button }) {
  const navigate = useNavigate();

  function onClickTodayActivities() {
    navigate("/home");
  }

  function onClickStatisticsButton() {
    navigate("/home/statistics/all-time");
  }

  function onClickStopWatchButton() {
    navigate("/home/stopwatch");
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("Created App Bar with clicked_button = ", clicked_button);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transperant">
          <Toolbar sx={{ p: 1 }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontFamily: "Patrick Hand SC", flexGrow: 0.7 }}
            >
              Evolution 🍃{" "}
              {/*<Box
                component="img"
                alt="Descriptive alt text"
                src={leafs}
                sx={{
                  ml: 1,
                  mt: 1,
                  height: 70, // a little larger than 20px text
                  width: "auto",
                }}
              />*/}
            </Typography>

            <Box display="flex" sx={{ flexGrow: 1 }} gap={5}>
              <Button
                key="tasks"
                sx={{ border: 1, p: 1.5, borderRadius: 28 }}
                color={clicked_button === "tasks" ? "primary" : "inherit"}
                onClick={onClickTodayActivities}
                startIcon={<ListIcon />}
              >
                Today's Tasks
              </Button>
              <Button
                key="stop"
                sx={{ border: 1, p: 1.5, borderRadius: 28 }}
                color={clicked_button === "stop" ? "primary" : "inherit"}
                onClick={onClickStopWatchButton}
                startIcon={<TimerIcon />}
              >
                Count Task Time
              </Button>
              <Button
                key="stats"
                sx={{ border: 1, p: 1.5, borderRadius: 28 }}
                color={clicked_button === "stats" ? "primary" : "inherit"}
                onClick={onClickStatisticsButton}
                startIcon={<InsightsIcon />}
              >
                Statistics
              </Button>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default MyAppBar;
