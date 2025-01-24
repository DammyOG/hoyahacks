export interface User {
    id: string;
    name: string;
    email: string;
    college_id: string;
    major?: string;
    profile_picture?: string;
    resume?: string;
    bio?: string;
    created_at: Date;
    updated_at: Date;
    projects_link: string;
    bucket_link: string;
   }
   
export   interface Project {
    id: string;
    title: string;
    image?: string;
    banner_image?: string;
    likes?: number;
    description?: string;
    owner_id: string;
    created_at: Date;
    updated_at: Date;
    collaborators?: string[];
    project_folder: string;
    tags: string[];
    skills: string[];
    github_link?: string;
    comment_doc_id?: string;
   }
   
export   interface College {
    id: string;
    name: string;
    domain: string;
    location?: string;
    logo?: string;
    created_at: Date;
    updated_at: Date;
   }
   
export   interface Event {
       id: string;
       title: string;
       description?: string;
       image?: string;
       location?: string;
       date: Date;
       start_time: Date;
       end_time: Date;
       created_at: Date;
       updated_at: Date;
       link?: string;
       tags: string[];
   }
   
export   enum Tags {
       'Web Development',
       'Mobile Development',
       'Data Science',
       'AI/ML',
       'Game Development',
       'Software Engineering',
       'Hardware Development',
       'UI/UX Design'
   }
   
export   enum Skills {
       'HTML',
       'CSS',
       'JavaScript',
       'React',
       'Angular',
       'Vue',
       'Node.js',
       'Express',
       'MongoDB',
       'SQL',
       'Python',
       'Java',
       'C++',
       'C#',
       'Swift',
       'Kotlin',
       'Flutter',
       'React Native',
       'Tensorflow',
       'PyTorch',
       'Keras',
       'Scikit-learn',
       'Pandas',
       'Numpy',
       'Matplotlib',
       'Seaborn',
       'Plotly',
       'D3.js',
       'Unity',
       'Unreal Engine',
       'CryEngine',
       'Blender',
       'Maya',
       '3ds Max',
       'AutoCAD',
       'SolidWorks',
       'Figma',
       'Sketch',
       'Adobe XD',
       'InVision',
       'Zeplin'
   }
