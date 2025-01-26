"use client";
import { useState } from "react";
import { z } from "zod";
import { Tags, Skills } from "@/app/models/models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
    // estimatedtime: z.string(),
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
import { Button } from "@/components/ui/button";


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


    const handleRemoveTag = (tag: string) => {
        form.setValue("projecttags", form.getValues().projecttags.filter(t => t !== tag));
    }

    const handleRemoveSkill = (skill: string) => {
        form.setValue("skills", form.getValues().skills.filter(s => s !== skill));
    }


    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    // Convert enums to array of options
    const tagsOptions = Object.values(Tags).map(tag => tag.toString());
    const skillsOptions = Object.values(Skills).map(skill => skill.toString());

    const watchedTags = form.watch("projecttags");
    const watchedSkills = form.watch("skills");


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
            formData.append("projectdescription", formValues.projectdescription);
            formData.append("projectlink", formValues.projectlink);
            formData.append("githublink", formValues.githublink);
            formData.append("projecttags", JSON.stringify(formValues.projecttags));
            formData.append("skills", JSON.stringify(formValues.skills));


            // Append each file to the form data. The 3rd param sets the filename (including any subfolders).
            // "files" will be the field name we use in `upload.array("files")` on the server
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append("files", file, file.webkitRelativePath);
            }

            // iterate and log formdata
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }


            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data: UploadResponse = await response.json();
            console.log("data", data);
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
                    className="p-6 bg-white rounded-lg shadow-md space-y-6 w-3/4"
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
                                <FormLabel className="text-black">Projectname</FormLabel>
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
                                            if (!field.value.includes(value)) {
                                                field.onChange([...field.value, value]); // Append new skill
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
                            <Badge key={skills} className="px-2 py-1 text-sm bg-blue-100 text-blue-600">
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
                                            if (!field.value.includes(value)) {
                                                field.onChange([...field.value, value]); // Append new skill
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
        </div >
    );
}
