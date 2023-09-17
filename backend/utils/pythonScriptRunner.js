const { exec } = require('child_process');

async function runPythonScript(scriptPath, cmdLineArgs, virtualEnvPath = 'ECO_ENV') {
    try {
        const shell = process.platform === 'win32' ? 'cmd' : 'bash';

        const activationScript = process.platform === 'win32' ? `"${virtualEnvPath}\\Scripts\\activate"` : `source ./${virtualEnvPath}/bin/activate`;
        
        const pythonScriptCommand = `python "${scriptPath}" ${cmdLineArgs}`;
        const fullCommand = `${activationScript} && ${pythonScriptCommand}`;

        console.log('Full Command:', fullCommand);

        const { stdout, stderr } = await executeCommand(shell, fullCommand);

        if (stderr) {
            console.error('Python stderr:', stderr);
            throw new Error('Python script encountered an error.');
        }

        return stdout;
    } catch (err) {
        throw err;
    }
}

function executeCommand(shell, command) {
    return new Promise((resolve, reject) => {
        const childProcess = exec(`${shell} ${(shell == 'cmd') ? '/c' : '-c'} "${command}"`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error while executing command:', err);
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });

        childProcess.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = runPythonScript;