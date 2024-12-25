// File Path: personal-info-manager/components/features/editor/vimEditor.tsx
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { go } from '@codemirror/lang-go';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { vim } from '@replit/codemirror-vim';

interface VimEditorProps {
    value: string;
    onChange?: (value: string) => void;
}

const VimEditor: React.FC<VimEditorProps> = ({ value, onChange }) => {
    const [isVimMode, setIsVimMode] = useState(false);

    return (
        <div className="w-full h-full min-h-[500px] bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-2 bg-gray-800 text-gray-300 text-sm flex items-center justify-between">
                <div className="flex items-center">
                    <span className="mr-2 px-2 py-1 bg-gray-700 rounded">VIM</span>
                    <span className="text-xs text-gray-400">
                        Press ESC to enter normal mode, i for insert mode
                    </span>
                </div>
                <label className="flex items-center text-gray-400 text-xs">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={isVimMode}
                        onChange={(e) => setIsVimMode(e.target.checked)}
                    />
                    Enable Vim Mode
                </label>
            </div>
            <CodeMirror
                value={value}
                height="calc(100% - 40px)"
                theme={oneDark}
                extensions={[
                    javascript({ jsx: true, typescript: true }),
                    go(),
                    python(),
                    html(),
                    css(),
                    java(),
                    php(),
                    sql(),
                    xml(),
                    markdown(),
                    ...(isVimMode ? [vim()] : []),
                ]}
                onChange={onChange}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightSpecialChars: true,
                    foldGutter: true,
                    drawSelection: true,
                    dropCursor: true,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    rectangularSelection: true,
                    crosshairCursor: true,
                    highlightActiveLine: true,
                    highlightSelectionMatches: true,
                    closeBracketsKeymap: true,
                    defaultKeymap: true,
                    searchKeymap: true,
                    historyKeymap: true,
                    foldKeymap: true,
                    completionKeymap: true,
                    lintKeymap: true,
                }}
            />
        </div>
    );
};

export default VimEditor;
