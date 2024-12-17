import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
export default function SearchInput() {
  return (
    <div className="container-search-input">
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          type="search"
          endAdornment={
            <InputAdornment position="start">
              <IconButton edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </div>
  );
}
