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
   
   export enum Tags {
    WebDevelopment = 'Web Development',
    MobileDevelopment = 'Mobile Development',
    DataScience = 'Data Science',
    AIML = 'AI/ML',
    GameDevelopment = 'Game Development',
    SoftwareEngineering = 'Software Engineering',
    HardwareDevelopment = 'Hardware Development',
    UIUXDesign = 'UI/UX Design',
  }
  
  export enum Skills {
    HTML = 'HTML',
    CSS = 'CSS',
    JavaScript = 'JavaScript',
    React = 'React',
    Angular = 'Angular',
    Vue = 'Vue',
    NodeJS = 'Node.js',
    Express = 'Express',
    MongoDB = 'MongoDB',
    SQL = 'SQL',
    Python = 'Python',
    Java = 'Java',
    CPlusPlus = 'C++',
    CSharp = 'C#',
    Swift = 'Swift',
    Kotlin = 'Kotlin',
    Flutter = 'Flutter',
    ReactNative = 'React Native',
    Tensorflow = 'Tensorflow',
    PyTorch = 'PyTorch',
    Keras = 'Keras',
    ScikitLearn = 'Scikit-learn',
    Pandas = 'Pandas',
    Numpy = 'Numpy',
    Matplotlib = 'Matplotlib',
    Seaborn = 'Seaborn',
    Plotly = 'Plotly',
    D3JS = 'D3.js',
    Unity = 'Unity',
    UnrealEngine = 'Unreal Engine',
    CryEngine = 'CryEngine',
    Blender = 'Blender',
    Maya = 'Maya',
    ThreeDSMax = '3ds Max',
    AutoCAD = 'AutoCAD',
    SolidWorks = 'SolidWorks',
    Figma = 'Figma',
    Sketch = 'Sketch',
    AdobeXD = 'Adobe XD',
    InVision = 'InVision',
    Zeplin = 'Zeplin',
  }
  