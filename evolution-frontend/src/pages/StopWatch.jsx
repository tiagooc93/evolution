import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MyAppBar from "../components/MyAppBar";
import Snackbar from "@mui/material/Snackbar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

const onFinishedWork = async (userId, activityId, time) => {
  console.log("On finished work: " + userId + " " + activityId + " " + time);

  const response = await fetch("http://localhost:8080/api/work/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      activityId: activityId,
      hoursOfWork: time,
      date: new Date().toLocaleString("pt-BR").substring(0, 10),
    }),
  });
  const data = await response.json();
  console.log("Response after saving Work :");
  console.log(data);
};

function convertSecondsToHour(seconds) {
  /*this solution only works for less then 24h*/
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(11, 19);
  console.log(timeString);

  return timeString;
}

function StopWatch() {
  const [countTime, setCountTime] = useState(false);
  const countTimeRef = useRef(false);
  const [time, setTime] = useState(0);
  const timeRef = useRef(0);
  const prevCountTime = useRef(false);
  const intervalId = useRef();
  const [selectedActivity, setSelectedActivity] = useState(0);
  const selectedActivityRef = useRef(0);
  const [activities, setActivities] = useState([{}]);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  const handleChange = (event) => {
    console.log("Selected the following activity: ", event.target.value);
    setSelectedActivity(event.target.value);
    selectedActivityRef.current = event.target.value;
  };

  useEffect(() => {
    //Cleanup function that executes when component unmounts
    return () => {
      console.log("Leaving stopwatch page");
      console.log("countTimeRef: ", countTimeRef.current);
      if (countTimeRef.current) {
        countTimeRef.current = false;
        onFinishedWork(1, selectedActivityRef.current, timeRef.current);
        setCountTime(false);
        setTime(0);
        alert("You left the page, so the activity is finishing");
      }
    };
  }, []);

  const fetchUserActivities = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/activity/user/1");
      const data = await response.json();
      console.log("Activity Data:");
      console.log(data);

      const activitiesWorks = [];

      for (var j = 0; j < data.length; j++) {
        const activityId = data[j]["id"];
        const response = await fetch(
          "http://localhost:8080/api/work/" + activityId
        );

        const activityWork = await response.json();
        console.log(activityWork);
        activitiesWorks.push(activityWork);
      }

      console.log("Activity Works:");
      console.log(activitiesWorks);

      const retrievedActivities = [];
      for (var i = 0; i < data.length; i++) {
        if (!data[i]["deleted"]) {
          retrievedActivities.push({
            activityId: data[i]["id"],
            activityName: data[i]["activityName"],
          });
        }
      }

      console.log("Activity Data to be render:");
      console.log(retrievedActivities);
      setActivities(retrievedActivities);

      //Setting initial activity to be displayed
      setSelectedActivity(retrievedActivities[0].activityId);
      selectedActivityRef.current = retrievedActivities[0].activityId;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

  useEffect(() => {
    console.log("User effect to count time called");

    if (countTime) {
      prevCountTime.current = true;

      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        timeRef.current = timeRef.current + 1;
      }, 1000);
      intervalId.current = interval;
    } else if (prevCountTime) {
      prevCountTime.current = false;
      clearInterval(intervalId.current);
    }
  }, [countTime]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <MyAppBar clicked_button="stop" />
          <Box sx={{}}>
            <FormControl sx={{ minWidth: 200, ml: 20, mt: 20 }}>
              <InputLabel id="demo-simple-select-label">Task</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedActivity}
                label="Activity"
                onChange={handleChange}
                sx={{ fontSize: 25 }}
              >
                {activities.map((data) => (
                  <MenuItem value={data["activityId"]}>
                    {data["activityName"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              border: 1,
              p: 8,
              mr: 80,
              ml: 80,
              mt: 0,
              fontSize: 70,
              borderRadius: 10,
              boxShadow: 10,
              fontFamily: "Patrick Hand SC",
            }}
          >
            {convertSecondsToHour(time)}
          </Box>
        </Box>

        <Box sx={{ mt: 8, ml: 89 }}>
          {!countTime ? (
            <Button
              color="secondary"
              sx={{ border: 2, pl: 20, pr: 20, fontSize: 30 }}
              onClick={() => {
                countTimeRef.current = true;
                setCountTime(true);
              }}
            >
              Start
            </Button>
          ) : (
            <>
              <Button
                color="black"
                sx={{
                  backgroundColor: "#ff7961",
                  border: 2,
                  pl: 20,
                  pr: 20,
                  fontSize: 30,
                }}
                onClick={() => {
                  countTimeRef.current = false;
                  setCountTime(false);
                  onFinishedWork(1, selectedActivity, time);
                  setTime(0);
                  setSnackBarOpen(true);
                }}
              >
                Finish
              </Button>
            </>
          )}
          <Snackbar
            open={snackBarOpen}
            sx={{ p: 3, fontSize: 30 }}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Atividade finalizada e salva ! =)"
          />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default StopWatch;
