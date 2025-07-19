import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MyAppBar from "../components/MyAppBar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

function convertSecondsToHour(seconds) {
  /*this solution only works for less then 24h*/
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(11, 19);
  console.log(timeString);

  return timeString;
}

function parseDateDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function compare(a, b) {
  return parseDateDDMMYYYY(a.date) - parseDateDDMMYYYY(b.date);
}

function AllTimeActivies() {
  const navigate = useNavigate();

  function onClickCalendarButton() {
    navigate("/home/statistics/calendar");
  }

  function onClickAllTimeButton() {
    navigate("/home/statistics/all-time");
  }

  function onClickGraphicsButton() {
    navigate("/home/statistics/graphics");
  }

  const [activities, setActivities] = useState([
    ["", "", 0, 0],
    ["", "", 0, 0],
    ["", "", 0, 0],
    ["", "", 0, 0],
  ]);

  const [activitiesInformation, setActivitiesInformation] = useState([]);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/activity/user/1"
        );
        const data = await response.json();
        console.log("Activity data:");
        console.log(data);

        const retrievedActivities = [];

        for (var i = 0; i < data.length; i++) {
          retrievedActivities.push({
            activityId: data[i]["id"],
            activityName: data[i]["activityName"],
            activityGroup: data[i]["activityGroup"],
            activityGoal: data[i]["activityGoal"],
          });
        }

        console.log("Retrieved Activity Data:");
        console.log(retrievedActivities);
        console.log("Setting to Activities Information:");
        setActivitiesInformation(retrievedActivities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserActivities();
  }, []);

  useEffect(() => {
    const fetchUserAllTimeWork = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/work/all-time/1"
        );
        const data = await response.json();
        console.log("Fetching all acitivities works");

        const sortedData = data.sort(compare);
        console.log("Sorted data:");
        console.log(sortedData);
        const activitiesWorks = [];

        console.log(activitiesWorks);
        const retrievedActivities = [];

        for (var i = 0; i < data.length; i++) {
          console.log("Item" + i);
          console.log(data[i]);

          console.log("All activities information with given works:");
          console.log(activitiesInformation);
          let activityName = "";
          let activityGroup = "";
          for (var j = 0; j < activitiesInformation.length; j++) {
            console.log(
              "comparing" +
                data[i]["activityId"] +
                activitiesInformation[j]["activityId"]
            );
            if (
              data[i]["activityId"] == activitiesInformation[j]["activityId"]
            ) {
              activityName = activitiesInformation[j]["activityName"];
              activityGroup = activitiesInformation[j]["activityGroup"];
            }
          }

          retrievedActivities.push([
            data[i]["date"],
            activityName,
            activityGroup,
            data[i]["hoursOfWork"],
          ]);
        }

        console.log(
          "Data tha will be put on the table: " + retrievedActivities
        );
        setActivities(retrievedActivities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAllTimeWork();
  }, [activitiesInformation]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyAppBar clicked_button="stats" />
        <Box maxWidth="300px">
          <FormGroup sx={{ ml: 10, mt: 10 }}>
            <FormControlLabel
              control={<Switch />}
              label="Calendar"
              onChange={onClickCalendarButton}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="All Time"
              onChange={onClickAllTimeButton}
            />
            <FormControlLabel
              control={<Switch />}
              label="Graphics"
              onChange={onClickGraphicsButton}
            />
          </FormGroup>
        </Box>
        <Box sx={{ ml: 58, mb: 50 }} display="flex" align="center">
          <Table style={{ width: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 30 }}>Date</TableCell>
                <TableCell sx={{ fontSize: 30 }}>Task</TableCell>
                <TableCell sx={{ fontSize: 30 }}>Group</TableCell>
                <TableCell sx={{ fontSize: 30 }}>Time</TableCell>
                <TableCell sx={{ fontSize: 30 }}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((row, index) => {
                const isNewDay =
                  index > 0 && row[0] !== activities[index - 1][0];

                const isLastDay = index === activities.length - 1;

                let totalDayWorkLastDay = 0,
                  totalDayWorkToday = 0;

                if (activities.length == 1) {
                  totalDayWorkToday = activities[0][3];
                }

                if (index > 0) {
                  if (isLastDay) {
                    const DayDate = activities[index][0];
                    const lastDayDate = activities[index - 1][0];
                    totalDayWorkLastDay = activities
                      .filter((activity) => activity[0] === lastDayDate)
                      .reduce((total, activity) => total + activity[3], 0);
                    totalDayWorkToday = activities
                      .filter((activity) => activity[0] === DayDate)
                      .reduce((total, activity) => total + activity[3], 0);
                  } else {
                    const lastDayDate = activities[index - 1][0];
                    totalDayWorkLastDay = activities
                      .filter((activity) => activity[0] === lastDayDate)
                      .reduce((total, activity) => total + activity[3], 0);
                  }
                }

                return (
                  <>
                    {
                      //Display total time of last day before starting a new day
                      isNewDay ? (
                        <>
                          <TableRow sx={{ backgroundColor: "lightBlue" }}>
                            <TableCell sx={{ fontSize: 25 }}>
                              {activities[index - 1][0]}{" "}
                            </TableCell>
                            <TableCell sx={{ fontSize: 25 }}></TableCell>
                            <TableCell sx={{ fontSize: 25 }}></TableCell>
                            <TableCell sx={{ fontSize: 25 }}></TableCell>
                            <TableCell sx={{ fontSize: 25 }}>
                              {convertSecondsToHour(totalDayWorkLastDay)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : null
                    }
                    <TableRow>
                      <TableCell sx={{ fontSize: 25 }}>{row[0]}</TableCell>
                      <TableCell sx={{ fontSize: 25 }}>{row[1]}</TableCell>
                      <TableCell sx={{ fontSize: 25 }}>{row[2]}</TableCell>
                      <TableCell sx={{ fontSize: 25 }}>
                        {convertSecondsToHour(row[3])}
                      </TableCell>
                      <TableCell sx={{ fontSize: 25 }}>{row[4]}</TableCell>
                    </TableRow>
                    {
                      //Treat edge case of last day total time
                      isLastDay ? (
                        <>
                          <TableRow sx={{ backgroundColor: "LightBlue" }}>
                            <TableCell sx={{ fontSize: 25 }}>
                              {activities[index][0]}{" "}
                            </TableCell>
                            <TableCell sx={{ fontSize: 25 }}> </TableCell>
                            <TableCell sx={{ fontSize: 25 }}> </TableCell>
                            <TableCell sx={{ fontSize: 25 }}> </TableCell>
                            <TableCell sx={{ fontSize: 25 }}>
                              {convertSecondsToHour(totalDayWorkToday)}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : null
                    }
                  </>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default AllTimeActivies;
