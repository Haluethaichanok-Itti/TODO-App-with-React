import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Grid,
    TextField,
    FormControl,
    DialogContent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogConfirm from "./DialogConfirm";

interface TodoList {
    id: string;
    title: string;
    isCompleted: boolean;
    deadline?: Dayjs;
}

interface DialogTodoProps {
    open: boolean;
    onSubmit: (data: TodoList) => void;
    onClose: () => void;
    data?: TodoList;
}
const DialogTodo: FC<DialogTodoProps> = ({ open, onSubmit, onClose, data }) => {
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState<Dayjs>(dayjs(new Date()));
    const [id, setId] = useState<string>(uuidv4());
    const [openDalog, setOpenDialog] = useState(false);

    useEffect(() => {
        setName(data?.title || "");
        setDeadline(dayjs(data?.deadline) || dayjs(new Date()));
        setId(data?.id || uuidv4());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth={"lg"}
            fullWidth
        >
            <DialogTitle>{"Add Task"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={9} mt={1}>
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3} mt={0}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker", "DatePicker"]}>
                                    <DatePicker
                                        label="Deadline"
                                        value={deadline}
                                        onChange={(newValue) => {
                                            if (newValue !== null) {
                                                setDeadline(newValue);
                                            }
                                        }}
                                        format="DD-MM-YYYY"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                >
                    Save
                </Button>
            </DialogActions>
            <DialogConfirm
                open={openDalog}
                onClose={() => { setOpenDialog(false); }}
                onSubmit={() => {
                    onSubmit({
                        id: id,
                        title: name,
                        isCompleted: false,
                        deadline: dayjs(deadline),
                    });
                }}
                type={data ? "edit" : "create"}
            />
        </Dialog>
    );
};

export default DialogTodo;
