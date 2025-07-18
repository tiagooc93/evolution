import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MyAppBar from "../components/MyAppBar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

function Calendar() {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <MyAppBar clicked_button="stats" />
        <FormGroup sx={{ m: 10 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Calendar"
            onChange={onClickCalendarButton}
          />
          <FormControlLabel
            control={<Switch />}
            label="All Time"
            onChange={onClickAllTimeButton}
          />
          <FormControlLabel
            control={<Switch />}
            label="Graphics"
            onChange={onClickGraphicsButton}
          />
        </FormGroup>
        <Box sx={{ display: "flex" }}>
          A calendar view of each activity. Yet to be implemented.
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Calendar;
