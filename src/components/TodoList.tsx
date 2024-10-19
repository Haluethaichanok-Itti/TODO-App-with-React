import { Box, Grid, Card, Button, CardContent } from "@mui/material";
import TodoCard from "./TodoCard";
import { useState } from "react";
import DialogTodo from "./DialogTodo";

interface TodoList { 
    id: string
    title: string
    isCompleted: boolean
    deadline?: Date
  }

const TodoList: React.FC = () => {

const [list, setList] = useState<TodoList[]>([]);

const [openDalog, setOpenDialog] = useState(false);

const onChange = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList[index].isCompleted = !newList[index].isCompleted;
    setList(newList);
}
const [data, setData] = useState<TodoList>({} as TodoList);

const ondelete = (id: string) => {
    setList(list.filter((item) => item.id !== id))
}
    return (
        <Box component="div">
        <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12} textAlign={'center'}>
              <h1>TODO LIST</h1>
            </Grid>
          <Grid item xs={8} ml={4} mr={4} >
          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: '#a002af' }} onClick={() => setOpenDialog(true)}>Add Task</Button>
            </Grid>
          {list &&list.length > 0 &&<Card sx={{ backgroundColor: '#f1eef1', mt: 2 }}>
          <CardContent>
          <Grid container spacing={2} >
            
             {list.map((item,index) => (
                <Grid key={`grid-${item.id}-${index}`} item xs={12} mt={1}>
                 <TodoCard key={item.id} title={item.title} isCompleted={item.isCompleted} onChange={() => onChange(item.id)}  onOpenDialog={() => { setData(item)
                    setOpenDialog(true)}}
                    ondelete={() => ondelete(item.id)}
                    />
                 </Grid>
             ))}
           
          </Grid>
          </CardContent>
        </Card>}
        </Grid>
        </Grid>
            <DialogTodo open={openDalog} onClose={() => setOpenDialog(false)} onSubmit={(data) => {
                const index = list.findIndex((item) => item.id === data.id);
                console.log(index)
                if(index===-1){setList([...list, data])}else{ const newList = [...list];
                    newList[index] = data;
                    setList(newList);}
            setOpenDialog(false) 
            setData({} as TodoList)
            }} data={data}/>
            </Box>
    )
}

export default TodoList