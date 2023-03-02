import ZipFolderCreator from "./zip-folder-creator.js";

// Example usage:
const file1Content = 'This is the content of file 1';
const file2Content = 'This is the content of file 2';

await new ZipFolderCreator(file1Content, file2Content)
    .createZipFolder('./myZipFolder.zip');