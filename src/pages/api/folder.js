import { v4 as uuidv4 } from "uuid";

let folders = [
    { id: uuidv4(), folderName: "22동천", create: "2022011" },
    { id: uuidv4(), folderName: "23년구로디지털단지", create: "20240623" },
];

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
                folderName: folderName,
                location,
                memo,
                option,
                create: new Date().toISOString(),
            };
            folders.push(newFolder);

            // JSON Server에 데이터 추가
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
