// src/pages/api/folder.js

import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const response = await fetch("http://localhost:4000/folders");
            if (!response.ok) {
                throw new Error("Failed to fetch folders from JSON Server");
            }

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                throw new Error("Invalid JSON response");
            }

            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
            });
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

            const text = await response.text();
            let folder;
            try {
                folder = JSON.parse(text);
            } catch (error) {
                throw new Error("Invalid JSON response");
            }

            res.status(201).json(folder);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
