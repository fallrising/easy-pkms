// File Path: personal-info-manager/components/features/editor/codeEditor.tsx
import React from 'react';
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
import { vim } from '@replit/codemirror-vim';
import { oneDark } from '@codemirror/theme-one-dark';
import { Switch } from '@/components/common/switch';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

interface VimState {
    mode: string;
    subMode?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
    const [vimMode, setVimMode] = React.useState<VimState>({ mode: 'normal' });
    const [isVimEnabled, setIsVimEnabled] = React.useState(true);

    // Handle vim mode changes
    const handleVimStateChange = (vimState: VimState) => {
        setVimMode(vimState);
    };

    // Get status bar color based on vim mode
    const getStatusBarColor = () => {
        if (!isVimEnabled) return 'bg-blue-600';

        switch (vimMode.mode) {
            case 'insert':
                return 'bg-green-600';
            case 'visual':
                return 'bg-purple-600';
            case 'replace':
                return 'bg-red-600';
            default:
                return 'bg-blue-600';
        }
    };

    // Get extensions based on vim mode toggle
    const getExtensions = () => {
        const baseExtensions = [
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
        ];

        return isVimEnabled ? [...baseExtensions, vim()] : baseExtensions;
    };

    return (
        <div className="h-screen flex flex-col bg-[#1E1E1E]">
            <div className="flex items-center justify-end p-2 bg-[#252526] border-b border-[#3C3C3C]">
                <div className="flex items-center gap-2">
                    <span className="text-white text-sm">Vim Mode</span>
                    <Switch
                        checked={isVimEnabled}
                        onCheckedChange={setIsVimEnabled}
                        className="data-[state=checked]:bg-green-500"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                <CodeMirror
                    value={value}
                    height="100%"
                    theme={oneDark}
                    extensions={getExtensions()}
                    onChange={onChange}
                    className="h-full text-base"
                    basicSetup={{
                        lineNumbers: true,
                        highlightActiveLineGutter: true,
                        highlightActiveLine: true,
                        foldGutter: true,
                        dropCursor: true,
                        allowMultipleSelections: true,
                        indentOnInput: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: true,
                        rectangularSelection: true,
                        crosshairCursor: true,
                        highlightSelectionMatches: true,
                    }}
                />
            </div>
            {isVimEnabled && (
                <div className={`h-6 px-4 flex items-center text-white ${getStatusBarColor()}`}>
                    <span className="text-sm font-medium">
                        Mode: {vimMode.mode.charAt(0).toUpperCase() + vimMode.mode.slice(1)}
                        {vimMode.subMode && ` (${vimMode.subMode})`}
                    </span>
                </div>
            )}
        </div>
    );
};

export default CodeEditor;
