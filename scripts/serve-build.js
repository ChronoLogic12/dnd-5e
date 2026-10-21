const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || 'build');
const port = Number(process.argv[3] || 5050);
const contentTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.ico': 'image/x-icon',
	'.png': 'image/png',
};

const isFile = (filePath) => fs.existsSync(filePath) && fs.statSync(filePath).isFile();

http
	.createServer((request, response) => {
		const requestedPath = path.join(root, decodeURIComponent(request.url.split('?')[0]));
		const filePath =
			requestedPath.startsWith(root) && isFile(requestedPath)
				? requestedPath
				: path.join(root, 'index.html');
		response.writeHead(200, {
			'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
		});
		fs.createReadStream(filePath).pipe(response);
	})
	.listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
