import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QueryKeys from "../types/QueryKeys";
import Request from "../utils/Request";
import UIWCodeEditor from "@uiw/react-textarea-code-editor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCallback } from "react";

interface Snippet {
  id: string;
  language: string;
  code: string;
  description: string;
  updated_at: string;
  created_at: string;
}

interface Props {
  language: string;
  query: string;
}

const getSnippets = (language: string, query?: string) =>
  Request.get<{ snippets: Snippet[] }>(
    `${import.meta.env.VITE_BASE_URL}snippets/${language}/get${
      query && `?query=${query}`
    }`
  );

const MainSection = ({ language, query }: Props) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: [QueryKeys.SNIPPETS, language, query],
    queryFn: () => getSnippets(language, query),
    enabled: Boolean(language),
  });
  
  const deleteSnippetMutation = useMutation<
    undefined,
    undefined,
    { id: string }
  >({
    mutationFn: (requestData) =>
      Request.post(
        `${import.meta.env.VITE_BASE_URL}snippets/delete`,
        requestData
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SNIPPETS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LANGUAGES],
      });
    },
  });

  const onDelete = useCallback(
    async (id: string) => {
      deleteSnippetMutation.mutate({ id });
    },
    [deleteSnippetMutation]
  );

   if (isPending || error) return <Skeleton variant="rectangular" animation="wave" />;

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      {data.snippets.map((snippet) => (
        <Card variant='outlined' sx={{ marginBottom: 2 }}>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              onClick={() => onDelete(snippet.id)}
              color="error"
              startIcon={<DeleteForeverIcon />}
              variant='outlined'
            >
              Delete
            </Button>
          </CardActions>
          <CardContent>
            <Box sx={{ marginBottom: 2 }}>
              <UIWCodeEditor
                value={snippet.code}
                language={snippet.language}
                padding={15}
                style={{
                  minHeight: 150,
                  fontSize: 16,
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </Box>
            <Typography variant="body2">{snippet.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MainSection;
