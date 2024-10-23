import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Skeleton, Toolbar } from "@mui/material";
import { drawerWidth } from "../types/const";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "../types/QueryKeys";
import Request from "../utils/Request";
import useScreenSize from "./hooks/useScreenSize";

interface Props {
  language: string;
  setLanguage: (language: string) => void;
  open: boolean;
  onDrawerClose: () => void;
}

const Sidebar = ({ language: activeLanguage, setLanguage, open, onDrawerClose }: Props) => {
  const { isSm } = useScreenSize();
  const { isPending, error, data } = useQuery({
    queryKey: [QueryKeys.LANGUAGES],
    queryFn: () => Request.get<{ languages: string[] }>(`${import.meta.env.VITE_BASE_URL}languages/get`),
  });

  if (isPending || error) return <Skeleton variant="rectangular" width={210} height={118} />;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={isSm ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={onDrawerClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {data.languages.map((language) => (
          <ListItem key={language} disablePadding>
            <ListItemButton selected={language === activeLanguage} onClick={() => setLanguage(language)}>
              <ListItemText primary={language} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
