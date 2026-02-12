import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/* SHADCN COMPONENTS */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function App() {
  return (
    <>
      <div class="min-h-screen flex flex-col items-center pt-10">
        <h1 class="text-3xl font-bold mb-6">SILO </h1>

        <div class="w-full max-w-3xl px-4">
          <div class="flex gap-3">
            <input
              type="text"
              placeholder="Search Documents..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full max-w-xs m-5 gap-2">

          <Card className="w-full max-w-xs p-4">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>

            <CardContent>
              <Skeleton className="w-full aspect-[210/297] rounded-md" />
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}

export default App
