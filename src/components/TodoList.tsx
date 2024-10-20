import { Box, Grid, Card, Button, CardContent } from "@mui/material";
import TodoCard from "./TodoCard";
import { useState } from "react";
import DialogTodo from "./DialogTodo";
import { Dayjs } from "dayjs";
import DialogConfirm from "./DialogConfirm";

interface TodoList {
  id: string;
  title: string;
  isCompleted: boolean;
  deadline?: Dayjs;
}
interface ConfirmDialog {
  open: boolean;
  id: string;
  type: string;
}
const TodoList: React.FC = () => {
  const [list, setList] = useState<TodoList[]>([]);

  const [openDalog, setOpenDialog] = useState(false);
  const [openConfirmDalog, setOpenConfirmDialog] = useState<ConfirmDialog>({
    open: false,
    id: "",
    type: "create",
  });

  const onChange = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList[index].isCompleted = !newList[index].isCompleted;
    setList(newList);
  };
  const [data, setData] = useState<TodoList | undefined>(undefined);

  const ondelete = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setOpenConfirmDialog({ open: false, id: "", type: "create" });
  };

  return (
    <Box component="div">
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} textAlign={"center"}>
          <h1>TODO LIST</h1>
        </Grid>
        <Grid item xs={8} ml={4} mr={4}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#a002af" }}
              onClick={() => setOpenDialog(true)}
            >
              Add Task
            </Button>
          </Grid>
          {list && list.length > 0 && (
            <Card sx={{ backgroundColor: "#f1eef1", mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  {list.map((item, index) => (
                    <Grid key={`grid-${item.id}-${index}`} item xs={12} mt={1}>
                      <TodoCard
                        key={item.id}
                        title={item.title}
                        isCompleted={item.isCompleted}
                        deadline={item.deadline}
                        onChange={() => onChange(item.id)}
                        onOpenDialog={() => {
                          setData(item);
                          setOpenDialog(true);
                        }}
                        ondelete={() =>
                          setOpenConfirmDialog({
                            open: true,
                            id: item.id,
                            type: "delete",
                          })
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      <DialogTodo
        open={openDalog}
        onClose={() => setOpenDialog(false)}
        onSubmit={(data) => {
          const index = list.findIndex((item) => item.id === data.id);
          if (index === -1) {
            setList([...list, data]);
          } else {
            const newList = [...list];
            newList[index] = data;
            setList(newList);
          }
          setOpenDialog(false);
          setData({} as TodoList);
        }}
        data={data}
      />
      <DialogConfirm
        open={openConfirmDalog.open}
        onClose={() => {
          setOpenConfirmDialog({ open: false, id: "", type: "create" });
        }}
        onSubmit={() => {
          ondelete(openConfirmDalog.id);
        }}
        type={openConfirmDalog.type}
      />
    </Box>
  );
};

export default TodoList;
