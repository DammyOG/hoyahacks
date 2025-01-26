"use client";
import React, { useRef, useState, useEffect } from "react";
import { z } from "zod";
import { Tags, Skills } from "@/app/models/models";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { uploadFile, uploadProjectPicture } from "@/lib/Auth";
import { useSession } from "@/components/providers/session";
import Sidebar from "@/components/ui/sidebar";

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
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface UploadResponse {
    message: string;
    urls?: string[]; // We'll store all uploaded files' URLs here
    error?: string;
}

const uploadSchema = z.object({
    files: z.array(
        z.object({
            file: z.instanceof(File),
        })
    ),
    projectname: z
        .string()
        .min(3, { message: "Project name must be at least 3 characters long" }),
    projectdescription: z.string().optional(),
    projectlink: z.string().optional(),
    githublink: z.string().optional(),
    projecttags: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    projectPicture: z.string().optional(),
    // estimatedtime: z.string(),
});

export default function Upload() {
    const router = useRouter();
    const { toast } = useToast();

    const { session } = useSession();
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
        form.setValue(
            "projecttags",
            (form.getValues().projecttags || []).filter((t) => t !== tag)
        );
    };

    const handleRemoveSkill = (skill: string) => {
        form.setValue(
            "skills",
            (form.getValues().skills || []).filter((s) => s !== skill)
        );
    };

    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    // Add state for project picture
    const [projectPicture, setProjectPicture] = useState<File | null>(null);
    const [projectPicturePath, setProjectPicturePath] = useState<string>("");

    // Convert enums to array of options
    const tagsOptions = Object.values(Tags).map((tag) => tag.toString());
    const skillsOptions = Object.values(Skills).map((skill) => skill.toString());

    const watchedTags = form.watch("projecttags") || [];
    const watchedSkills = form.watch("skills") || [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFiles(e.target.files);
            form.setValue(
                "files",
                filesArray.map((file) => ({ file }))
            ); // Explicitly set files in the form
        }
    };

    const handleProjectPictureChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files[0] && session?.email) {
            const file = e.target.files[0];
            setProjectPicture(file);

            try {
                const result = await uploadProjectPicture(
                    file,
                    session.email,
                    form.getValues().projectname
                );
                setProjectPicturePath(result.filePath);
            } catch (error) {
                console.error("Failed to upload project picture:", error);
            }
        }
    };

    const handleUpload = async (data: any) => {
        if (!files || !session?.email) return;
        setUploading(true);

        try {
            // Upload files to S3 and collect their paths
            const uploadedFilePaths = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const res = await uploadFile(file, session.email);
                console.log(`✅ Uploaded ${file.name} to S3:`, res);
                if (res.filePath) {
                    uploadedFilePaths.push(res.filePath);
                }
            }

            // Create project with file paths
            const projectData = {
                email: session.email,
                projectname: data.projectname,
                projectdescription: data.projectdescription || "",
                projectlink: data.projectlink || "",
                githublink: data.githublink || "",
                projecttags: data.projecttags || [],
                skills: data.skills || [],
                filePaths: uploadedFilePaths,
                projectPicture: projectPicturePath,
            };

            // Send session in headers
            const response = await fetch("http://localhost:5000/api/users/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("userSession") || "",
                },
                body: JSON.stringify(projectData),
            });

            const result = await response.json();
            console.log("Project creation result:", result);

            if (result.success) {
                // Handle success (e.g., show success message, redirect)
                setUploadedUrls(uploadedFilePaths);
            }

            // redirect to home page using next
            toast({
                title: "Project uploaded successfully!",
            })
            router.push("/projects");
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-8 ml-64 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleUpload)}
                            className="p-6 bg-gray-800 rounded-lg shadow-xl space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="projectname"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-white">Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project name"
                                                {...field}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                hasError={!!form.formState.errors.projectname}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectdescription"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-white">
                                            Project Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project description"
                                                {...field}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="projectlink"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-white">Project link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project link"
                                                {...field}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                hasError={!!form.formState.errors.projectlink}
                                                type="url"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="githublink"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-white">Github link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter github link"
                                                {...field}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                hasError={!!form.formState.errors.githublink}
                                                type="url"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-2 flex flex-wrap gap-2">
                                {watchedTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        className="px-2 py-1 text-sm bg-blue-900 text-blue-100 hover:bg-blue-800"
                                    >
                                        {tag}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-2 text-blue-200 hover:text-blue-100"
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
                                        <FormLabel className="text-white">Tags</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                if (!(field.value ?? []).includes(value)) {
                                                    field.onChange([...(field.value || []), value]);
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                                                <SelectValue placeholder="Select tags" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                {tagsOptions.map((tag, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={tag}
                                                        className="hover:bg-gray-700"
                                                    >
                                                        {tag}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-gray-400">
                                            Select relevant tags for your project.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <div className="mt-2 flex flex-wrap gap-2">
                                {watchedSkills.map((skills) => (
                                    <Badge
                                        key={skills}
                                        className="px-2 py-1 text-sm bg-blue-900 text-blue-100 hover:bg-blue-800"
                                    >
                                        {skills}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-2 text-blue-200 hover:text-blue-100"
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
                                        <FormLabel className="text-white">Skills</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    if (!(field.value ?? []).includes(value)) {
                                                        field.onChange([...(field.value || []), value]);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                                                    <SelectValue placeholder="Select skills" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                    {skillsOptions.map((skill, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={skill}
                                                            className="hover:bg-gray-700"
                                                        >
                                                            {skill}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Select the skills used in your project.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="projectPicture"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">
                                            Project Picture
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProjectPictureChange}
                                                className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-gray-600 hover:file:bg-gray-500"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Upload a picture to represent your project
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="files"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Upload Files</FormLabel>
                                        <FormControl>
                                            <input
                                                type="file"
                                                multiple
                                                // @ts-ignore - TS doesn't know about the webkitdirectory attribute,
                                                webkitdirectory="true"
                                                onChange={handleFileChange}
                                                className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-gray-600 hover:file:bg-gray-500"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={!files || uploading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600"
                            >
                                {uploading ? "Uploading..." : "Submit"}
                            </Button>
                        </form>

                        {uploadedUrls.length > 0 && (
                            <div className="mt-4 p-6 bg-gray-800 rounded-lg">
                                <p className="text-white">Uploaded successfully!</p>
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
            </div>
        </div>
    );
}
