module.exports = {
  apps: [
    {
      name: "codeqrapp",
      script: "npm",
      args: "start",
      cwd: "/var/www/webapp/codeqrapp/current",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/var/www/webapp/codeqrapp/logs/err.log",
      out_file: "/var/www/webapp/codeqrapp/logs/out.log",
      log_file: "/var/www/webapp/codeqrapp/logs/combined.log",
      time: true,
    },
  ],
};
