const fs = require('fs');
const path = require('path');

// Source video paths
const sourcePaths = [
    "C:\\Users\\LXH20\\Downloads\\13418719_3840_2160_25fps.mp4",
    "C:\\Users\\LXH20\\Downloads\\13427333_3840_2160_25fps.mp4",
    "C:\\Users\\LXH20\\Downloads\\4771356-hd_1920_1080_25fps.mp4",
    "C:\\Users\\LXH20\\Downloads\\13427381_3840_2160_25fps.mp4",
    "C:\\Users\\LXH20\\Downloads\\7677514-hd_1920_1080_25fps.mp4",
    "C:\\Users\\LXH20\\Downloads\\13427363_3840_2160_25fps.mp4"
];

// Destination directory
const destDir = path.join(__dirname, 'videos');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
}

// Copy each video file
sourcePaths.forEach((sourcePath, index) => {
    try {
        if (fs.existsSync(sourcePath)) {
            const fileName = path.basename(sourcePath);
            const destPath = path.join(destDir, fileName);
            
            // Copy the file
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied: ${fileName}`);
        } else {
            console.error(`Source file not found: ${sourcePath}`);
        }
    } catch (error) {
        console.error(`Error copying file ${sourcePath}:`, error);
    }
});

console.log('Video copying process completed.');
