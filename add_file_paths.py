import os
from pathlib import Path
import re

def load_gitignore(gitignore_path):
    """Load ignored patterns from .gitignore"""
    ignored_patterns = []
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    ignored_patterns.append(line)
    return ignored_patterns

def is_ignored(file_path, ignored_patterns):
    """Check if a file or folder is ignored based on .gitignore patterns"""
    for pattern in ignored_patterns:
        if Path(file_path).match(pattern):
            return True
    return False

def get_existing_path_comment(content, file_extension):
    """Extract existing file path comment if it exists"""
    if file_extension == '.html':
        pattern = r'<!-- File Path: (.*?) -->\n'
    elif file_extension == '.css':
        pattern = r'/\* File Path: (.*?) \*/\n'
    else:
        pattern = r'// File Path: (.*?)\n'

    match = re.search(pattern, content)
    return match.group(1) if match else None

def add_file_path_comment(directory):
    ignored_dirs = {'node_modules', '.idea', '.next'}
    file_extensions = {'.js', '.ts', '.tsx', '.css', '.html'}
    gitignore_patterns = load_gitignore(os.path.join(directory, '.gitignore'))

    project_root = Path(directory).name

    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in ignored_dirs and not is_ignored(os.path.join(root, d), gitignore_patterns)]

        for file in files:
            file_path = os.path.join(root, file)
            file_extension = os.path.splitext(file)[1]

            if file_extension in file_extensions and not is_ignored(file_path, gitignore_patterns):
                relative_path = os.path.relpath(file_path, directory)
                relative_file_path = f"{project_root}/{relative_path}"

                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                existing_path = get_existing_path_comment(content, file_extension)

                # Only update if there's no existing path or if the path has changed
                if existing_path != relative_file_path:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        if file_extension == '.html':
                            comment = f"<!-- File Path: {relative_file_path} -->\n"
                            if existing_path:
                                content = content.replace(f"<!-- File Path: {existing_path} -->\n", comment)
                            else:
                                content = comment + content
                        elif file_extension == '.css':
                            if '@tailwind' in content:
                                if existing_path:
                                    old_comment = f"/* File Path: {existing_path} */\n"
                                    new_comment = f"/* File Path: {relative_file_path} */\n"
                                    content = content.replace(old_comment, new_comment)
                                else:
                                    last_tailwind_index = content.rfind('@tailwind')
                                    insertion_point = content.find(';', last_tailwind_index) + 1
                                    content = (
                                        content[:insertion_point]
                                        + f"\n/* File Path: {relative_file_path} */\n"
                                        + content[insertion_point:]
                                    )
                            else:
                                comment = f"/* File Path: {relative_file_path} */\n"
                                if existing_path:
                                    content = content.replace(f"/* File Path: {existing_path} */\n", comment)
                                else:
                                    content = comment + content
                        else:
                            comment = f"// File Path: {relative_file_path}\n"
                            if existing_path:
                                content = content.replace(f"// File Path: {existing_path}\n", comment)
                            else:
                                content = comment + content

                        f.write(content)

# Start from the current directory
add_file_path_comment(os.getcwd())