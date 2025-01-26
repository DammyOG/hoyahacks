"use client";
import { useState } from "react";
import { TypeOf, z } from "zod";

interface UploadResponse {
    message: string;
    urls?: string[]; // We'll store all uploaded files' URLs here
    error?: string;
}

const uploadSchema = z.object({
    files: z.array(z.instanceof(File)),
    projectname: z.string(),
    projectdescription: z.string(),
    projectlink: z.string(),
    githublink: z.string(),
    projecttags: z.array(z.string()),
    skills: z.array(z.string()),
    estimatedtime: z.string(),
});

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function Upload() {
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            files: [],
            projectname: "",
        },
    });

    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!files) return;

        setUploading(true);

        try {
            const formData = new FormData();
            const formValues = form.getValues();

            formData.append("projectname", formValues.projectname);

            // Append each file to the form data. The 3rd param sets the filename (including any subfolders).
            // "files" will be the field name we use in `upload.array("files")` on the server
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append("files", file, file.webkitRelativePath);
            }


            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data: UploadResponse = await response.json();
            if (data.urls && data.urls.length > 0) {
                setUploadedUrls(data.urls);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
            <Form {...form}>
                <form
                    onSubmit={handleUpload}
                    className="p-6 bg-white rounded-lg shadow-md"
                >
                    {/**
         * key attributes:
         *   multiple
         *   webkitdirectory
         */}
                    <FormField
                        control={form.control}
                        name="projectname"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Projectname</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="@edu.com"
                                        {...field}
                                        hasError={!!form.formState.errors.projectname}
                                    />
                                </FormControl>
                                <div className="h-1  text-xs md:text-sm">
                                    {form.formState.errors.projectname && (
                                        <FormMessage>
                                            {form.formState.errors.projectname?.message}
                                        </FormMessage>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projectname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Projectname</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="@edu.com"
                                        {...field}
                                        hasError={!!form.formState.errors.projectname}
                                    />
                                </FormControl>
                                <div className="h-1  text-xs md:text-sm">
                                    {form.formState.errors.projectname && (
                                        <FormMessage>
                                            {form.formState.errors.projectname?.message}
                                        </FormMessage>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projectdescription"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">projectdescription</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tell us about your project"
                                        {...field}
                                        hasError={!!form.formState.errors.projectdescription}
                                    />
                                </FormControl>
                                <div className="h-1  text-xs md:text-sm">
                                    {form.formState.errors.projectdescription && (
                                        <FormMessage>
                                            {form.formState.errors.projectdescription?.message}
                                        </FormMessage>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projectlink"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">projectlink</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="@edu.com"
                                        {...field}
                                        hasError={!!form.formState.errors.projectlink}
                                    />
                                </FormControl>
                                <div className="h-1  text-xs md:text-sm">
                                    {form.formState.errors.projectlink && (
                                        <FormMessage>
                                            {form.formState.errors.projectlink?.message}
                                        </FormMessage>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="githublink"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">githublink</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="@edu.com"
                                        {...field}
                                        hasError={!!form.formState.errors.githublink}
                                    />
                                </FormControl>
                                <div className="h-1  text-xs md:text-sm">
                                    {form.formState.errors.githublink && (
                                        <FormMessage>
                                            {form.formState.errors.githublink?.message}
                                        </FormMessage>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projecttags"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">projecttags</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="@edu.com"
                                        {...field}
                                        hasError={!!form.formState.errors.projecttags}
                                    />
                                </FormControl>
                                <div className="h-1  text-xs md:text-sm">
                                    {form.formState.errors.projecttags && (
                                        <FormMessage>
                                            {form.formState.errors.projecttags?.message}
                                        </FormMessage>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />

                    <input
                        type="file"
                        multiple
                        // @ts-ignore - TS doesn't know about the webkitdirectory attribute,
                        // but it's widely supported in modern browsers (Chrome, Edge, Safari).
                        webkitdirectory="true"
                        onChange={handleFileChange}
                        className="mb-4"
                    />
                    <button
                        type="submit"
                        disabled={!files || uploading}
                        className="px-4 py-2 bg-blue-500 text-black rounded disabled:bg-gray-400"
                    >
                        {uploading ? "Uploading..." : "Upload Folder"}
                    </button>
                </form>

                {uploadedUrls.length > 0 && (
                    <div className="mt-4">
                        <p className="text-black">Uploaded successfully!</p>
                        <ul>
                            {uploadedUrls.map((url, idx) => (
                                <li key={idx}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </Form>
        </div>
    );
}
