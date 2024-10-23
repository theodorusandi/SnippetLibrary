import { Box, CssBaseline } from "@mui/material";
import { useCallback, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainSection from "./MainSection";
import AddSnippetDialog from "./AddSnippetDialog";
import { debounce } from "../utils/Common";

const Dashboard = () => {
  const [language, setLanguage] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [addSnippetDialogOpen, setAddSnippetDialogOpen] =
    useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const debouncedSetQuery = debounce(setQuery);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar onAddNew={() => setAddSnippetDialogOpen(true)} onQueryChange={debouncedSetQuery} onToggleDrawer={toggleDrawer} />
      <Sidebar setLanguage={setLanguage} language={language} open={drawerOpen} onDrawerClose={() => setDrawerOpen(false)} />
      <MainSection language={language} query={query} />
      <AddSnippetDialog
        open={addSnippetDialogOpen}
        onClose={(selectedLanguage) => {
          setAddSnippetDialogOpen(false);
          if (selectedLanguage) {
            setLanguage(selectedLanguage);
          }
        }}
      />
    </Box>
  );
}

export default Dashboard;