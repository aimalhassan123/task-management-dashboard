import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Dashboard() {

  // FORM STATES
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("High");

  // TASKS
  const [tasks, setTasks] = useState([]);

  // SEARCH
  const [search, setSearch] = useState("");

  // FILTERS
  const [statusFilter, setStatusFilter] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  // SORTING
  const [sortBy, setSortBy] = useState("");

  // EDIT MODE
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [editDescription, setEditDescription] = useState("");

  const [editPriority, setEditPriority] = useState("");

  // ADD TASK
  const addTask = async () => {

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "tasks"), {

      title,
      description,
      priority,

      status: "Pending",

      createdAt: new Date()

    });

    // NOTIFICATION
    await addDoc(collection(db, "notifications"), {

      message: `New task added: ${title}`,

      createdAt: new Date()

    });

    setTitle("");

    setDescription("");

    setPriority("High");

    getTasks();
  };

  // GET TASKS
  const getTasks = async () => {

    const querySnapshot = await getDocs(
      collection(db, "tasks")
    );

    const taskList = [];

    querySnapshot.forEach((doc) => {

      taskList.push({
        id: doc.id,
        ...doc.data(),
      });

    });

    setTasks(taskList);
  };

  // LOAD TASKS
  useEffect(() => {
    getTasks();
  }, []);

  // DELETE TASK
  const deleteTask = async (id) => {

    await deleteDoc(doc(db, "tasks", id));

    getTasks();
  };

  // COMPLETE TASK
  const updateTaskStatus = async (id) => {

    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, {
      status: "Completed"
    });

    getTasks();
  };

  // START EDITING
  const startEditing = (task) => {

    setEditingTaskId(task.id);

    setEditTitle(task.title);

    setEditDescription(task.description);

    setEditPriority(task.priority);
  };

  // SAVE EDIT
  const saveEdit = async (id) => {

    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, {

      title: editTitle,

      description: editDescription,

      priority: editPriority

    });

    // NOTIFICATION
    await addDoc(collection(db, "notifications"), {

      message: `Task updated: ${editTitle}`,

      createdAt: new Date()

    });

    setEditingTaskId(null);

    getTasks();
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {/* CREATE TASK */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Create Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-3 rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task Description"
            className="w-full border p-3 rounded mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded mb-4"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Add Task
          </button>

        </div>

        {/* TASK SECTION */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Tasks
          </h2>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search Tasks"
            className="w-full border p-3 rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTERS + SORT */}
          <div className="flex gap-4 mb-6 flex-wrap">

            {/* STATUS FILTER */}
            <select
              className="border p-3 rounded"
              onChange={(e) => setStatusFilter(e.target.value)}
            >

              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

            {/* PRIORITY FILTER */}
            <select
              className="border p-3 rounded"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >

              <option value="">
                All Priority
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

            {/* SORT */}
            <select
              className="border p-3 rounded"
              onChange={(e) => setSortBy(e.target.value)}
            >

              <option value="">
                Sort By
              </option>

              <option value="High">
                High Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="Low">
                Low Priority
              </option>

            </select>

          </div>

          {/* TASK LIST */}
          {
            tasks

              // SEARCH
              .filter((task) =>
                task.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )

              // STATUS FILTER
              .filter((task) =>
                statusFilter === ""
                || task.status === statusFilter
              )

              // PRIORITY FILTER
              .filter((task) =>
                priorityFilter === ""
                || task.priority === priorityFilter
              )

              // SORTING
              .sort((a, b) => {

                if (sortBy === "High") {
                  return a.priority === "High" ? -1 : 1;
                }

                if (sortBy === "Medium") {
                  return a.priority === "Medium" ? -1 : 1;
                }

                if (sortBy === "Low") {
                  return a.priority === "Low" ? -1 : 1;
                }

                return 0;
              })

              .map((task) => (

                <div
                  key={task.id}
                  className="border p-4 rounded mb-4 bg-gray-50"
                >

                  {
                    editingTaskId === task.id ? (

                      <>
                        {/* EDIT MODE */}

                        <input
                          type="text"
                          className="w-full border p-2 rounded mb-3"
                          value={editTitle}
                          onChange={(e) =>
                            setEditTitle(e.target.value)
                          }
                        />

                        <textarea
                          className="w-full border p-2 rounded mb-3"
                          value={editDescription}
                          onChange={(e) =>
                            setEditDescription(e.target.value)
                          }
                        />

                        <select
                          className="w-full border p-2 rounded mb-3"
                          value={editPriority}
                          onChange={(e) =>
                            setEditPriority(e.target.value)
                          }
                        >

                          <option>High</option>

                          <option>Medium</option>

                          <option>Low</option>

                        </select>

                        <button
                          onClick={() => saveEdit(task.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>

                      </>

                    ) : (

                      <>
                        {/* NORMAL VIEW */}

                        <h3 className="text-xl font-bold">
                          {task.title}
                        </h3>

                        <p className="text-gray-600 mb-3">
                          {task.description}
                        </p>

                        {/* PRIORITY */}
                        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded mr-2">
                          {task.priority}
                        </span>

                        {/* STATUS */}
                        <span className="inline-block bg-green-600 text-white px-3 py-1 rounded mr-2">
                          {task.status}
                        </span>

                        <div className="mt-4 flex gap-3 flex-wrap">

                          {/* COMPLETE */}
                          <button
                            onClick={() =>
                              updateTaskStatus(task.id)
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded"
                          >
                            Complete
                          </button>

                          {/* EDIT */}
                          <button
                            onClick={() =>
                              startEditing(task)
                            }
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                          >
                            Edit
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              deleteTask(task.id)
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>

                        </div>

                      </>

                    )
                  }

                </div>

              ))
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;