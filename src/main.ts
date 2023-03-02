import JSZip from 'jszip';
import fs from "fs";
import path from 'path';

class ZipFolderCreator {
    private files: { [name: string]: string } = {};

    constructor(...fileContents: string[]) {
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
        fs.writeFileSync(outputFilePath, content);
    }
}

// Example usage:
const file1Content = 'This is the content of file 1';
const file2Content = 'This is the content of file 2';

await new ZipFolderCreator(file1Content, file2Content)
    .createZipFolder('./myZipFolder.zip');