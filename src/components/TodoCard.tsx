import {
  Grid,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs, { Dayjs } from "dayjs";

interface TodoListProps {
  title: string;
  isCompleted: boolean;
  deadline?: Dayjs;
  onChange: () => void;
  onOpenDialog: () => void;
  ondelete: () => void;
}
const TodoCard: FC<TodoListProps> = ({
  title,
  isCompleted,
  onChange,
  deadline,
  onOpenDialog,
  ondelete,
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={10.5}>
                <FormControlLabel
                  label={
                    <>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {title}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {dayjs(deadline).format("DD/MM/YYYY")}
                      </Typography>
                    </>
                  }
                  control={
                    <Checkbox
                      color="secondary"
                      checked={isCompleted}
                      onChange={onChange}
                    />
                  }
                />
              </Grid>
              <Grid item xs={1.5}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <IconButton aria-label="edit" onClick={onOpenDialog}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
                      aria-label="delete"
                      sx={{ width: "100%", height: "100%" }}
                      onClick={ondelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
