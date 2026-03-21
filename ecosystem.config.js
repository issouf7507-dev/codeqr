module.exports = {
  apps: [
    {
      name: "codeqr",
      script: "npm",
      args: "start",
      cwd: "/home/issouf/apps/codeqr",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/home/issouf/apps/codeqr/logs/pm2-error.log",
      out_file: "/home/issouf/apps/codeqr/logs/pm2-out.log",
      log_file: "/home/issouf/apps/codeqr/logs/pm2-combined.log",
      time: true,
      merge_logs: true,
    },
  ],
};
