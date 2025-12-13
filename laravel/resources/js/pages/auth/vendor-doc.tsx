import { useState, useRef, ChangeEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Upload, FileCheck } from 'lucide-react';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent } from '@/shadcn/ui/card';


type DocumentType = 'citizenship' | 'business';

export default function VendorDocumentUpload() {
    const [citizenshipFile, setCitizenshipFile] = useState<File | null>(null);
    const [businessFile, setBusinessFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const citizenshipInputRef = useRef<HTMLInputElement>(null);
    const businessInputRef = useRef<HTMLInputElement>(null);

    const { post, processing, errors } = useForm({
        citizenship_document: null as File | null,
        business_document: null as File | null,
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: DocumentType) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (type === 'citizenship') {
                setCitizenshipFile(file);
            } else {
                setBusinessFile(file);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!citizenshipFile || !businessFile) {
            alert('Please upload both documents');
            return;
        }

        const formData = new FormData();
        formData.append('citizenship_document', citizenshipFile);
        formData.append('business_document', businessFile);

        setIsSubmitting(true);

        post(route('vendor.documents.upload'), formData, {
            onSuccess: () => {
                alert('Documents uploaded successfully!');
                // Optionally redirect or show success message
            },
            onError: () => {
                alert('Error uploading documents. Please try again.');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
            forceFormData: true,
        } as any);
    };

    return (
        <GuestLayout>
            <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center">
                        <Card className="w-full max-w-4xl overflow-hidden p-0">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <form
                                    onSubmit={handleSubmit}
                                    className="p-6 md:p-8 space-y-6"
                                >
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h1 className="text-2xl font-bold">
                                            Vendor Document Submission
                                        </h1>
                                        <p className="text-sm text-balance text-muted-foreground">
                                            Upload the required documents to verify your vendor account
                                        </p>
                                    </div>

                                    {/* Citizenship Document */}
                                    <div className="space-y-2">
                                        <Label htmlFor="citizenship">
                                            Citizenship Document
                                        </Label>

                                        <label
                                            htmlFor="citizenship"
                                            className="
                                        flex flex-col items-center justify-center
                                        h-32
                                        border-2 border-dashed rounded-lg
                                        cursor-pointer
                                        transition-colors
                                        hover:bg-accent/50
                                    "
                                        >
                                            {citizenshipFile ? (
                                                <FileCheck className="h-8 w-8 text-green-500 mb-2" />
                                            ) : (
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                            )}

                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1 truncate max-w-full px-4">
                                                {citizenshipFile
                                                    ? citizenshipFile.name
                                                    : 'PDF, JPG, PNG (Max 5MB)'}
                                            </p>

                                            <Input
                                                id="citizenship"
                                                ref={citizenshipInputRef}
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange(e, 'citizenship')}
                                            />
                                        </label>

                                        {errors.citizenship_document && (
                                            <p className="text-sm text-destructive">
                                                {errors.citizenship_document}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Document */}
                                    <div className="space-y-2">
                                        <Label htmlFor="business">
                                            Business Document
                                        </Label>

                                        <label
                                            htmlFor="business"
                                            className="
                                        flex flex-col items-center justify-center
                                        h-32
                                        border-2 border-dashed rounded-lg
                                        cursor-pointer
                                        transition-colors
                                        hover:bg-accent/50
                                    "
                                        >
                                            {businessFile ? (
                                                <FileCheck className="h-8 w-8 text-green-500 mb-2" />
                                            ) : (
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                            )}

                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag & drop
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1 truncate max-w-full px-4">
                                                {businessFile
                                                    ? businessFile.name
                                                    : 'PDF, JPG, PNG (Max 5MB)'}
                                            </p>

                                            <Input
                                                id="business"
                                                ref={businessInputRef}
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange(e, 'business')}
                                            />
                                        </label>

                                        {errors.business_document && (
                                            <p className="text-sm text-destructive">
                                                {errors.business_document}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            asChild
                                            className="w-full sm:w-auto"
                                        >
                                            <Link href={route('dashboard')}>
                                                Back to Dashboard
                                            </Link>
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto"
                                            disabled={!citizenshipFile || !businessFile || isSubmitting || processing}
                                        >
                                            {isSubmitting || processing ? 'Uploading...' : 'Submit Documents'}
                                        </Button>
                                    </div>
                                </form>
                                <div className="relative hidden md:block bg-muted">
                                    <img
                                        src="https://thumbs.dreamstime.com/b/document-file-concept-sharing-transfer-8o8mentation-cloud-service-management-electronic-vector-illustration-flat-design-215405643.jpg"
                                        alt="Vendor Verification"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Your documents are securely stored and reviewed by our team.
                    </p>
                </div>
            </section>
        </GuestLayout>
    );
}
