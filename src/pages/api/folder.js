// src/pages/api/folder.js
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const response = await fetch("http://localhost:4000/folders");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const folders = await response.json();
            res.status(200).json(folders);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
