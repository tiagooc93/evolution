import {
  TextField,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

function handleOnSubmit() {
  console.log("LOGIN");
}

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          p: 2,
          fontWeight: "bold",
          flexGrow: 1,
        }}
        display="flex"
        width="400px"
      >
        <Typography sx={{ fontSize: 40, fontWeight: "medium" }}>
          🍃 Evolution
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        justifyContent="center"
        gap={2}
      >
        <Typography sx={{ fontSize: 30, fontWeight: "medium" }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth="400px"
          width="100%"
          sx={{ mb: 40 }}
        >
          <FormControl>
            <TextField type="email" placeholder="e-mail" required></TextField>
          </FormControl>

          <TextField type="password" placeholder="******"></TextField>
          <FormControlLabel
            control={
              <Checkbox valeu="remember" color="primary" required></Checkbox>
            }
            label="Lembrar-me"
          ></FormControlLabel>
          <Button
            variant="contained"
            sx={{ border: 1 }}
            onClick={() => {
              navigate("/home");
            }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Login;
