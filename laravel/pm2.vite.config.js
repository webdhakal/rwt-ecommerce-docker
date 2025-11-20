module.exports = {
  apps: [
    {
      name: "rwt-vite",
      script: "node",
      args: "node_modules/vite/bin/vite.js", // Vite CLI
      cwd: "/var/www/html",                  // Laravel project root
      env: {
        NODE_ENV: "development",
        PORT: 5179                            // Vite dev server port
      },
      watch: false
    }
  ]
};
