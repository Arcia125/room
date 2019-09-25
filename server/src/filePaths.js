import path from 'path';

const builtFrontendPath = path.join(process.cwd(), 'build');

const indexHtmlPath = path.join(builtFrontendPath, 'index.html');

export { builtFrontendPath, indexHtmlPath };
