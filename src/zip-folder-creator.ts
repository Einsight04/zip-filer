import JSZip from 'jszip';
import fs from "fs/promises";
import path from 'path';

type Files = {
    [name: string]: string;
}

class ZipFolderCreator {
    private readonly files: Files;

    constructor(...fileContents: string[]) {
        this.files = {};

        fileContents.forEach((content, index) => {
            this.files[`file_${index}.txt`] = content;
        });
    }

    async createZipFolder(outputPath: string): Promise<void> {
        const zip = new JSZip();

        Object.entries(this.files).forEach(([name, content]) => {
            zip.file(name, content);
        });

        const content = await zip.generateAsync({ type: 'nodebuffer' });
        const outputFilePath = path.resolve(outputPath);

        await fs.writeFile(outputFilePath, content);
    }
}

export default ZipFolderCreator;