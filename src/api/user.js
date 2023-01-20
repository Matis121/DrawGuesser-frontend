import axios from "axios";

export async function registerUser(user) {
  let response = await axios.post("https://drawguesser-backend.onrender.com:10000/user/register", user);
  let data = response.data;
  return data;
}

export async function postLogin(user) {
  let response = await axios.post("https://drawguesser-backend.onrender.com:10000/user/login", user);
  let data = response.data;
  return data;
}

export async function changePassword(payload) {
  let response = await axios.post(
    "https://drawguesser-backend.onrender.com/user/changePassword",
    payload
  );
  let data = response.data;
  return data;
}

export async function leaderboard() {
  let response = await axios.get("https://drawguesser-backend.onrender.com:10000/user/leaderboard");
  let data = response.data;
  console.log(data);
  return data;
}

export async function increaseWins(user) {
  let response = await axios.post(
    "https://drawguesser-backend.onrender.com:10000/user/increaseWins",
    user
  );
  let data = response.data;
  return data;
}
