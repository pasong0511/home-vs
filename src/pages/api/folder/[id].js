export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const response = await fetch(`http://localhost:4000/folders/${id}`);
            if (!response.ok) {
                return res.status(404).json({ message: "Folder not found" });
            }
            const folder = await response.json();
            res.status(200).json(folder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (req.method === "PUT") {
        try {
            const { folderName, location, memo, option } = req.body;
            const updatedFolder = {
                folderName,
                location,
                memo,
                option,
                create: new Date().toISOString(),
            };

            const response = await fetch(
                `http://localhost:4000/folders/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFolder),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update folder in JSON Server");
            }

            const folder = await response.json();
            res.status(200).json(folder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
