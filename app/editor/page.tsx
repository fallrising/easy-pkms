// File Path: personal-info-manager/app/editor/page.tsx
'use client'

import React, { useState } from 'react';
import VimEditor from '@/components/features/editor/vimEditor';
import { Layout } from '@/components/layout/layout'

export default function Editor() {
    const [code, setCode] = useState(`// Welcome to the Vim-enabled editor!
// Try some Vim commands:
// - Press 'i' to enter insert mode
// - Press 'ESC' to enter normal mode
// - Use 'h', 'j', 'k', 'l' for navigation
// - ':w' to save (simulated)
// - ':q' to quit (simulated)

function example() {
  console.log("Hello, Vim!");
}
`);

    return (
        <Layout>
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Editor
                </h1>
                <p className="text-gray-600">
                    A editor with Vim keybindings
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <VimEditor
                    value={code}
                    onChange={setCode}
                />

                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">
                        Current Buffer Content:
                    </h2>
                    <pre className="text-sm text-gray-700 overflow-auto">
            {code}
          </pre>
                </div>
            </div>
        </div>
        </Layout>
    )
}