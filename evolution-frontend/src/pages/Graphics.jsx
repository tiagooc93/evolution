import { LineChart } from "@mui/x-charts/LineChart";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MyAppBar from "../components/MyAppBar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

function Graphics() {
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
            control={<Switch />}
            label="Calendar"
            onChange={onClickCalendarButton}
          />
          <FormControlLabel
            control={<Switch />}
            label="All Time"
            onChange={onClickAllTimeButton}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Graphics"
            onChange={onClickGraphicsButton}
          />
        </FormGroup>
        <Box>
          Grafico de linha com horas trabalhadas ao longo dos dias, total e por
          atividade. Colocar grafico de coluna comparando os grupos ao longo do
          tempo
          <LineChart
            style={{ width: 1000 }}
            xAxis={[
              {
                scaleType: "time",
                data: [new Date("2025/01/01"), new Date("2025/02/02")],
              },
            ]}
            series={[
              {
                data: [2, 5.5],
              },
            ]}
            height={300}
          />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Graphics;
