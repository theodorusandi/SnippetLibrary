import { AppBar, Box, Button, InputBase, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../types/const";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useScreenSize from "./hooks/useScreenSize";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "./hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  onAddNew: () => void;
  onQueryChange: (query: string) => void;
  onToggleDrawer: () => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ onAddNew, onQueryChange, onToggleDrawer }: Props) => {
  const { isSm } = useScreenSize();
  const { logout } = useAuth();

  const handleOnQueryChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onQueryChange(e.target.value);
    },
    [onQueryChange]
  );
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={onToggleDrawer} sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ display: isSm ? "none" : "block", marginRight: 2 }}>
          Snippet Library
        </Typography>
        <Button onClick={onAddNew} variant="contained">
          {isSm ? <AddIcon /> : "Add New"}
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase onChange={handleOnQueryChange} placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={logout} color="error">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
