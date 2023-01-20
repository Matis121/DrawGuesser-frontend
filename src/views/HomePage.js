import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  FormGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setInLobby } from "../features/authSlice";
import profilePic from "../images/profilePic.jpg";
import socket from "../socket/socket";
import { setPlayerList, setRoomCode } from "../features/lobbySlice";

export default function HomePage() {
  const user = useSelector((state) => state.auth.user);
  const [gameCode, setGameCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("joinSuccess", () => {
      dispatch(setInLobby());
      navigate("/Lobby");
    });

    socket.on("roomCode", (data) => {
      dispatch(setRoomCode(data));
    });

    socket.on("playerListUpdate", (data) => {
      dispatch(setPlayerList(data));
    });
  }, []);

  function handleLogout() {
    localStorage.clear();
    dispatch(logout());
    navigate("/Login");
  }

  function createGame() {
    console.log("creating game");
    const userInfo = {
      _id: user.id,
      username: user.username,
    };
    dispatch(setInLobby());
    socket.emit("createGame", userInfo);

    navigate("/Lobby");
  }

  function joinGame() {
    const userInfo = {
      _id: user.id,
      username: user.username,
    };
    socket.emit("joinGame", { user: userInfo, roomCode: gameCode });
  }

  return (
    <Container maxWidth="lg">
      <Box
          sx={{
            flexGrow: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            margin: 0,
          }}
      >
          <Typography color="white" variant="h2" fontWeight="normal" >
            Draw Guesser
          </Typography>
      </Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          padding: "1rem",
          boxShadow: "4",
          width: "50%",
          height: "100%",
          minHeight: "600px",
          margin: "20px auto",
        }}
      >
        <Box sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}>
              <Button
              type="submit"
              variant="outlined"
              color="error"
              onClick={() => navigate("/ChangePassword")}
            >
              Change Password
            </Button>
          <Button
              type="submit"
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                alignSelf: "flex-end",
              }}
            >
              Logout
            </Button>
        </Box>
        <Typography variant="h4">{user.username}</Typography>
        <div>
          <img src={profilePic} width="150" height="150" />
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5em",
            flexWrap: "wrap",
            width: "80%",
            marginTop: "-1rem",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={() => navigate("/Leaderboard")}
          >
            View Leaderboard
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => createGame()}
          >
            Create Game
          </Button>
        </Box>
        <div>
          <FormGroup row>
            <TextField
              size="small"
              autoComplete="off"
              variant="outlined"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              placeholder="ENTER CODE"
              color="success"
            />
            <Button
              onClick={() => joinGame()}
              variant="contained"
              color="success"
              disableElevation
            >
              JOIN GAME
            </Button>
          </FormGroup>
        </div>
      </Paper>
    </Container>
  );
}
