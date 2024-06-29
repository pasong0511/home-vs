// src/pages/api/folder.js
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const response = await fetch("http://localhost:4000/folders");
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        try {
            const { folderName, location, memo, option } = req.body;
            const newFolder = {
                id: uuidv4(),
                folderName,
                location,
                memo,
                option,
                create: new Date().toISOString(),
            };

            const response = await fetch("http://localhost:4000/folders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newFolder),
            });

            if (!response.ok) {
                throw new Error("Failed to add folder to JSON Server");
            }

            res.status(201).json(newFolder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
