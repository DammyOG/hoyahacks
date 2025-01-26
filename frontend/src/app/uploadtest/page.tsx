"use client";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { Tags, Skills } from "@/app/models/models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
import { Button } from "@/components/ui/button";

interface UploadResponse {
    message: string;
    urls?: string[]; // We'll store all uploaded files' URLs here
    error?: string;
}

const uploadSchema = z.object({
    files: z.array(
        z.object({
            file: z.instanceof(File)
        })
    ),
    projectname: z.string().min(3, { message: "Project name must be at least 3 characters long" }),
    projectdescription: z.string().optional(),
    projectlink: z.string().optional(),
    githublink: z.string().optional(),
    projecttags: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    // estimatedtime: z.string(),
});


export default function Upload() {
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            files: [],
            projectname: "",
            projectdescription: "",
            projectlink: "",
            githublink: "",
            projecttags: [] as string[],
            skills: [] as string[],
        },
    });



    const hiddenFileInput = useRef<HTMLInputElement | null>(null); // Hidden file input reference
    const handleRemoveTag = (tag: string) => {
        form.setValue("projecttags", (form.getValues().projecttags || []).filter(t => t !== tag));
    }

    const handleRemoveSkill = (skill: string) => {
        form.setValue("skills", (form.getValues().skills || []).filter(s => s !== skill));
    }


    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    // Convert enums to array of options
    const tagsOptions = Object.values(Tags).map(tag => tag.toString());
    const skillsOptions = Object.values(Skills).map(skill => skill.toString());

    const watchedTags = form.watch("projecttags") || [];
    const watchedSkills = form.watch("skills") || [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFiles(e.target.files);
            form.setValue("files", filesArray.map(file => ({ file, id: crypto.randomUUID() }))); // Explicitly set files in the form
        }
    };

    const handleUpload = async (fileData: z.infer<typeof uploadSchema>) => {
        console.log("fileData", fileData);

        if (!files) return;

        setUploading(true);

        try {
            const formData = new FormData();
            const formValues = form.getValues();

            formData.append("projectname", formValues.projectname);
            formData.append("projectdescription", formValues.projectdescription || "");
            formData.append("projectlink", formValues.projectlink || "");
            formData.append("githublink", formValues.githublink || "");
            formData.append("projecttags", JSON.stringify(formValues.projecttags));
            formData.append("skills", JSON.stringify(formValues.skills));

            // fileData.files.forEach((file: any) => {
            //     formData.append("files", file.file); // file.file contains the actual File object
            // });


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
            console.log("Upload response", data);
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
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Errors:", form.formState.errors); // Check validation errors
                        form.handleSubmit(handleUpload)(e); // Call handleUpload only if validation passes
                    }}
                    className="p-6 bg-white rounded-lg shadow-md space-y-6 w-3/4 flex flex-col "
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
                            <FormItem className="space-y-2">
                                <FormLabel className="text-black">Project Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter project name"
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
                            <FormItem className="space-y-2">
                                <FormLabel className="text-black">Project Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your project description"
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
                            <FormItem className="space-y-2">
                                <FormLabel className="text-black">Project link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter project link"
                                        {...field}
                                        hasError={!!form.formState.errors.projectlink}
                                        type="url"
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
                            <FormItem className="space-y-2">
                                <FormLabel className="text-black">Github link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter github link"
                                        {...field}
                                        hasError={!!form.formState.errors.githublink}
                                        type="url"
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


                    <div className="mt-2 flex flex-wrap gap-2">
                        {watchedTags.map((tag) => (
                            <Badge key={tag} className="px-2 py-1 text-sm bg-blue-100 text-blue-600">
                                {tag}{" "}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    ✕
                                </Button>
                            </Badge>
                        ))}
                    </div>

                    <FormField
                        control={form.control}
                        name="projecttags"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-black">Tags</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            if (!(field.value ?? []).includes(value)) {
                                                field.onChange([...(field.value || []), value]); // Append new skill
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select tags" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tagsOptions.map((tag, index) => (
                                                <SelectItem key={index} value={tag}>
                                                    {tag}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Select relevant tags for your project.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-2 flex flex-wrap gap-2">
                        {watchedSkills.map((skills) => (
                            <Badge key={skills} className="px-2 py-1 text-sm bg-blue-100 text-blue-600 " >
                                {skills}{" "}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() => handleRemoveSkill(skills)}
                                >
                                    ✕
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-black">Skills</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            if (!(field.value ?? []).includes(value)) {
                                                field.onChange([...(field.value || []), value]); // Append new skill
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select skills" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {skillsOptions.map((skill, index) => (
                                                <SelectItem key={index} value={skill}>
                                                    {skill}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Select the skills used in your project.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        name="files"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Files</FormLabel>
                                <FormControl>
                                    <input
                                        type="file"
                                        multiple
                                        // @ts-ignore - TS doesn't know about the webkitdirectory attribute,
                                        webkitdirectory="true"
                                        onChange={handleFileChange}
                                        className="block w-full border border-gray-300 rounded-lg"
                                    />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!files || uploading}
                        className="px-4 py-2 bg-blue-500 text-black rounded-xl disabled:bg-gray-400 w-28"
                    >
                        {uploading ? "Uploading..." : "Submit"}
                    </Button>
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
        </div >
    );
}
