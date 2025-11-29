import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";

export function AvatarUploadModal({ open, setOpen, onUpload }) {
    const [file, setFile] = useState(null);

    const handleSubmit = async () => {
        if (file) {
            await onUpload(file); // call your save function
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload new profile picture</DialogTitle>
                </DialogHeader>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border p-2 rounded"
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <Button onClick={handleSubmit} disabled={!file}>
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
