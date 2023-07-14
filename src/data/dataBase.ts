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
  yeild: number;
  status: "Complete" | "In Progress" | "Not Started" | "In Review";
  listId: string;
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
  tasks: iStatusColumn;
  completedTasks: number;
  incompletedTasks: number;
  projectManager: {
    id: string;
    name: string;
  };
}

export interface iUser {
  id: string;
  name: string;
  icon?: string;
  wallet: number;
  email: string;
  password: string;
}

export interface iManager extends iUser {
  team: { id: number; name: string }[];
  title: "Manager (PM)";
}

export interface iContributor extends iUser {
  supervisor: {
    id: number;
    name: string;
  };
  title: "Contributor (IC)";
}

// implement scrum master duties

// export interface iScrumMaster extends iUser {

// }
//
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
  users: (iManager | iContributor)[];
  projects?: iProject[];
}

export const dataBase: iDB = {
  users: [
    {
      id: "0",
      name: "Jane Doe",
      icon: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
      wallet: 500,
      title: "Manager (PM)",
      team: [
        {
          id: 1,
          name: "John Doe",
        },
        {
          id: 2,
          name: "Dane Joe",
        },
        {
          id: 3,
          name: "Dohn Joe",
        },
      ],
      email: "janedoe@mail.com",
      password: "password123",
    },
    {
      id: "1",
      name: "John Doe",
      wallet: 200,
      title: "Contributor (IC)",
      supervisor: {
        id: 0,
        name: "Jane Doe",
      },
      email: "John Doe",
      password: "password123",
    },
    {
      id: "2",
      name: "Dane Joe",
      wallet: 50,
      title: "Contributor (IC)",
      supervisor: {
        id: 0,
        name: "Jane Doe",
      },
      email: "danejoe@mail.com",
      password: "password123",
    },
    {
      id: "3",
      name: "Dohn Joe",
      wallet: 150,
      title: "Contributor (IC)",
      supervisor: {
        id: 0,
        name: "Jane Doe",
      },
      email: "dohnjoe@mail.com",
      password: "password123",
    },
  ],
  projects: [
    {
      id: "1",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 1,
      incompletedTasks: 2,
      projectManager: {
        id: "0",
        name: "Jane Doe",
      },
    },
    {
      id: "2",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 1,
      incompletedTasks: 2,
      projectManager: {
        id: "0",
        name: "Jane Doe",
      },
    },
    {
      id: "3",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 1,
      incompletedTasks: 2,
      projectManager: {
        id: "0",
        name: "Jane Doe",
      },
    },
    {
      id: "4",
      name: "Navbar Fixes",
      tasks: mockColumns,
      completedTasks: 0,
      incompletedTasks: 3,
      projectManager: {
        id: "0",
        name: "Jane Doe",
      },
    },
  ],
};
