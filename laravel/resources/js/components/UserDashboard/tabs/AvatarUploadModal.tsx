import { Button } from '@/shadcn/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shadcn/ui/dialog';
import { useState } from 'react';

export function AvatarUploadModal({ open, setOpen, onUpload }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);

        if (selected) {
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async () => {
        if (file) {
            await onUpload(file);
            setOpen(false);
            setPreview(null);
            setFile(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Upload new profile picture</DialogTitle>
                </DialogHeader>

                {/* Preview Section */}
                {preview && (
                    <div className="flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 rounded-full object-cover border shadow"
                        />
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="rounded border p-2 w-full"
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
