import React from 'react'
import { Routes, Route } from 'react-router'

import { TaskIndex } from './pages/TaskIndex.jsx'
import { TaskDetails } from './pages/TaskDetails'

export function RootCmp() {
    return (
        <div className="main-container">
            <main>
                <Routes>
                    <Route path="" element={<TaskIndex />} />
                    <Route path="task/:taskId" element={<TaskDetails />} />
                </Routes>
            </main>
        </div>
    )
}
