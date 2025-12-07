"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      color: "bg-red-50 border-red-200",
      tasks: [
        { id: "1", title: "Add images", description: "Upload and integrate hero section images" },
        { id: "2", title: "Update copy", description: "Refine landing page text and CTAs" },
        { id: "3", title: "Add favicon", description: "Create and set favicon for browser tab" },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "bg-yellow-50 border-yellow-200",
      tasks: [
        { id: "4", title: "Tailwind config", description: "Configure Tailwind CSS theme and utilities" },
        { id: "5", title: "Wire index.tsx", description: "Set up index page component structure" },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-50 border-green-200",
      tasks: [
        { id: "6", title: "Scaffold Next.js", description: "Initialize Next.js project with TypeScript" },
        { id: "7", title: "Landing component pasted", description: "Copy landing page components to project" },
      ],
    },
  ]);

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
    const task = columns
      .find((col) => col.id === fromColumnId)
      ?.tasks.find((t) => t.id === taskId);

    if (!task) return;

    setColumns(
      columns.map((col) => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, task],
          };
        }
        return col;
      })
    );
  };

  const addTask = (columnId: string, title: string, description: string) => {
    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              {
                id: Date.now().toString(),
                title,
                description,
              },
            ],
          };
        }
        return col;
      })
    );
  };

  const deleteTask = (taskId: string, columnId: string) => {
    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        }
        return col;
      })
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-white"
          >
            <h1 className="text-4xl font-bold mb-4">Project Kanban Board</h1>
            <p className="text-blue-100 text-lg">Drag and drop tasks between columns to update their status</p>
          </motion.div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column, colIndex) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: colIndex * 0.1 }}
                className="flex flex-col h-full"
              >
                {/* Column Header */}
                <div className={`${column.color} border-2 rounded-t-xl p-6 mb-2`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{column.title}</h2>
                    <span className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {column.tasks.length}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {column.id === "todo" && "Tasks that need to be started"}
                    {column.id === "inprogress" && "Currently being worked on"}
                    {column.id === "done" && "Completed tasks"}
                  </p>
                </div>

                {/* Tasks Container */}
                <div
                  className={`${column.color} border-2 border-t-0 rounded-b-xl p-6 grow min-h-96 space-y-4`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const taskId = e.dataTransfer?.getData("taskId");
                    const fromColumnId = e.dataTransfer?.getData("fromColumnId");
                    if (fromColumnId && taskId && fromColumnId !== column.id) {
                      moveTask(taskId, fromColumnId, column.id);
                    }
                  }}
                >
                  {column.tasks.length > 0 ? (
                    column.tasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("taskId", task.id);
                          e.dataTransfer.setData("fromColumnId", column.id);
                        }}
                        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-move border-l-4 border-l-blue-600 group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
                          <button
                            onClick={() => deleteTask(task.id, column.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {column.id === "todo" && "📋 To Do"}
                            {column.id === "inprogress" && "⚙️ In Progress"}
                            {column.id === "done" && "✅ Done"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-5xl mb-2">
                          {column.id === "todo" && "📝"}
                          {column.id === "inprogress" && "⚙️"}
                          {column.id === "done" && "✅"}
                        </div>
                        <p className="text-gray-500">No tasks yet</p>
                        <p className="text-sm text-gray-400">Drag tasks here or create new ones</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Task Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const title = prompt("Enter task title:");
                    if (title) {
                      const description = prompt("Enter task description:");
                      addTask(column.id, title, description || "");
                    }
                  }}
                  className="mt-4 w-full bg-white text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all"
                >
                  + Add Task
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">📌 How to Use</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3">🖱️</span>
                <span>Drag and drop tasks between columns to update their status</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">➕</span>
                <span>Click &quot;Add Task&quot; to create new tasks in any column</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">❌</span>
                <span>Hover over a task and click the X button to delete it</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📊</span>
                <span>Track task counts in the column headers</span>
              </li>
            </ul>
          </motion.div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                ← Back to Home
              </motion.button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
