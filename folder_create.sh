#!/bin/bash

# Base directory where projects will be created
MONTH="february"
BASE_DIR="projects/2025"

# Create base directory if it doesn't exist
mkdir -p $BASE_DIR

# Loop from project 18 to 30
for i in {1..31}
do
    # Create project directory
    PROJECT_DIR="${BASE_DIR}/${MONTH}/project${i}"
    mkdir -p $PROJECT_DIR
    
    # Create index.tsx file with content
    cat > "${PROJECT_DIR}/index.tsx" << EOF
export default function Project${i}() {
    return (
        <div className="max-w-7xl mx-auto p-4 pt-6">
        <h1 className="text-3xl font-bold">Project ${i}</h1>
        </div>
    );
}
EOF

    echo "Created project${i} directory and index.tsx file"
done

echo "All projects created successfully!"