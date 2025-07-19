import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import MyAppBar from "../components/MyAppBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/patrick-hand-sc";

function convertSecondsToHour(seconds) {
  /*this solution only works for less then 24h*/
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(11, 19);
  console.log(timeString);

  return timeString;
}

const onClickDeleteActivity = async (activityId) => {
  console.log("On click delete activity: " + activityId);
  const response = await fetch("http://localhost:8080/api/activity/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activityId: activityId,
    }),
  });
  //const data = await response.json();
  console.log("Response after deleting activity:", response);
  //console.log(data);
};

function Home() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [goal, SetGoal] = useState("");
  const [addActivity, SetAddActivity] = useState(false);
  const [deletedActivity, SetDeletedActivity] = useState(false);
  const [openAddActivityModal, setOpenAddActivityModal] = useState(false);
  const handleOpenAddActivityModal = () => setOpenAddActivityModal(true);
  const handleCloseAddActivityModal = () => setOpenAddActivityModal(false);
  const [activities, setActivities] = useState([]);

  function validateAddedActivity() {
    if (!name.trim()) return false;
    if (!group.trim()) return false;
    if (!goal.trim()) return false;

    return true;
  }

  const fetchUserActivities = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/activity/user/1");
      const data = await response.json();
      //setar num state
      console.log("All retrieved Activity Data:");
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

      console.log("All works:");
      console.log(activitiesWorks);

      const retrievedActivities = [];

      for (var i = 0; i < data.length; i++) {
        retrievedActivities.push([
          data[i]["activityName"],
          data[i]["activityGroup"],
          data[i]["activityGoal"],
          activitiesWorks[i],
          data[i]["id"],
          data[i]["deleted"],
        ]);
      }

      console.log("Data to be render:");
      console.log(retrievedActivities);
      setActivities(retrievedActivities);
    } catch (error) {
      console.log(error);
    }
  };

  const SaveNewActivity = async () => {
    console.log("Store created activity:" + name + goal + group);

    const response = await fetch("http://localhost:8080/api/activity/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityName: name,
        activityGoal: goal * 60,
        activityGroup: group,
        userId: 1,
      }),
    });
    const data = await response.json();
    console.log("Response after requesting to save activity:");
    console.log(data);
    SetAddActivity(false);
  };

  useEffect(() => {
    fetchUserActivities();

    if (deletedActivity) {
      console.log("Setting delete activity to False");
      SetDeletedActivity(false);
    }
  }, [addActivity, deletedActivity]);

  useEffect(() => {
    if (addActivity) {
      SaveNewActivity();
    }
  }, [addActivity, name, goal, group, open]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <MyAppBar clicked_button="tasks" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // centers horizontally
              alignItems: "center", // centers vertically
              height: "100vh",
            }}
          >
            <Box>
              <Typography
                sx={{ textAlign: "center", mt: 4, mb: 4 }}
                variant="h4"
              >
                Today's Tasks:
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "auto",
                mb: 15,
              }}
            >
              <Table stickyHeader sx={{ width: 1000 }}>
                <TableHead sx={{}}>
                  <TableRow>
                    <TableCell sx={{ fontSize: 30 }}>Task</TableCell>
                    <TableCell sx={{ fontSize: 30 }}>Group</TableCell>
                    <TableCell sx={{ fontSize: 30 }}>Goal</TableCell>
                    <TableCell sx={{ fontSize: 30 }}>Current Time</TableCell>
                    <TableCell sx={{ fontSize: 30 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities
                    .filter((item) => !item[5])
                    .map((row) => (
                      <TableRow
                        sx={{
                          backgroundColor:
                            row[3] >= row[2] ? "lightGreen" : "transparent",
                        }}
                      >
                        <TableCell sx={{ fontSize: 25 }}>{row[0]}</TableCell>
                        <TableCell sx={{ fontSize: 25 }}>{row[1]}</TableCell>
                        <TableCell sx={{ fontSize: 25 }}>
                          {convertSecondsToHour(row[2])}
                        </TableCell>
                        <TableCell sx={{ fontSize: 25 }}>
                          {convertSecondsToHour(row[3])}
                        </TableCell>
                        <TableCell sx={{ fontSize: 25 }}>
                          {" "}
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                              onClickDeleteActivity(row[4]);
                              SetDeletedActivity(true);
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                sx={{
                  fontSize: 20,
                  alignSelf: "flex-start",
                  mt: 4,
                  borderRadius: 10,
                }}
                color="primary"
                onClick={handleOpenAddActivityModal}
              >
                Add Task
              </Button>
            </Box>
          </Box>
          <Modal
            open={openAddActivityModal}
            onClose={handleCloseAddActivityModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 450,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ m: 1, width: "100%" }}
              >
                New Task:
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="body1"
                component="h2"
                sx={{ m: 1, width: "100%" }}
              >
                Adicionar informações sobre a nova atividade:
              </Typography>

              <Box component="form" noValidate>
                <TextField
                  placeholder="Nome"
                  required
                  sx={{ m: 1, width: "80%" }}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="Grupo"
                  required
                  sx={{ m: 1, width: "80%" }}
                  value={group}
                  onChange={(event) => {
                    setGroup(event.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="Objetivo (minutos)"
                  required
                  sx={{ m: 1, width: "80%" }}
                  value={goal}
                  onChange={(event) => {
                    SetGoal(event.target.value);
                  }}
                ></TextField>
              </Box>

              <Box sx={{ ml: 30, mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: 20,
                  }}
                  color="primary"
                  onClick={() => {
                    if (!validateAddedActivity()) {
                      alert("NAO PREENCHEU TODOS OS CAMPOS");
                    } else {
                      handleCloseAddActivityModal();
                      SetAddActivity(true);
                    }
                  }}
                >
                  Add
                </Button>

                <Button
                  sx={{
                    fontSize: 20,
                    ml: 2,
                  }}
                  color="primary"
                  onClick={handleCloseAddActivityModal}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Home;
