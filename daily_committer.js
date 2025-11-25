const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const TOTAL_COMMITS = 5;
const LOG_FILE = 'daily_activity.log';

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing: ${command}`, error);
                reject(error);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
};

const makeCommit = async (index) => {
    const timestamp = new Date().toISOString();
    const message = `Daily commit #${index + 1} - ${timestamp}`;

    // Append to log file to ensure there's a change
    fs.appendFileSync(LOG_FILE, `${message}\n`);

    try {
        console.log(`Staging changes for commit #${index + 1}...`);
        await runCommand('git add .');

        console.log(`Committing #${index + 1}...`);
        await runCommand(`git commit -m "${message}"`);

        // Optional: Push after each commit or at the end. 
        // Pushing after each ensures they are recorded even if script fails later.
        // But pushing once at the end is faster. Let's push at the end.
    } catch (err) {
        console.error('Failed to commit:', err);
    }
};

const main = async () => {
    console.log(`Starting ${TOTAL_COMMITS} automatic commits...`);

    for (let i = 0; i < TOTAL_COMMITS; i++) {
        await makeCommit(i);
        // Wait a bit between commits so they don't have the exact same second timestamp (optional but nice)
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log('Pushing all commits to remote...');
    try {
        await runCommand('git push');
        console.log('Successfully pushed all commits!');
    } catch (err) {
        console.error('Failed to push:', err);
    }
};

main();
