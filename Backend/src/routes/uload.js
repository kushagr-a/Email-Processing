import { Router } from "express";
import multer from "multer";
import { parse } from "csv-parse";
import { prisma } from "../db/db.js"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 10 },//10mb
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv)$/i)) {
            return cb(new Error("Only CSV File are allowed"))
        }
        cb(null, true)
    }
})

function parseCsv(buffer) {
    return new Promise((resolve, reject) => {
        const emails = [];
        const parser = parse({
            columns: false,
            trim: true,
            skip_empty_lines: true,
            relax_column_count: true,
        });
        parser.on("data", (row) => {
            const email = (row[0] || "").trim();
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emails.push(email);
            }
        });
        parser.on("error", reject);
        parser.on("end", () => resolve(emails));
        parser.write(buffer);
        parser.end();
    });
}

export function registerUploadRoutes(app) {
    app.post("/api/upload", upload.single(file), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "No file uploaded. Use field name: file"
                })
            }
            const emails = await parseCsv(req.file.buffer)

            if (emails.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No valid emails found in csv. csv should have one email per line"
                })
            }

            const batch = await prisma.batch.create({
                data: {
                    filename: req.file.originalname,
                    totalEmails: emails.length,
                    status: "pending",

                }
            })

            await prisma.email.createMany({
                data: emails.map((email) => {
                    batchId.batch.id,
                        email
                })
            })
        } catch (error) {

        }
    })
}

