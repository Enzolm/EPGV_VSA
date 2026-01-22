

function uploadFileToServer(file: File): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate an uploaded file URL
            resolve(`http://localhost:3000/uploads/${file.name}`);
        }, 1000);
    });
}

export default uploadFileToServer;