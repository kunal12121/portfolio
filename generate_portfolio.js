const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'assets');

function getFiles(dir, exts) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file, exts));
        } else {
            const ext = path.extname(file).toLowerCase();
            if (exts.includes(ext)) {
                results.push(file);
            }
        }
    });
    return results;
}

const uxUiDir = path.join(basePath, 'images/portfolio/ux-ui');
const graphicDir = path.join(basePath, 'images/portfolio/graphic-design');
const videoDir = path.join(basePath, 'videos/portfolio/video-edits');

const imageExts = ['.jpg', '.jpeg', '.png', '.gif'];
const videoExts = ['.mp4', '.webm', '.mov'];

const uxUiFiles = fs.existsSync(uxUiDir) ? getFiles(uxUiDir, imageExts) : [];
const graphicFiles = fs.existsSync(graphicDir) ? getFiles(graphicDir, imageExts) : [];
const videoFiles = fs.existsSync(videoDir) ? getFiles(videoDir, videoExts) : [];

let graphicsData = [];
let idCounter = 1;

uxUiFiles.forEach(file => {
    const relativePath = file.split('assets\\').pop().replace(/\\/g, '/');
    const filename = path.basename(file, path.extname(file));
    let folder = path.basename(path.dirname(file));
    graphicsData.push({
        id: `img-${idCounter++}`,
        title: filename,
        category: `UX/UI: ${folder}`,
        image: `assets/${relativePath}`,
        fallbackImage: '',
        description: `UX/UI Design: ${filename}`
    });
});

graphicFiles.forEach(file => {
    const relativePath = file.split('assets\\').pop().replace(/\\/g, '/');
    const filename = path.basename(file, path.extname(file));
    let folder = path.basename(path.dirname(file));
    graphicsData.push({
        id: `img-${idCounter++}`,
        title: filename,
        category: `Graphic Design: ${folder}`,
        image: `assets/${relativePath}`,
        fallbackImage: '',
        description: `Graphic Design: ${filename}`
    });
});

let videosData = [];
let vidIdCounter = 1;

videoFiles.forEach(file => {
    const relativePath = file.split('assets\\').pop().replace(/\\/g, '/');
    const filename = path.basename(file, path.extname(file));
    videosData.push({
        id: `vid-${vidIdCounter++}`,
        title: filename,
        description: `Video edit: ${filename}`,
        // We use the video path directly as the video source. Let's add videoSrc.
        thumbnail: '', // We don't have thumbnails generated, could use a placeholder or empty
        videoSrc: `assets/${relativePath}`
    });
});

const fileContent = `const portfolioData = {
    // ----------------------------------------------------
    // 1. GRAPHIC DESIGN & UI CONCEPTS
    // ----------------------------------------------------
    graphics: ${JSON.stringify(graphicsData, null, 4)},

    // ----------------------------------------------------
    // 2. CINEMATIC SHOWREEL (VIDEOS)
    // ----------------------------------------------------
    videos: ${JSON.stringify(videosData, null, 4)}
};
if (typeof module !== 'undefined' && module.exports) module.exports = portfolioData;
`;

fs.writeFileSync(path.join(__dirname, 'assets/js/portfolio-data.js'), fileContent);
console.log(`Generated ${graphicsData.length} graphics and ${videosData.length} videos.`);
