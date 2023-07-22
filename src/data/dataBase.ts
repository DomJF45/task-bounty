export interface iList {
  id: string;
  listTitle: string;
}

export enum TaskStatus {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  InReview = "In Review",
  Complete = "Complete",
}

export interface iTask {
  id: string;
  name: string;
  content: string;
  expYield: number;
  status: "Complete" | "In Progress" | "Not Started" | "In Review";
  subTask: iTask[];
}

export interface iStatusColumn {
  [key: string]: {
    name: string;
    items: iTask[];
  };
}

export interface iProject {
  id: string;
  name: string;
  tasks: iTask[];
  completedTasks: number;
  incompletedTasks: number;
  projectManager: string;
  rank: "S" | "A" | "B" | "C" | "D" | "E" | "F";
  exp: number;
  takenBy: string | undefined;
}

export interface iUser {
  id: string;
  firstName: string;
  lastName: string;
  icon?: string;
  wallet: number;
  email: string;
  password: string;
  level: number;
  totalExp: number;
  totalPoints: number;
  totalExpThisMonth: number;
  weekStreak: number;
  progress: number;
  following: string[];
  followers: string[];
  keyQuest: iProject | undefined;
  keyTasks: iStatusColumn;
  title: "Manager (PM)" | "Contributor (IC)";
  supervisor: string;
  team: string[];
}

// implement scrum master duties

// export interface iScrumMaster extends iUser {
/*
const mockTasks: iTask[] = [
  {
    id: "1",
    name: "CSS Bug",
    content: "Weird CSS bug that affects navbar sticky positioning",
    yeild: 50,
    status: TaskStatus.NotStarted,
    listId: "0",
  },
  {
    id: "2",
    name: "Responsive Design",
    content: "Make navbar responsive for mobile devices",

    yeild: 80,
    status: TaskStatus.InProgress,
    listId: "0",
  },
  {
    id: "3",
    name: "Accessibility Improvements",
    content: "Improve keyboard navigation and ARIA attributes",

    yeild: 30,
    status: TaskStatus.InReview,
    listId: "0",
  },
];

const mockColumns: iStatusColumn = {
  "not-started": {
    name: "Not Started",
    items: mockTasks,
  },
  "in-progress": {
    name: "In Progress",
    items: [],
  },
  "in-review": {
    name: "In Review",
    items: [],
  },
  complete: {
    name: "Complete",
    items: [],
  },
};

interface iDB {
  users: iUser[];
  projects?: iProject[];
}

export const dataBase: iDB = {
  users: [
    {
      id: "0",
      firstName: "Jane",
      lastName: "Doe",
      icon: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
      wallet: 500,
      title: "Manager (PM)",
      team: ["1", "2", "3"],
      email: "janedoe@mail.com",
      password: "password123",
      level: 4,
      totalExp: 4500,
      totalPoints: 4500,
      totalExpThisMonth: 4500,
      weekStreak: 4,
      progress: 60,
      following: [],
      followers: [],
      keyQuest: undefined,
      keyTasks: INITIAL_COLUMNS,
      supervisor: "",
    },
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      wallet: 200,
      title: "Contributor (IC)",
      supervisor: "0",
      email: "John Doe",
      password: "password123",
      level: 4,
      totalExp: 4500,
      totalPoints: 4500,
      totalExpThisMonth: 4500,
      weekStreak: 4,
      progress: 60,
      following: [],
      followers: [],
      keyQuest: undefined,
      keyTasks: INITIAL_COLUMNS,
      team: [],
    },
    {
      id: "2",
      firstName: "Dane",
      lastName: "Joe",
      wallet: 50,
      title: "Contributor (IC)",
      supervisor: "0",
      email: "danejoe@mail.com",
      password: "password123",
      level: 4,
      totalExp: 4500,
      totalPoints: 4500,
      totalExpThisMonth: 4500,
      weekStreak: 4,
      progress: 60,
      following: [],
      followers: [],
      keyQuest: undefined,
      keyTasks: INITIAL_COLUMNS,
      team: [],
    },
    {
      id: "3",
      firstName: "Dohn",
      lastName: "Joe",
      wallet: 150,
      title: "Contributor (IC)",
      supervisor: "0",
      email: "dohnjoe@mail.com",
      password: "password123",
      level: 4,
      totalExp: 4500,
      totalPoints: 4500,
      totalExpThisMonth: 4500,
      weekStreak: 4,
      progress: 60,
      following: [],
      followers: [],
      keyQuest: undefined,
      keyTasks: INITIAL_COLUMNS,
      team: [],
    },
    {
      id: "4",
      firstName: "Big",
      lastName: "Mac",
      wallet: 150,
      title: "Manager (PM)",
      team: [],
      email: "bigmac@mail.com",
      password: "password123",
      level: 4,
      totalExp: 4500,
      totalPoints: 4500,
      totalExpThisMonth: 4500,
      weekStreak: 4,
      progress: 60,
      following: [],
      followers: [],
      keyQuest: undefined,
      keyTasks: INITIAL_COLUMNS,
      supervisor: "",
    },
  ],
  projects: [
    {
      id: "1",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 1,
      incompletedTasks: 2,
      projectManager: "0",
      rank: "S",
      exp: 50,
      takenBy: undefined,
    },
    {
      id: "2",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 1,
      incompletedTasks: 2,
      projectManager: "0",
      rank: "A",
      exp: 20,
      takenBy: undefined,
    },
    {
      id: "3",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 1,
      incompletedTasks: 2,
      projectManager: "0",
      rank: "S",
      exp: 30,
      takenBy: undefined,
    },
    {
      id: "4",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 0,
      incompletedTasks: 3,
      projectManager: "0",
      rank: "B",
      exp: 10,
      takenBy: undefined,
    },
    {
      id: "5",
      name: "Big Project",
      tasks: mockColumns,
      completedTasks: 0,
      incompletedTasks: 3,
      projectManager: "0",
      rank: "S",
      exp: 90,
      takenBy: undefined,
    },
  ],
};

*/
