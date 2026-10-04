const { spawn } = require('child_process');

function startTunnel() {
  console.log('[Tunnel] Launching localtunnel on port 8080...');
  const proc = spawn('npx', ['--yes', 'localtunnel', '--port', '8080', '--subdomain', 'noorhub-bd-2025'], {
    shell: true,
    stdio: 'inherit'
  });

  proc.on('close', (code) => {
    console.log(`[Tunnel] Exited with code ${code}. Restarting in 3s...`);
    setTimeout(startTunnel, 3000);
  });

  proc.on('error', (err) => {
    console.error('[Tunnel] Error:', err.message);
    setTimeout(startTunnel, 3000);
  });
}

startTunnel();
