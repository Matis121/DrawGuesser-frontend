import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function GameSettings({ rounds, handleChangeRounds, handleChangeTime, counter }) {
  return (
    <>
    <FormControl fullWidth>
      <InputLabel>Rounds</InputLabel>
      <Select label="Rounds" value={rounds} onChange={handleChangeRounds}>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel>Time of rounds</InputLabel>
      <Select label="Time of rounds" value={counter} onChange={handleChangeTime}>
        <MenuItem value={30}>30s</MenuItem>
        <MenuItem value={45}>45s</MenuItem>
        <MenuItem value={60}>60s</MenuItem>
      </Select>
    </FormControl>
    </>
  );
}
